import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import DataDistribusi from "./pages/DataDistribusi";
import FormInput from "./pages/FormInput";
import UserManagement from "./pages/admin/UserManagement";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="data-distribusi" element={<DataDistribusi />} />
          <Route
            path="/data-verifikasi/form-distribusi"
            element={<FormInput />}
          />
          <Route path="/user-management" element={<UserManagement />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
