import { useState } from "react";

import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router";
import * as yup from "yup";

import { removeAllStringMasks } from "@/utils/removeAllStringMasks";
import { useAuthContext } from "@/context/useAuthContext";
import { normalizeCellphone } from "@/utils/inputMasks";
import { Separator } from "@/components/ui/separator";
import AppButton from "@/layout/ui/button/AppButton";
import { Checkbox } from "@/components/ui/checkbox";
import AppInput from "@/layout/ui/inputs/AppInput";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Nome completo é obrigatório"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("phone-length", "Telefone inválido", (value) => {
      const cleanedPhone = removeAllStringMasks({ value });

      return !!cleanedPhone && String(cleanedPhone).length >= 10;
    }),
  dateOfBirth: yup.string().required("Data de nascimento é obrigatória"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export default function Register() {
  const navigate = useNavigate();
  const { handleRegister, isLoading } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        fullName: "",
        phone: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const result = await handleRegister({
          ...values,
          phone: String(removeAllStringMasks({ value: values.phone }) ?? ""),
        });
        if (result) {
          toast.success("Conta criada com sucesso! Faça login para continuar.");
          navigate("/auth/login");
        }
      }}
    >
      {(formik) => (
        <Form className="min-h-screen bg-linear-to-br from-main via-primary to-violet flex items-center justify-center px-2 py-6">
          <div className="w-full max-w-xs lg:max-w-96 rounded shadow-2xl p-4 bg-white h-auto">
            <div className="flex justify-center mb-4">
              <img
                src="/src/assets/logoapp.png"
                alt="Izi Vendas Logo"
                className="md:w-32 w-24"
              />
            </div>
            <div>
              <p className="text-center text-sm text-gray-600">
                Crie sua conta para começar a organizar clientes, pedidos e
                vendas em um só lugar.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 gap-2 my-6">
              <AppInput
                name="fullName"
                type="text"
                placeholder="Seu nome completo"
                label="Nome completo"
                value={formik.values.fullName}
                isError={!!formik.errors.fullName && formik.touched.fullName}
                errorMessage={formik.errors.fullName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <AppInput
                name="phone"
                type="text"
                placeholder="(11) 99999-9999"
                label="Telefone"
                value={formik.values.phone}
                isError={!!formik.errors.phone && formik.touched.phone}
                errorMessage={formik.errors.phone}
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  formik.setFieldValue(
                    "phone",
                    normalizeCellphone(event.target.value),
                  );
                }}
              />
              <AppInput
                name="dateOfBirth"
                type="date"
                label="Data de nascimento"
                value={formik.values.dateOfBirth}
                isError={
                  !!formik.errors.dateOfBirth && formik.touched.dateOfBirth
                }
                errorMessage={formik.errors.dateOfBirth}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <AppInput
                name="email"
                type="email"
                placeholder="seu-email@exemplo.com"
                label="Email"
                value={formik.values.email}
                isError={!!formik.errors.email && formik.touched.email}
                errorMessage={formik.errors.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <AppInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                label="Senha"
                value={formik.values.password}
                isError={!!formik.errors.password && formik.touched.password}
                errorMessage={formik.errors.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <AppInput
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                label="Confirmar senha"
                value={formik.values.confirmPassword}
                isError={
                  !!formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
                errorMessage={formik.errors.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={showPassword}
                    onCheckedChange={() => setShowPassword((prev) => !prev)}
                    className="form-checkbox h-4 w-4 text-primary size-4"
                  />
                  <p className="text-center text-sm text-gray-600">
                    Mostrar senha
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center my-4">
              <AppButton
                textButton="Cadastrar"
                isLoading={formik.isSubmitting || isLoading}
                loadingText="Cadastrando..."
                type="submit"
                fullWidth
              />
            </div>
            <div className="flex justify-center items-center pb-4">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
