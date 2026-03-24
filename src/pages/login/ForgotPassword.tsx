import { Form, Formik } from "formik";
import { Link } from "react-router";
import * as yup from "yup";

import { handleForgotPassword } from "@/pages/login/service/loginServiceApi";
import { Separator } from "@/components/ui/separator";
import AppButton from "@/layout/ui/button/AppButton";
import AppInput from "@/layout/ui/inputs/AppInput";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

export default function ForgotPassword() {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await handleForgotPassword(values.email);
      }}
    >
      {(formik) => (
        <Form className="h-screen bg-linear-to-br from-main via-primary to-violet flex items-center justify-center px-2">
          <div className="w-full max-w-xs lg:max-w-96 rounded shadow-2xl p-4 bg-white h-auto">
            <div className="flex justify-center mb-4">
              <img
                src="/src/assets/logoapp.png"
                alt="Izi Vendas Logo"
                className="md:w-32 w-24"
              />
            </div>
            <div>
              <p className="text-center text-xs text-gray-600">
                Informe seu email para receber as instruções de redefinição de
                senha.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 gap-2 my-6">
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
            </div>
            <div className="flex justify-center items-center my-4">
              <AppButton
                textButton="Enviar recuperação"
                isLoading={formik.isSubmitting}
                loadingText="Enviando..."
                type="submit"
                fullWidth
              />
            </div>
            <div className="flex justify-center items-center pb-4">
              <p className="text-xs text-gray-600">
                Lembrou sua senha?{" "}
                <Link
                  to="/auth/login"
                  className="text-primary hover:underline text-xs"
                >
                  Voltar para login
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
