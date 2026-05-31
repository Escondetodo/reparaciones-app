import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
// import NotFound from "./NotFound";

interface RoutesNotFoundProps {
  children: ReactNode;
}
export const RoutesNotFound = ({ children }: RoutesNotFoundProps) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/404" />} />
      <Route
        path="/404"
        element={<h1 className="text-4xl font-bold">404</h1>}
      />
    </Routes>
  );
};
