import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  dataBarang,
  dataKecamatan,
  dataPuskesmas,
  roleOptions,
  SelectOptions,
} from "../../data/data";
import { decryptId, selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import FormInput from "../../components/Form/FormInput";

const TambahBarang = () => {
  const [formData, setFormData] = useState({
    nama_alkes: "",
    // standar_rawat_inap: "",
    // standar_nonrawat_inap: "",
    merk: "",
    // tipe: "",
    satuan: "",
    harga_satuan: "",
    keterangan: "",
    contractFile: null,
    contractFileName: "",
    penyedia: "",
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);

  const [selectedStandar, setSelectedStandar] = useState(null);
  const [selectedNonStandar, setSelectedNonStandar] = useState(null);

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));

    switch (name) {
      case "standar_rawat_inap":
        setSelectedStandar(selectedOption);
        break;
      case "standar_nonrawat_inap":
        setSelectedNonStandar(selectedOption);
        break;
      default:
        break;
    }
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi untuk memformat angka ke format rupiah
const formatRupiah = (value) => {
  if (!value) return "";
  return parseInt(value, 10).toLocaleString("id-ID");
};

// Fungsi untuk mendapatkan nilai asli (tanpa format)
const getRawValue = (formattedValue) => {
  return formattedValue.replace(/\./g, "");
};

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    if (files) {
      const file = files[0];
      if (file.type !== "application/pdf") {
        Swal.fire("Error", "File type harus PDF", "error");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        Swal.fire("Error", "File size harus dibawah 15 MB", "error");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [id]: file,
        contractFileName: file.name,
      }));
    } else {
      if (id === "harga_satuan") {
        const unformattedValue = value.replace(/\./g, ""); // Hapus semua titik
        if (!isNaN(unformattedValue)) {
          setFormData((prev) => ({
            ...prev,
            harga_satuan: formatRupiah(unformattedValue),
          }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [id]: value }));
      }
    }
  };

  const tambahBarang = async () => {
    if (!formData.contractFile) {
      Swal.fire("Error", "File Kontrak Masih Kosong", "error");
      setLoading(false);
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("nama_alkes", formData.nama_alkes);
    formDataToSend.append("merk", formData.merk);
    formDataToSend.append("satuan", formData.satuan);
    formDataToSend.append("harga_satuan", getRawValue(formData.harga_satuan));
    formDataToSend.append("keterangan", formData.keterangan);
    formDataToSend.append("penyedia", formData.penyedia);
    if (formData.contractFile) {
      formDataToSend.append("file_kontrak", formData.contractFile);
    }
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_APP_API_URL}/api/barang`,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      data: formDataToSend,
    })
      .then(function (response) {
        Swal.fire("Data Berhasil di Input!", "", "success");
        navigate("/master-data-barang");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleSimpan = async (e) => {
    e.preventDefault();
    setLoading(true);
    tambahBarang();
  };

  return (
    <div>
      <Breadcrumb pageName="Form Tambah Data Barang" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1" ? "Form Tambah Data Barang" : ""}
          </h1>
          <div>
            <Link
              to="/master-data-barang"
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
                  htmlFor="nama_alkes"
                >
                  Nama Barang :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nama_alkes"
                  value={formData.nama_alkes}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Nama Barang"
                />
              </div>
            </div>

            {/* <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Standar Rawat Inap :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  name="standar_rawat_inap"
                  options={SelectOptions}
                  value={selectedStandar}
                  onChange={handleSelectChange}
                  placeholder="Standar Rawat Inap"
                  className="w-full cursor-pointer"
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
                  Standar Rawat Non Inap :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  name="standar_nonrawat_inap"
                  options={SelectOptions}
                  value={selectedNonStandar}
                  onChange={handleSelectChange}
                  placeholder="Standar Non Rawat Inap"
                  className="w-full cursor-pointer"
                  theme={selectThemeColors}
                />
              </div>
            </div> */}

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="merk"
                >
                  Merk :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="merk"
                  value={formData.merk}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Merk"
                />
              </div>
            </div>

            {/* <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="tipe"
                >
                  Tipe :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="tipe"
                  value={formData.tipe}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Tipe"
                />
              </div>
            </div> */}

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="satuan"
                >
                  Satuan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="satuan"
                  value={formData.satuan}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Satuan"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="harga_satuan"
                >
                  Harga Satuan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="harga_satuan"
                  value={formData.harga_satuan}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Harga Satuan"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="keterangan"
                >
                  Keterangan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <textarea
                  id="keterangan"
                  rows="4"
                  value={formData.keterangan}
                  onChange={handleChange}
                  className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  placeholder="Keterangan Barang"
                ></textarea>
              </div>
            </div>

            <FormInput
              id="penyedia"
              value={formData.penyedia}
              onChange={handleChange}
              type="text"
              placeholder={"Nama Penyedia Barang"}
              label="Nama Penyedia Barang :"
              required
            />

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="contractFile"
                >
                  Upload Bukti Kontrak Pengadaan:
                </label>
              </div>
              <div className="sm:flex-[5_5_0%] flex flex-col items-start gap-1">
                <div className="flex items-center">
                  <label className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-flex items-center">
                    <input
                      className="hidden"
                      id="contractFile"
                      onChange={handleChange}
                      type="file"
                      accept="application/pdf"
                    />
                    Upload File
                  </label>
                  {formData.contractFileName && (
                    <p className="text-gray-500 text-xs ml-4">
                      File: {formData.contractFileName}
                    </p>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Max file size: 15MB, Type: PDF
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 sm:mt-12 sm:gap-8">
              <div className="div sm:flex-[2_2_0%]"></div>
              <div className="div sm:flex-[5_5_0%] ">
                <div className="w-4/5 flex items-center gap-4">
                  <button
                    className="w-full bg-[#0ACBC2]  text-white font-bold py-4 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent"
                    type="submit"
                    disabled={loading}
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
    </div>
  );
};

export default TambahBarang;
