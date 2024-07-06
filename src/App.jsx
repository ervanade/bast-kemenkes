import { useEffect, useLayoutEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import DataDistribusi from "./pages/distribusi/DataDistribusi";
import TambahDistribusi from "./pages/distribusi/TambahDistribusi";
import UserManagement from "./pages/admin/UserManagement";
import Laporan from "./pages/Laporan";
import LaporanPreview from "./pages/LaporanPreview";
import ProtectedRoute from "./components/Layout/ProtectedRoutes";
import EditDistribusi from "./pages/distribusi/EditDistribusi";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import ProtectedRoutesAdmin from "./components/Layout/ProtectedRoutesAdmin";
import Verifikasi from "./pages/verifikasi/Verifikasi";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <>
      <Wrapper>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="data-distribusi" element={<DataDistribusi />} />
              <Route path="verifikasi" element={<Verifikasi />} />
              <Route path="/" element={<ProtectedRoutesAdmin />}>
                <Route
                  path="data-distribusi/add"
                  element={<TambahDistribusi />}
                />
              </Route>
              <Route
                path="data-distribusi/edit/:id"
                element={<EditDistribusi />}
              />
              <Route path="laporan" element={<Laporan />} />
              <Route path="preview-laporan" element={<LaporanPreview />} />
              <Route
                path="/data-verifikasi/form-distribusi"
                element={<TambahDistribusi />}
              />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/not-found" element={<NotFound />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Wrapper>
      <ScrollToTop />
    </>
  );
}

export default App;
