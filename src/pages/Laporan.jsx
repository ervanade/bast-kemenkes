import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import Select from "react-select";
import DataTable from "react-data-table-component";
import { encryptId, selectThemeColors } from "../data/utils";
import {
  FaDownload,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { BiExport, BiSolidFileExport } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { CgSpinner } from "react-icons/cg";
import CardDataStats from "../components/CardDataStats";
import { PiShieldWarningBold } from "react-icons/pi";
import { MdOutlineDomainVerification } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import LaporanCard from "../components/Card/LaporanCard";

const Laporan = () => {
  const user = useSelector((a) => a.auth.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);

  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);

  const [formData, setFormData] = useState({});

  const fetchProvinsi = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/provinsi`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setFilteredData(response.data.data);
      setLoading(false);
      setDataProvinsi([
        { label: "Semua Provinsi", value: "" },
        ...response.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      ]);
    } catch (error) {
      setError(true);
      setDataProvinsi([]);
    }
  };
  useEffect(() => {
    fetchProvinsi();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = data.filter((item) => {
      return (
        (item?.nama_dokumen &&
          item.nama_dokumen.toLowerCase().includes(value)) ||
        (item?.nomor_bast && item.nomor_bast.toLowerCase().includes(value)) ||
        (item?.tanggal_bast &&
          item.tanggal_bast.toLowerCase().includes(value)) ||
        (item?.tahun_lokus && item.tahun_lokus.toLowerCase().includes(value)) ||
        (item?.penerima_hibah &&
          item.penerima_hibah.toLowerCase().includes(value))
      );
    });

    setFilteredData(filtered);
  };

  const columns = useMemo(
    () => [
      // { name: "No", selector: (row) => row.id, sortable: true },
      {
        name: "Provinsi",
        selector: (row) => row.name,
        sortable: true,
        width: "180px",
      },
      {
        name: "Data Distribusi",
        selector: (row) => 24,
        sortable: true,
        // width: "100px",
      },
      {
        name: "Jumlah Dikirim",
        selector: (row) => 80,
        sortable: true,
        // width: "100px",
      },
      {
        name: "Jumlah Diterima",
        selector: (row) => 80,
        sortable: true,
        // width: "100px",
      },
      {
        name: "Total Harga (Rp)",
        selector: (row) => "Rp.1,000,000",
        sortable: true,
        width: "200px",
      },
      {
        name: "Aksi",
        cell: (row) => (
          <div className="flex items-center space-x-2">
            <button
              title="Detail"
              className="text-green-400 hover:text-green-500"
            >
              <Link
                to={`/laporan/detail/${encodeURIComponent(encryptId(row.id))}`}
              >
                <FaEye size={16} />
              </Link>
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );

  const handleExport = () => {
    // Implementasi untuk mengekspor data (misalnya ke CSV)
  };

  return (
    <div>
      <Breadcrumb pageName="Data Laporan" title="Data Laporan" />
      <div className="flex flex-col items-center justify-center w-full tracking-tight mb-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <LaporanCard title="Data Distribusi" total="564" />
          <LaporanCard title="Data Terverifikasi" total="400" />
          <LaporanCard title="Data Belum Diverifikasi" total="24" />
          <LaporanCard title="Data Belum Diproses" total="140" />
          <LaporanCard title="Jumlah Barang Dikirim" total="1,504" />
          <LaporanCard title="Jumlah Barang Diterima" total="1,504" />
          <LaporanCard title="Total Harga (Rp)" total="Rp. 32,000,000" />
          <LaporanCard title="Jumlah Dokumen" total="56" />
        </div>
      </div>
      <div className="rounded-md flex flex-col gap-4 overflow-hidden overflow-x-auto  border border-stroke bg-white py-4 md:py-8 px-4 md:px-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between mb-4 items-center">
          <div className="relative">
            <button className="absolute left-2 top-1/2 -translate-y-1/2">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Cari Data..."
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white xl:w-125 py-2 rounded-md"
            />
          </div>
          <div className="div flex gap-2 flex-row">
            <button
              title="Export Data Distribusi"
              className="flex items-center gap-2 cursor-pointer text-base text-white px-4 py-2 bg-primary rounded-md tracking-tight"
              onClick={handleExport}
            >
              <BiExport />
              <span className="hidden sm:block">Export</span>
            </button>
            {user.role === "1" ? (
              <button
                title="Tambah Data Laporan"
                className="flex items-center gap-2 cursor-pointer text-base text-white  bg-primary rounded-md tracking-tight"
                onClick={handleExport}
              >
                <Link
                  to="/dokumen/add"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <FaPlus size={16} />
                  <span className="hidden sm:block">Tambah Data Laporan</span>
                </Link>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center">
              <CgSpinner className="animate-spin inline-block w-8 h-8 text-teal-400" />
              <span className="ml-2">Loading...</span>
            </div>
          ) : error || filteredData.length === 0 ? (
            <div className="text-center">Data Tidak Tersedia.</div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              persistTableHead
              highlightOnHover
              pointerOnHover
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#EBFBFA",
                    color: "#728294",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Laporan;
