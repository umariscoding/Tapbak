import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./states/contexts/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import PrimaryLayout from "./layout/primary";
import Auth from "./pages/Signup";
import Login from "./pages/Login";
import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";
import CardDesign from "./pages/CardDesign";
import Customers from "./pages/Customers";
import CustomerForm from "./pages/CustomerForm";
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
        path: "/join/:vendor_id",
        element: <CustomerForm />,
        showNavbar: false,
        showSidebar: false,
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
        path: "/login",
        element: <Login />,
        showNavbar: false,
        showSidebar: false,
    },
    {
        path: "/signup",
        element: <Auth />,
        showNavbar: false,
        showSidebar: false,
    },
  ];

  return (
    <UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {ROUTES.map((route, index) => (
          <Route
          key={index}
          path={route.path}
          element={<PrimaryLayout showNavbar={route.showNavbar} showSidebar={route.showSidebar}>{route.element}</PrimaryLayout>}
          />
        ))}
      </Routes>
    </UserProvider>
  );
}

export default App;
