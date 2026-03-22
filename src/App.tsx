import { BrowserRouter } from "react-router";
import Layout from "./layout/Layout";
import AppRoutes from "./routes/Routes";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}
