import React, { useState } from "react";
import ModalTTE from "../Modal/ModalTTE";

const HeaderDokumen = ({ formData, jsonData, user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleTTE = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (
    <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="font-semibold mb-3 text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
        Dokumen {formData?.nama_dokumen || ""}
      </h1>

      <ModalTTE
        show={showModal}
        onClose={() => setShowModal(false)}
        jsonData={jsonData}
        user={user}
      />

      <button
        type="button"
        className={` disabled:bg-red-100 disabled:text-red-500 bg-blue-600  text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent`}
        onClick={handleTTE}
        disabled={jsonData?.jumlahDikirim !== jsonData?.jumlahDiterima}
      >
        {jsonData?.jumlahDikirim !== jsonData?.jumlahDiterima
          ? "Pastikan Jumlah Barang Dikirim / DIterima Sama Sebelum TTD !"
          : "Tanda Tangani Dokumen"}
      </button>
    </div>
  );
};

export default HeaderDokumen;
