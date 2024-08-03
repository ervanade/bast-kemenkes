import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { dataBarang, dataKecamatan, dataPuskesmas } from "../../data/data";
import { selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ModalAddBarang from "../../components/Modal/ModalAddBarang";

const TambahDistribusi = () => {
  const [formData, setFormData] = useState({
    kecamatan: "",
    puskesmas: "",
    nama_kepala_puskesmas: "",
    nip_kepala_puskesmas: "",
    nama_barang: "",
    jumlah_barang_dikirim: "",
    jumlah_barang_diterima: "",
    tte: "",
    ket_daerah: "",
    ket_ppk: "",
    dataBarang: [],
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const handleSimpan = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian",
      text: "Jumlah dikirim dan diterima sudah sesuai, tandatangani BAST ini?",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonColor: "#3B82F6",
      confirmButtonColor: "#16B3AC",
      confirmButtonText: "Ya",
      denyButtonText: `Simpan Data`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Data Berhasil di Input!", "", "success");
        navigate("/data-distribusi");
      } else if (result.isDenied) {
        Swal.fire("Simpan Data Berhasil!", "", "success");
        navigate("/data-distribusi");
      }
    });
  };

  const handleTambahBarang = (barang) => {
    if (editIndex !== null) {
      const updatedDataBarang = formData.dataBarang.map((item, i) =>
        i === editIndex ? barang : item
      );
      setFormData((prev) => ({
        ...prev,
        dataBarang: updatedDataBarang,
      }));
      setEditIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        dataBarang: [...prev.dataBarang, barang],
      }));
    }
    setShowModal(false);
  };
  const handleEditBarang = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  // const handleEditBarang = (index, barang) => {
  //   const updatedDataBarang = formData.dataBarang.map((item, i) =>
  //     i === index ? barang : item
  //   );
  //   setFormData((prev) => ({
  //     ...prev,
  //     dataBarang: updatedDataBarang,
  //   }));
  // };

  const handleDeleteBarang = (index) => {
    const updatedDataBarang = formData.dataBarang.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      dataBarang: updatedDataBarang,
    }));
  };
  useEffect(() => {
    if (editIndex) {
      setShowModal(true);
    }
  }, [editIndex]);
  return (
    <div>
      <Breadcrumb pageName="Form Input Data BAST" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1"
              ? "Form Input Data BAST Admin Dit Tata Kelola Kesmas"
              : user.role === "2"
              ? "Form TTE BAST dan Naskah Hibah Admin PPK"
              : user.role === "3"
              ? "Form Input Data BAST Admin Dinas Kesehatan Kab/Kota"
              : "Form Input Data BAST Admin Dinas Kesehatan Kab/Kota"}
          </h1>
          <div>
            <Link
              to="/data-distribusi"
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="w-full 2xl:w-4/5 ">
          <form className="mt-5" onSubmit={handleSimpan}>
            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Kecamatan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataKecamatan}
                  value={formData.kecamatan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kecamatan: e,
                    }))
                  }
                  placeholder="Pilih Kecamatan"
                  className="w-full"
                  theme={selectThemeColors}
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Puskesmas :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataPuskesmas}
                  value={formData.puskesmas}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      puskesmas: e,
                    }))
                  }
                  placeholder="Pilih Puskesmas"
                  className="w-full"
                  theme={selectThemeColors}
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 sm:mt-12 sm:gap-8">
              <div className="div sm:flex-[2_2_0%]"></div>
              <div className="div sm:flex-[5_5_0%] ">
                <div className="w-4/5 flex items-center gap-4">
                  <button
                    className="w-full bg-[#0ACBC2]  text-white font-bold py-4 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent"
                    type="submit"
                  >
                    {loading ? "Loading..." : "Simpan"}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="w-full bg-[#fff]  text-[#0ACBC2] border border-[#0ACBC2] font-bold py-4 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent"
                  >
                    {loading ? "Loading..." : "Batal"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Card>
      <Card className="mt-4">
        <div className="card-header flex flex-col ">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            Form Input Data Barang
          </h1>
          <div className="flex justify-end mb-2">
            <button
              title="Tambah Data Distribusi"
              className="flex items-center gap-2 cursor-pointer text-base text-white  bg-primary rounded-md tracking-tight"
              // onClick={handleExport}
            >
              <button
                onClick={() => setShowModal(true)}
                to="/data-distribusi/add"
                className="flex items-center gap-2 px-4 py-2"
              >
                <FaPlus size={16} />
                <span className="hidden sm:block">Tambah Data Barang</span>
              </button>
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-bodydark2 uppercase bg-[#EBFBFA] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Nama Barang
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Merk/Tipe
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Nomor Bukti Kepemilikan
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Satuan
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Jumlah Dikirim
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-center">
                    Jumlah Diterima
                  </th> */}
                  <th scope="col" className="px-6 py-3 text-center">
                    Harga Satuan
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Jumlah Total Nilai Perolehan (Rp)
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Keterangan
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.dataBarang.map((barang, index) => (
                  <tr
                    key={index}
                    className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {barang.nama}
                    </th>
                    <td className="px-6 py-4 text-center">{barang.merk}</td>
                    <td className="px-6 py-4 text-center">
                      {barang.nomor_bukti}
                    </td>
                    <td className="px-6 py-4 text-center">{barang.satuan}</td>
                    <td className="px-6 py-4 text-center">
                      {barang.jumlah_dikirim}
                    </td>
                    {/* <td className="px-6 py-4 text-center">
                      {barang.jumlah_diterima}
                    </td> */}
                    <td className="px-6 py-4 text-center">
                      {barang.harga_satuan}
                    </td>
                    <td className="px-6 py-4 text-center">$2999</td>
                    <td className="px-6 py-4 text-center">
                      {barang.keterangan}
                    </td>
                    <td className="px-6 py-4 text-center flex items-center gap-2">
                      <button
                        title="Edit"
                        onClick={() => handleEditBarang(index)}
                        className="text-[#16B3AC] hover:text-cyan-500"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBarang(index)}
                        title="Delete"
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ModalAddBarang
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleTambahBarang}
          editIndex={editIndex}
          dataBarang={
            editIndex !== null ? formData.dataBarang[editIndex] : null
          }
        />
      </Card>
    </div>
  );
};

export default TambahDistribusi;
