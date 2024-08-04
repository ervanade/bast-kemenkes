import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import Select from "react-select";
import DataTable from "react-data-table-component";
import {
  dataDistribusiBekasi,
  dataKecamatan,
  dataKota,
  dataProvinsi,
} from "../../data/data";
import { selectThemeColors } from "../../data/utils";
import {
  FaCheck,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { BiExport, BiSolidFileExport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

const DataDistribusi = () => {
  const user = useSelector((a) => a.auth.user);
  const [search, setSearch] = useState(""); // Initialize search state with an empty string
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = data.filter((item) => {
      return (
        (item?.nomor_bast && item.nomor_bast.toLowerCase().includes(value)) ||
        (item?.provinsi && item.provinsi.toLowerCase().includes(value)) ||
        (item?.kabupaten && item.kabupaten.toLowerCase().includes(value)) ||
        (item?.kecamatan && item.kecamatan.toLowerCase().includes(value)) ||
        (item?.nama_puskesmas &&
          item.nama_puskesmas.toLowerCase().includes(value)) ||
        (item?.listrik && item.listrik.toLowerCase().includes(value)) ||
        (item?.internet &&
          item.internet.toString().toLowerCase().includes(value)) ||
        (item?.kepala_unit_pemberi &&
          item.kepala_unit_pemberi.toLowerCase().includes(value)) ||
        (item?.status_tte && item.status_tte.toLowerCase().includes(value)) ||
        (item?.jumlah_barang &&
          item.jumlah_barang.toLowerCase().includes(value))
      );
    });

    setFilteredData(filtered);
  };

  const handleExport = () => {
    // Implementasi untuk mengekspor data (misalnya ke CSV)
  };

  const fetchProvinsi = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/provinsi`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
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
  const fetchKota = async (idProvinsi) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/getkabupaten/${idProvinsi}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDataKota([
        { label: "Semua Kabupaten/Kota", value: "" },
        ...response.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      ]);
    } catch (error) {
      setError(true);
      setDataKota([]);
    }
  };
  const fetchKecamatan = async (idKota) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/getkecamatan/${idKota}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDataKecamatan([
        { label: "Semua Kecamatan", value: "" },
        ...response.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      ]);
    } catch (error) {
      setError(true);
      setDataKecamatan([]);
    }
  };
  const fetchDistribusiData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/distribusi`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      setError(true);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistribusiData();
    fetchProvinsi();
  }, []);

  const handleProvinsiChange = (selectedOption) => {
    setSelectedProvinsi(selectedOption);
    setSelectedKota(null);
    setSelectedKecamatan(null);
    setDataKota([]);
    setDataKecamatan([]);
    if (selectedOption) {
      fetchKota(selectedOption.value);
    }
  };

  const handleKotaChange = (selectedOption) => {
    setSelectedKota(selectedOption);
    setSelectedKecamatan(null);
    setDataKecamatan([]);
    if (selectedOption) {
      fetchKecamatan(selectedOption.value);
    }
  };

  const handleKecamatanChange = (selectedOption) => {
    setSelectedKecamatan(selectedOption);
  };

  const deleteDistribusi = async (id) => {
    await axios({
      method: "delete",
      url: `${import.meta.env.VITE_APP_API_URL}/api/distribusi/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(() => {
        fetchDistribusiData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleConfirmDeleteDistribusi = async (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You will Delete This Distribusi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#16B3AC",
    }).then(async (result) => {
      if (result.value) {
        await deleteDistribusi(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Distribusi has been deleted.",
        });
      }
    });
  };
  const columns = useMemo(
    () => [
      // { name: "No", selector: (row) => row.id, sortable: true },
      {
        name: "Nomor BAST",
        selector: (row) => row.nomor_bast,
        sortable: true,
        width: "100px",
      },
      {
        name: "Provinsi",
        selector: (row) => row.provinsi,
        sortable: true,
        width: "120px",
      },
      {
        name: "Kab/Kota",
        selector: (row) => row.kabupaten,
        sortable: true,
        width: "120px",
      },
      { name: "Kecamatan", selector: (row) => row.kecamatan, sortable: true },
      {
        name: "Puskesmas",
        selector: (row) => row.nama_puskesmas,
        sortable: true,
      },
      // { name: "Nama Kapus", selector: (row) => row.nama_kapus, sortable: true },
      // {
      //   name: "Nama Barang",
      //   selector: (row) => row.nama_barang,
      //   sortable: true,
      // },
      {
        name: "Jumlah Barang Dikirim",
        selector: (row) => row.jumlah_barang,
        sortable: true,
      },
      {
        name: "Jumlah Barang Diterima",
        selector: (row) => row.jumlah_barang,
        sortable: true,
      },
      {
        name: "Status TTE",
        selector: (row) => row.status_tte,
        sortable: true,
        width: "110px",
      },
      // {
      //   name: "Keterangan PPK Kemenkes",
      //   selector: (row) => row.keterangan_ppk,
      //   sortable: true,
      // },
      {
        name: "Aksi",
        cell: (row) => (
          <div className="flex items-center space-x-2">
            {/* <button
              title="Input"
              className="text-green-500 hover:text-green-700"
            >
              <Link to="/data-verifikasi/form-distribusi">
                <FaPlus />
              </Link>
            </button> */}
            {row.status_tte === "Belum" ? (
              <button
                title="Konfirmasi"
                className="text-blue-400 rounded-md"
                onClick={() => {}}
              >
                <FaCheck size={16} />
              </button>
            ) : (
              <button
                title="Konfirmasi"
                className="text-blue-400  rounded-md"
                onClick={() => {}}
              >
                <FaCheck size={16} />
              </button>
            )}
            <button
              title="Detail"
              className="text-green-400 hover:text-green-500"
            >
              <Link to={`/data-distribusi/detail/${row.id_puskesmas}`}>
                <FaEye size={16} />
              </Link>
            </button>

            {/* <button title="Edit" className="text-[#16B3AC] hover:text-cyan-500">
              <Link to={`/data-distribusi/edit/${row.id}`}>
                <FaEdit size={16} />
              </Link>
            </button> */}
            {/* {user.role === "1" ? (
              <button
                title="Delete"
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={16} />
              </button>
            ) : (
              ""
            )} */}
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    []
  );

  return (
    <div>
      <Breadcrumb pageName="Data Distribusi" />
      <div className="flex flex-col items-center justify-center w-full tracking-tight mb-8">
        <h1 className="font-normal mb-3 text-xl lg:text-[28px] tracking-tight text-center text-bodydark1">
          SELAMAT DATANG{" "}
          {user.role === "1"
            ? "ADMIN PUSAT"
            : user.role === "2"
            ? "ADMIN PPK"
            : user.role === "3"
            ? `ADMIN KAB/KOTA BEKASI`
            : ""}
        </h1>
        <div className="flex items-center lg:items-end mt-8 gap-4 flex-col lg:flex-row">
          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <div className="text-base">
              <label
                className="block text-[#728294] text-base font-normal mb-2"
                htmlFor="email"
              >
                Provinsi
              </label>
              <Select
                options={dataProvinsi}
                value={selectedProvinsi}
                onChange={handleProvinsiChange}
                className="w-64 sm:w-32 xl:w-60 bg-slate-500 my-react-select-container"
                classNamePrefix="my-react-select"
                placeholder="Pilih Provinsi"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "lightgrey",
                    primary: "grey",
                  },
                })}
                isDisabled={user.role === "3"}
              />
            </div>
            <div>
              <label
                className="block text-[#728294] text-base font-normal mb-2"
                htmlFor="kota"
              >
                Kab / Kota
              </label>
              <Select
                options={dataKota}
                value={selectedKota}
                onChange={handleKotaChange}
                className="w-64 sm:w-32 xl:w-60"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "lightgrey",
                    primary: "grey",
                  },
                })}
                isDisabled={user.role === "3" || !selectedProvinsi}
                placeholder={
                  selectedProvinsi
                    ? "Pilih Kab / Kota"
                    : "Pilih Provinsi Dahulu"
                }
              />
            </div>
            <div>
              <label
                className="block text-[#728294] text-base font-normal mb-2"
                htmlFor="kecamatan"
              >
                Kecamatan
              </label>
              <Select
                options={dataKecamatan}
                value={selectedKecamatan}
                onChange={handleKecamatanChange}
                className="w-64 sm:w-32 xl:w-60"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "lightgrey",
                    primary: "grey",
                  },
                })}
                isDisabled={user.role === "3" || !selectedKota}
                placeholder={
                  selectedKota ? "Pilih Kecamatan" : "Pilih Kab / Kota Dahulu"
                }
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="mt-2 flex items-center gap-2 cursor-pointer text-base text-white px-5 py-2 bg-primary rounded-md tracking-tight"
          >
            <FaSearch />
            <span className="lg:hidden xl:flex"> Cari Data</span>
          </button>
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
                title="Tambah Data Distribusi"
                className="flex items-center gap-2 cursor-pointer text-base text-white  bg-primary rounded-md tracking-tight"
                onClick={handleExport}
              >
                <Link
                  to="/data-distribusi/add"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <FaPlus size={16} />
                  <span className="hidden sm:block">
                    Tambah Data Distribusi
                  </span>
                </Link>
              </button>
            ) : (
              ""
            )}
            {user.role === "3" ? (
              <button
                title="Tandatangani Dokumen BMN"
                className="flex items-center gap-2 cursor-pointer text-base text-white  bg-blue-600 rounded-md tracking-tight"
                onClick={handleExport}
              >
                <Link
                  to="/data-distribusi/preview-dokumen/1"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <FaCheck size={16} />
                  <span className="hidden sm:block">
                    Tandatangani Dokumen BMN
                  </span>
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

export default DataDistribusi;
