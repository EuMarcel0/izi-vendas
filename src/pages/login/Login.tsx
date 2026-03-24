import { useState } from "react";

import { Form, Formik } from "formik";
import { Link } from "react-router";
import * as yup from "yup";

import { Separator } from "@/components/ui/separator";
import AppButton from "@/layout/ui/button/AppButton";
import { Checkbox } from "@/components/ui/checkbox";
import AppInput from "@/layout/ui/inputs/AppInput";
import { useAuthContext } from "@/context/useAuthContext";

const validationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
});

export default function Login() {
  const { handleLogin, isLoading } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      onSubmit={(values) => handleLogin(values.email, values.password)}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
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
              <p className="text-center text-sm text-gray-600 mb-6">
                Faça login para acessar sua conta e gerenciar suas vendas de
                forma fácil e eficiente.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 gap-2 my-6">
              <AppInput
                name="email"
                type="email"
                placeholder="seu-email@exemplo.com"
                label="Email"
                isError={!!formik.errors.email && formik.touched.email}
                errorMessage={formik.errors.email}
                onChange={formik.handleChange}
              />
              <AppInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                label="Senha"
                isError={!!formik.errors.password && formik.touched.password}
                errorMessage={formik.errors.password}
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
                textButton="Entrar"
                isLoading={formik.isSubmitting || isLoading}
                loadingText="Entrando..."
                type="submit"
                fullWidth
              />
            </div>
            <div className="flex justify-center items-center pb-4">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  to="/auth/register"
                  className="text-primary hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
