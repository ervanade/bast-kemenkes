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
import Profile from "./pages/Profile";
import TesTemplate from "./pages/TesTemplate";
import TemplateDokumen from "./components/Modal/TemplateDokumen";
import PreviewDokumen from "./pages/distribusi/PreviewDokumen";
import DataBarang from "./pages/master-barang/DataBarang";
import DataPuskesmas from "./pages/master-puskesmas/DataPuskesmas";
import DataKecamatan from "./pages/master-kecamatan/DataKecamatan";
import DataProvinsi from "./pages/master-provinsi/DataProvinsi";
import DetailDistribusi from "./pages/distribusi/DetailDistribusi";
import TambahUser from "./pages/admin/TambahUser";
import EditProvinsi from "./pages/master-provinsi/EditProvinsi";
import TambahProvinsi from "./pages/master-provinsi/TambahProvinsi";
import TambahBarang from "./pages/master-barang/TambahBarang";
import EditBarang from "./pages/master-barang/EditBarang";

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
              <Route path="tes-template" element={<TesTemplate />} />
              <Route path="preview-dokumen/:id" element={<TemplateDokumen />} />
              <Route path="data-distribusi" element={<DataDistribusi />} />
              <Route
                path="data-distribusi/detail/:id"
                element={<DetailDistribusi />}
              />
              <Route path="verifikasi" element={<Verifikasi />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="data-distribusi/edit/:id"
                element={<EditDistribusi />}
              />
              <Route
                path="data-distribusi/preview-dokumen/:id"
                element={<PreviewDokumen />}
              />
              <Route path="laporan" element={<Laporan />} />
              <Route path="preview-laporan" element={<LaporanPreview />} />
              <Route
                path="/data-verifikasi/form-distribusi"
                element={<TambahDistribusi />}
              />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/" element={<ProtectedRoutesAdmin />}>
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/user-management/add" element={<TambahUser />} />
                <Route
                  path="data-distribusi/add"
                  element={<TambahDistribusi />}
                />

                <Route path="data-barang" element={<DataBarang />} />
                <Route path="data-barang/add" element={<TambahBarang />} />
                <Route path="data-barang/edit/:id" element={<EditBarang />} />

                <Route path="data-puskesmas" element={<DataPuskesmas />} />

                <Route path="data-provinsi" element={<DataProvinsi />} />
                <Route path="data-provinsi/add" element={<TambahProvinsi />} />
                <Route
                  path="data-provinsi/edit/:id"
                  element={<EditProvinsi />}
                />

                <Route path="data-kecamatan" element={<DataKecamatan />} />
              </Route>
            </Route>
          </Route>
          <Route path="login" element={<Login />} />\
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </Wrapper>
      <ScrollToTop />
    </>
  );
}

export default App;
