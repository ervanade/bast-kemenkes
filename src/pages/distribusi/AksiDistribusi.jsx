import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  dataBarang,
  dataKecamatan,
  dataPuskesmas,
  konfirmasiOptions,
} from "../../data/data";
import { selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ModalAddBarang from "../../components/Modal/ModalAddBarang";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

const AksiDistribusi = () => {
  var today = new Date();
  const defaultDate = today.toISOString().substring(0, 10);
  const [formData, setFormData] = useState({
    id_dokumen: "",
    provinsi: "",
    id_provinsi: "",
    id_kabupaten: "",
    id_kecamatan: "",
    puskesmas: "",
    id_puskesmas: "",
    nama_kepala_puskesmas: "",
    nip_kepala_puskesmas: "",
    nama_barang: "",
    jumlah_barang_dikirim: "",
    jumlah_barang_diterima: "",
    tte: "",
    tanggal_kirim: "",
    keterangan_daerah: "",
    keterangan_ppk: "",
    kodepusdatin_lama: "",
    kodepusdatin_baru: "",
    kriteria_lima_sdm: "",
    listrik: "",
    internet: "",
    karakteristik_wilayah_kerja: "",
    tahun_lokus: "",
    konfirmasi_ppk: konfirmasiOptions[0],
    konfirmasi_daerah: konfirmasiOptions[0],
    tanggal_terima: "",
    total_nilai_perolehan: "",
    jenis_bmn: "",
    jumlah_barang: "",
    id_user_pemberi: "1",
    id_user_pembuat: 1,
    id_user_penerima: "2",
    dataBarang: [],
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [dataKota, setDataKota] = useState([]);
  const [dataDokumen, setDataDokumen] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataPuskesmas, setDataPuskesmas] = useState([]);

  const [selectedKota, setSelectedKota] = useState(null);
  const [selectedDokumen, setSelectedDokumen] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [selectedPuskesmas, setSelectedPuskesmas] = useState(null);

  const handleKotaChange = (selectedOption) => {
    setSelectedKota(selectedOption);
    setSelectedKecamatan(null);
    setDataKecamatan([]);
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        id_kabupaten: selectedOption.value.toString(),
        id_provinsi: selectedOption.provinsi.toString(),
      }));
      fetchKecamatan(selectedOption.value);
    }
  };

  const handleKecamatanChange = (selectedOption) => {
    setSelectedKecamatan(selectedOption);
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        id_kecamatan: selectedOption.value.toString(),
      }));
      fetchPuskesmas();
    }
  };
  const handlePuskesmasChange = (selectedOption) => {
    setSelectedPuskesmas(selectedOption);
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        id_puskesmas: selectedOption.value.toString(),
      }));
    }
  };

  const handleDokumenChange = (selectedOption) => {
    setSelectedDokumen(selectedOption);
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        id_dokumen: selectedOption.value.toString(),
      }));
    }
  };

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const fetchKota = async () => {
    setGetLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/kabupaten`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDataKota([
        ...response.data.data.map((item) => ({
          label: item.name,
          value: item.id,
          provinsi: item.id_provinsi,
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
        ...response.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      ]);
      setGetLoading(false);
    } catch (error) {
      setError(true);
      setDataKecamatan([]);
    }
  };

  const fetchPuskesmas = async (idKecamatan) => {
    try {
      const response = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/getpuskesmas/${idKecamatan}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDataPuskesmas([
        ...response.data.data.map((item) => ({
          label: item.nama_puskesmas,
          value: item.id,
        })),
      ]);
    } catch (error) {
      setError(true);
      setDataPuskesmas([]);
    }
  };

  const fetchDokumen = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/dokumen`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDataDokumen([
        ...response.data.data.map((item) => ({
          label: item.nama_dokumen,
          value: item.id,
        })),
      ]);
    } catch (error) {
      setError(true);
      setDataDokumen([]);
    }
  };
  const { id } = useParams();

  const fetchDistribusiData = async () => {
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/distribusi/${encodeURIComponent(id)}`,
        headers: {
          "Content-Type": "application/json",
          //eslint-disable-next-line
          Authorization: `Bearer ${user?.token}`,
        },
      }).then(function (response) {
        // handle success
        // console.log(response)
        const data = response.data.data;
        setFormData({
          id_dokumen: data.id_dokumen || "",
          provinsi: "",
          id_provinsi: data.id_provinsi || "",
          id_kabupaten: data.id_kabupaten || "",
          id_kecamatan: data.id_kecamatan || "",
          puskesmas: data.puskesmas || "",
          id_puskesmas: data.id_puskesmas || "",
          nama_kepala_puskesmas: "",
          nip_kepala_puskesmas: "",
          nama_barang: "",
          jumlah_barang_dikirim: "",
          jumlah_barang_diterima: "",
          tte: "",
          tanggal_kirim: data.tanggal_kirim || defaultDate,
          keterangan_daerah: data.keterangan_daerah || "",
          keterangan_ppk: data.keterangan_ppk || "",
          kodepusdatin_lama: data.kodepusdatin_lama || "",
          kodepusdatin_baru: data.kodepusdatin_baru || "",
          kriteria_lima_sdm: data.kriteria_lima_sdm || "",
          listrik: data.listrik || "",
          internet: data.internet || "",
          karakteristik_wilayah_kerja: data.karakteristik_wilayah_kerja || "",
          tahun_lokus: data.tahun_lokus || "",
          konfirmasi_ppk: konfirmasiOptions[0],
          konfirmasi_daerah: konfirmasiOptions[0],
          tanggal_terima: "",
          total_nilai_perolehan: "",
          jenis_bmn: data.jenis_bmn || "",
          jumlah_barang: "",
          id_user_pemberi: "1",
          id_user_pembuat: 1,
          id_user_penerima: "2",
          dataBarang: data.dataBarang || [],
        });
      });
    } catch (error) {
      if (error.response.status == 404) {
        navigate("/not-found");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDistribusiData();
    fetchKota();
    fetchDokumen();
  }, []);

  const editDistribusi = async () => {
    if (formData.dataBarang.length < 1) {
      Swal.fire("Error", "Form Data Barang Masih Kosong", "error");
      return;
    }
    setLoading(true);
    await axios({
      method: "put",
      url: `${import.meta.env.VITE_APP_API_URL}/api/distribusi/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      data: JSON.stringify({
        ...formData,
        konfirmasi_daerah: formData.konfirmasi_daerah?.value,
        konfirmasi_ppk: formData.konfirmasi_ppk?.value,
      }),
    })
      .then(function (response) {
        Swal.fire("Data Berhasil di Input!", "", "success");
        navigate("/data-distribusi");
        setLoading(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian",
      text: "Data sudah sesuai, Simpan Data ini?",
      showCancelButton: true,
      confirmButtonColor: "#16B3AC",
      confirmButtonText: "Ya, Simpan Data",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        editDistribusi();
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

  const tambahBarangClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleEditBarang = (e, index) => {
    e.preventDefault();
    setEditIndex(index);
    setShowModal(true);
  };

  useEffect(() => {
    const jumlahDiterimaSum = formData.dataBarang.reduce(
      (acc, curr) => acc + curr.jumlah_diterima,
      0
    );
    const jumlahDikirimSum = formData.dataBarang.reduce(
      (acc, curr) => acc + curr.jumlah_dikirim,
      0
    );

    if (jumlahDiterimaSum === jumlahDikirimSum) {
      setFormData((prev) => ({
        ...prev,
        konfirmasi_daerah: konfirmasiOptions[1],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        konfirmasi_daerah: konfirmasiOptions[0],
      }));
    }
  }, [formData.dataBarang]);

  const handleDeleteBarang = (e, index) => {
    e.preventDefault();
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

  useEffect(() => {
    if (formData.id_dokumen && dataDokumen.length > 0) {
      const initialOption = dataDokumen?.find(
        (prov) => prov.value == formData.id_dokumen
      );
      if (initialOption) {
        setSelectedDokumen({
          label: initialOption.label,
          value: initialOption.value,
        });
      }
    }
    if (formData.id_kecamatan && dataKecamatan.length > 0) {
      const initialOption = dataKecamatan.find(
        (kec) => kec.value == formData.id_kecamatan
      );
      if (initialOption) {
        setSelectedKecamatan({
          label: initialOption.label,
          value: initialOption.value,
        });
      }
    }
    if (formData.id_kabupaten && dataKota.length > 0) {
      const initialOption = dataKota.find(
        (kec) => kec.value == formData.id_kabupaten
      );

      if (initialOption) {
        setSelectedKota({
          label: initialOption.label,
          value: initialOption.value,
          provinsi: initialOption.provinsi,
        });
      }
    }
    if (formData.id_puskesmas && dataPuskesmas.length > 0) {
      const initialOption = dataPuskesmas.find(
        (kec) => kec.value == formData.id_puskesmas
      );
      if (initialOption) {
        setSelectedPuskesmas({
          label: initialOption.label,
          value: initialOption.value,
        });
      }
    }
  }, [formData, dataDokumen, dataKecamatan, dataKota, dataPuskesmas]);
  useEffect(() => {
    if (formData.id_kabupaten) {
      fetchKecamatan(formData.id_kabupaten);
    }
    if (formData.id_kecamatan) {
      fetchPuskesmas(formData.id_kecamatan);
    }
  }, [formData.id_kabupaten, formData.id_kecamatan]);

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     konfirmasi_daerah: konfirmasiOptions[1],
  //   }))
  // }, []);

  if (getLoading) {
    return (
      <div className="flex justify-center items-center">
        <CgSpinner className="animate-spin inline-block w-8 h-8 text-teal-400" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb pageName="Form Konfirmasi Data BAST" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1"
              ? "Form Konfirmasi Data BAST Admin Dit Tata Kelola Kesmas"
              : user.role === "2"
              ? "Form TTE BAST dan Naskah Hibah Admin PPK"
              : user.role === "3"
              ? "Form Konfirmasi Data BAST Admin Dinas Kesehatan Kab/Kota"
              : "Form Konfirmasi Data BAST Admin Dinas Kesehatan Kab/Kota"}
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
                  Dokumen :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataDokumen}
                  value={selectedDokumen}
                  onChange={handleDokumenChange}
                  placeholder="Pilih Dokumen"
                  className="w-full"
                  isDisabled={user.role !== "1"}
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
                  Kab / Kota :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataKota}
                  value={selectedKota}
                  onChange={handleKotaChange}
                  placeholder={"Pilih Kab / Kota"}
                  className="w-full"
                  isDisabled={user.role !== "1"}
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
                  Kecamatan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataKecamatan}
                  value={selectedKecamatan}
                  onChange={handleKecamatanChange}
                  placeholder={
                    selectedKota ? "Pilih Kecamatan" : "Pilih Kab / Kota Dahulu"
                  }
                  isDisabled={!selectedKota || user.role !== "1"}
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
                  value={selectedPuskesmas}
                  onChange={handlePuskesmasChange}
                  isDisabled={!selectedKecamatan || user.role !== "1"}
                  placeholder={
                    selectedKota ? "Pilih Puskesmas" : "Pilih Kecamatan Dahulu"
                  }
                  className="w-full"
                  theme={selectThemeColors}
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="tanggal_kirim"
                >
                  Tanggal Kirim :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="tanggal_kirim"
                  value={formData.tanggal_kirim}
                  onChange={handleChange}
                  type="date"
                  required
                  disabled={user.role !== "1"}
                  placeholder="Tanggal Kirim"
                />
              </div>
            </div>

            <div className="my-12">
              <div className="card-header flex flex-col ">
                <h1 className="mb-8 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-center text-bodydark1">
                  {user.role === "1"
                    ? "Form Input Data Barang"
                    : user.role === "2"
                    ? "Data Barang"
                    : user.role === "3"
                    ? "Konfirmasi Data Barang"
                    : ""}
                </h1>
                {user.role === "1" ? (
                  <div className="flex justify-end mb-2">
                    <button
                      title="Tambah Data Distribusi"
                      className="flex items-center gap-2 cursor-pointer text-base text-white  bg-primary rounded-md tracking-tight"
                      // onClick={handleExport}
                    >
                      <button
                        onClick={(e) => tambahBarangClick(e)}
                        to="/data-distribusi/add"
                        className="flex items-center gap-2 px-4 py-2"
                      >
                        <FaPlus size={16} />
                        <span className="hidden sm:block">
                          Tambah Data Barang
                        </span>
                      </button>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-bodydark2 uppercase bg-[#EBFBFA] dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-center">
                          Nama Barang
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Merk/Tipe
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Satuan
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Jumlah Dikirim
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Jumlah Diterima
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                          Harga Satuan
                        </th>
                        {user.role !== "2" ? (
                          <th scope="col" className="px-4 py-3 text-center">
                            Aksi
                          </th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.dataBarang.map((barang, index) => (
                        <tr
                          key={index}
                          className="bg-white text-[13px] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-2 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {barang.jenis_alkes}
                          </th>
                          <td className="px-2 py-2 text-center">
                            {barang.merk}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {barang.satuan}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {barang.jumlah_dikirim}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {barang.jumlah_diterima}
                          </td>
                          <td className="px-2 py-2 text-center">
                            {barang.harga_satuan}
                          </td>
                          {user.role !== "2" ? (
                            <td className="px-2 py-2 text-center flex items-center gap-2">
                              {user.role === "1" ? (
                                <>
                                  {" "}
                                  <button
                                    title="Edit"
                                    onClick={(e) => handleEditBarang(e, index)}
                                    className="text-[#16B3AC] hover:text-cyan-500"
                                  >
                                    <FaEdit size={16} />
                                  </button>
                                  <button
                                    onClick={(e) =>
                                      handleDeleteBarang(e, index)
                                    }
                                    title="Delete"
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FaTrash size={16} />
                                  </button>
                                </>
                              ) : user.role === "2" ? (
                                ""
                              ) : user.role === "3" ? (
                                <>
                                  {" "}
                                  <button
                                    title="Konfirmasi"
                                    onClick={(e) => handleEditBarang(e, index)}
                                    className={`text-white py-2 font-semibold w-22 rounded-md ${
                                      barang.jumlah_dikirim ==
                                      barang.jumlah_diterima
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    }`}
                                  >
                                    {barang.jumlah_dikirim ==
                                    barang.jumlah_diterima
                                      ? "Sudah Konfirmasi"
                                      : "Konfirmasi"}
                                  </button>
                                </>
                              ) : (
                                ""
                              )}
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {user.role === "2" || user.role === "3" ? (
              <>
                <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
                  <div className="sm:flex-[2_2_0%]">
                    <label
                      className=" block text-[#728294] text-base font-semibold mb-2"
                      htmlFor="email"
                    >
                      Keterangan Daerah :
                    </label>
                  </div>
                  <div className="sm:flex-[5_5_0%]">
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.keterangan_daerah}
                      disabled={user.role !== "3"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          keterangan_daerah: e.target.value,
                        }))
                      }
                      className={` disabled:bg-[#F2F2F2] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                "border-red-500" 
             rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                      placeholder="Keterangan : misal: komplit dan baik atau kurang dari rensi dan baik"
                    ></textarea>
                  </div>
                </div>

                <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
                  <div className="sm:flex-[2_2_0%]">
                    <label
                      className="block text-[#728294] text-base font-semibold mb-2"
                      htmlFor="email"
                    >
                      Konfirmasi Daerah :
                    </label>
                  </div>
                  <div className="sm:flex-[5_5_0%]">
                    <Select
                      options={konfirmasiOptions}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          konfirmasi_daerah: e,
                        }))
                      }
                      value={formData.konfirmasi_daerah}
                      placeholder="Konfirmasi Daerah"
                      className="w-full cursor-pointer"
                      theme={selectThemeColors}
                      isDisabled
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {user.role === "2" ? (
              <>
                <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
                  <div className="sm:flex-[2_2_0%]">
                    <label
                      className=" block text-[#728294] text-base font-semibold mb-2"
                      htmlFor="email"
                    >
                      Keterangan PPK :
                    </label>
                  </div>
                  <div className="sm:flex-[5_5_0%]">
                    <textarea
                      id="message"
                      rows="4"
                      value={formData.keterangan_ppk}
                      disabled={user.role !== "2"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          keterangan_ppk: e.target.value,
                        }))
                      }
                      className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                "border-red-500" 
             rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                      placeholder="Keterangan : misal: disetujui atau konfirmasi ke transporter barang sedang dikirim kembali"
                    ></textarea>
                  </div>
                </div>

                {/* <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
                  <div className="sm:flex-[2_2_0%]">
                    <label
                      className="block text-[#728294] text-base font-semibold mb-2"
                      htmlFor="email"
                    >
                      Konfirmasi PPK :
                    </label>
                  </div>
                  <div className="sm:flex-[5_5_0%]">
                    <Select
                      options={konfirmasiOptions}
                      value={formData.konfirmasi_ppk}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          konfirmasi_ppk: e,
                        }))
                      }
                      placeholder="Konfirmasi PPK"
                      className="w-full cursor-pointer"
                      theme={selectThemeColors}
                    />
                  </div>
                </div> */}
              </>
            ) : (
              ""
            )}

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

            <ModalAddBarang
              show={showModal}
              onClose={() => setShowModal(false)}
              onSave={handleTambahBarang}
              editIndex={editIndex}
              dataBarang={
                editIndex !== null ? formData.dataBarang[editIndex] : null
              }
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AksiDistribusi;
