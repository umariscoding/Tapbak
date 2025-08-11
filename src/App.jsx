import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import PrimaryLayout from "./layout/primary";
import Auth from "./pages/Signup";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
import CardDesign from "./pages/CardDesign";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import ProcessTransaction from "./pages/ProcessTransaction";
function App() {

  const ROUTES = [
    {
        path: "/",
        element: <Dashboard />,
        showNavbar: true,
    },
    {
        path: "/card-design",
        element: <CardDesign />,
        showNavbar: true,
    },
    {
        path: "/customers",
        element: <Customers />,
        showNavbar: true,
    },
    {
        path: "/transactions",
        element: <Transactions />,
        showNavbar: true,
    },
    {
        path: "/settings",
        element: <Settings />,
        showNavbar: true,
    },
    {
        path: "/process",
        element: <ProcessTransaction />,
        showNavbar: true,
    },
    {
        path: "/signup",
        element: <Auth />,
        showNavbar: false,
    },
];
  return (
    <Routes>
      {ROUTES.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<PrimaryLayout showNavbar={route.showNavbar}>{route.element}</PrimaryLayout>}
        />
      ))}
    </Routes>
  );
}

export default App;
