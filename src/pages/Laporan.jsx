import React, { useMemo, useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DataTable from "react-data-table-component";
import { dataLaporan } from "../data/data";
import { BiDownload, BiExport, BiSolidFileExport } from "react-icons/bi";
import jsPDF from "jspdf";
import { BsEye } from "react-icons/bs";
import ContohLaporan from "../assets/contoh_laporan.pdf";
import ReactPDF from "@react-pdf/renderer";
import { Link } from "react-router-dom";

const Laporan = () => {
  const [laporanData, setLaporanData] = useState(dataLaporan);
  const [filterText, setFilterText] = useState("");

  const handleDownloadPDF = (laporan) => {
    // Generate PDF dari data laporan
    window.open(ContohLaporan, "Download");
  };

  const handlePreviewPDF = (laporan) => {
    // Generate PDF dari data laporan untuk pratinjau
    return (
      <ReactPDF
        file={{
          data: ContohLaporan,
        }}
      />
    );
  };

  const columns = [
    {
      name: "Nomor Laporan",
      selector: (row) => row.nomorLaporan,
      sortable: true,
    },
    {
      name: "Tanggal Laporan",
      selector: (row) => row.tanggalLaporan,
      sortable: true,
    },
    { name: "Nama Kapus", selector: (row) => row.namaKapus, sortable: true },
    {
      name: "Jumlah Barang Dikirim",
      selector: (row) => row.jumlahBarangDikirim,
      sortable: true,
    },
    {
      name: "Jumlah Barang Diterima",
      selector: (row) => row.jumlahBarangDiterima,
      sortable: true,
    },
    { name: "Status TTE", selector: (row) => row.statusTTE, sortable: true },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            title="Input"
            className="text-green-500 hover:text-green-700"
            onClick={() => handlePreviewPDF(row)}
          >
            <Link to="/preview-laporan">
              <BsEye size={16} />
            </Link>
          </button>
          <button
            title="Input"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleDownloadPDF(row)}
          >
            <BiDownload size={16} />
          </button>
        </div>
      ),
    },
  ];

  const filteredData = laporanData.filter((item) =>
    item.namaKapus.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleExport = () => {
    // Implementasi untuk mengekspor data (misalnya ke CSV)
  };

  return (
    <div>
      <Breadcrumb pageName="Data Laporan" />

      <div className="rounded-md flex flex-col gap-4 overflow-hidden overflow-x-auto  border border-stroke bg-white py-4 md:py-8 px-4 md:px-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between mb-4">
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
              placeholder="Cari berdasarkan Nama Kapus"
              className="w-full bg-white pl-9 pr-4 text-black outline outline-1 outline-zinc-200 focus:outline-primary dark:text-white xl:w-125 py-2 rounded-md"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 cursor-pointer text-base text-white px-4 py-2 bg-primary rounded-md tracking-tight"
            onClick={handleExport}
          >
            <span className="hidden sm:block">Export Data</span>
            <BiExport />
          </button>
        </div>
        <div className="overflow-x-auto">
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
        </div>
      </div>
    </div>
  );
};

export default Laporan;
