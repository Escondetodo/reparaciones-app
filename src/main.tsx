import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { AppHookCoinainer } from "./AppHookCoinainer.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AppHookCoinainer /> */}
    <App />
  </StrictMode>,
);
