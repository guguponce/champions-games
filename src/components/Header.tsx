import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header({
  children,
  id,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="header" id={id}>
      {location.pathname !== "/" && (
        <div role="button" id="home-icon" onClick={() => navigate("/")}></div>
      )}
      {children}
    </header>
  );
}
