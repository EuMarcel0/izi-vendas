import { BanIcon, SaveIcon, UploadCloudIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Form, Formik } from "formik";
import * as yup from "yup";

import type { ModalComponentProps } from "@/components/modal/ModalProvider";
import type { TProduct } from "../service/productServiceApi";
import AppInputPrice from "@/layout/ui/inputs/AppInputPrice";
import AppTextArea from "@/layout/ui/inputs/AppTextArea";
import AppButton from "@/layout/ui/button/AppButton";
import AppInput from "@/layout/ui/inputs/AppInput";
import { toast } from "react-toastify";
import { useRef, useState } from "react";

type ProductFormDialogProps = {
  isEdit?: boolean;
  product: TProduct | null;
} & ModalComponentProps;

const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  description: yup.string(),
  price: yup
    .number()
    .typeError("Deve ser um número")
    .positive("Deve ser positivo")
    .required("É obrigatório"),
  discount: yup
    .number()
    .typeError("Deve ser um número")
    .min(0, "Mínimo é 0%")
    .max(100, "Máximo é 100%"),
  image_url: yup
    .string()
    .url("A URL da imagem deve ser válida")
    .required("A URL da imagem é obrigatória"),
  category_id: yup
    .number()
    .typeError("Deve ser um número")
    .required("É obrigatório"),
});

export default function ProductFormDialog({
  product,
  isEdit = false,
  _close,
}: ProductFormDialogProps) {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast.warning("Apenas um arquivo pode ser enviado por produto");
        setIsDragging(false);
        return;
      }
      const file = acceptedFiles[0];
      setProductImage(file);

      setIsDragging(false);
    },
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => {
      setIsDragging(false);
      toast.error("Quantidade máxima de arquivo: 1");
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  console.log("PRODUCT IMAGE: ", productImage);

  return (
    <Formik
      onSubmit={(values) => console.log("VALUES: ", values)}
      initialValues={
        {
          name: product?.name || "",
          description: product?.description || "",
          price: product?.price || "",
          discount: product?.discount || "",
          image_url: product?.image_url || "",
          category_id: product?.category_id || "",
        } as TProduct
      }
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="w-full lg:space-y-2 space-y-1">
          <AppInput
            name="name"
            label="Nome"
            placeholder="Nome do produto"
            value={formik.values.name}
            onChange={formik.handleChange}
            errorMessage={formik.errors.name}
            isError={!!formik.touched.name && !!formik.errors.name}
          />
          <AppTextArea
            name="description"
            label="Descrição"
            placeholder="Descrição do produto"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="max-h-64"
            errorMessage={formik.errors.description}
            isError={
              !!formik.touched.description && !!formik.errors.description
            }
          />
          <div className="w-full grid grid-cols-2 gap-2 lg:space-y-2 space-y-1">
            <AppInputPrice
              name="price"
              label="Preço"
              placeholder="0,00"
              value={formik.values.price}
              onChange={formik.handleChange}
              errorMessage={formik.errors.price}
              isError={!!formik.touched.price && !!formik.errors.price}
              prefix="R$"
            />
            <AppInputPrice
              name="discount"
              label="Desconto"
              placeholder="0,00"
              value={formik.values.discount}
              onChange={formik.handleChange}
              errorMessage={formik.errors.discount}
              isError={!!formik.touched.discount && !!formik.errors.discount}
              prefix="%"
            />
          </div>
          <div className="w-full">
            <div
              {...getRootProps({
                className: "dropzone w-full h-full",
                onClick: (e) => {
                  e.stopPropagation();
                },
              })}
            >
              <label
                className={`flex flex-col items-center justify-center w-full h-full py-3 border-2 transition-all ease-linear duration-150 ${
                  isDragging
                    ? "border-tw-main/40 dark:border-tw-main/40 bg-tw-bg-light-secondary dark:bg-tw-bg-dark-secondary"
                    : "border-slate-500/20 dark:border-gray-500/20 bg-tw-bg-light-secondary dark:bg-tw-bg-dark-secondary"
                } border-dashed rounded-md cursor-pointer`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-4 gap-4">
                  <UploadCloudIcon
                    size={20}
                    className={`${
                      isDragging
                        ? "text-tw-main/40"
                        : "text-tw-text-light dark:text-tw-text-dark"
                    }`}
                  />
                  <div
                    className={`mb-2 text-sm transition-all ease-linear duration-150 ${
                      isDragging
                        ? "text-tw-main/40"
                        : "text-tw-text-light dark:text-tw-text-dark"
                    }`}
                  >
                    <span className="font-semibold">Clique para anexar</span> ou
                    arraste e solte o arquivo aqui
                    <br />
                    <p
                      className={`text-center transition-all ease-linear duration-150 ${
                        isDragging
                          ? "text-tw-main/40"
                          : "text-tw-text-light dark:text-tw-text-dark"
                      }`}
                    >
                      Quantidade máxima de arquivo:{" "}
                      <span className="font-semibold">1</span>
                    </p>
                  </div>
                </div>
                <input
                  ref={inputRef}
                  className="hidden w-full h-52"
                  {...getInputProps({
                    multiple: true,
                  })}
                />
              </label>
            </div>
          </div>
          <div className="w-full h-auto flex lg:flex-row flex-col items-center gap-2 mt-4">
            <AppButton
              textButton="Cancelar"
              type="button"
              onClick={_close}
              variant="outline"
              icon={<BanIcon className="text-gray-500 size-4" />}
              className="lg:flex-1 max-lg:w-full "
            />
            <AppButton
              textButton="Salvar"
              type="submit"
              icon={<SaveIcon className="text-white size-4" />}
              className="lg:flex-1 max-lg:w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
