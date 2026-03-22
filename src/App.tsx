import { BrowserRouter } from "react-router";

import AppRoutes from "./routes/Routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
