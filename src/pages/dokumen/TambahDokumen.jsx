import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  batchOptions,
  dataBarang,
  dataKecamatan,
  dataPuskesmas,
  ProgramOptions,
  roleOptions,
  SelectOptions,
} from "../../data/data";
import { FaEdit, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { decryptId, selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import FormInput from "../../components/Form/FormInput";

const TambahDokumen = () => {
  var today = new Date();
  const defaultDate = today.toISOString().substring(0, 10);
  const [formData, setFormData] = useState({
    nama_dokumen: "",
    nomor_bast: "",
    tanggal_bast: defaultDate,
    tahun_lokus: "",
    penerima_hibah: "",
    kepala_unit_pemberi: "Direktur Tata Kelola Kesehatan Masyarakat",
    id_user_pemberi: "",
    id_provinsi: "",
    id_kabupaten: "",
    contractFile: null,
    contractFileName: "",
  });

  const [isPenerimaEditable, setIsPenerimaEditable] = useState(false);
  const [isKepalaEditable, setIsKepalaEditable] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/users`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setDataUser([
        ...response.data.data
          .filter((a) => a.role == "1" || a.role == "2")
          .map((item) => ({
            label: item.email,
            value: item.id,
          })),
      ]);
    } catch (error) {
      setError(true);
      setDataProvinsi([]);
    } finally {
      setLoading(false);
    }
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
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const tambahDokumen = async () => {
    if (!formData.contractFile) {
      Swal.fire("Error", "File Kontrak Masih Kosong", "error");
      setLoading(false);
      return;
    }
    if (
      !formData.id_provinsi ||
      !formData.id_kabupaten ||
      !selectedBatch ||
      !selectedProgram
    ) {
      Swal.fire("Error", "Ada Form yang belum di lengkapi", "error");
      setLoading(false);
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("nama_dokumen", formData.nama_dokumen);
    formDataToSend.append("nomor_bast", formData.nomor_bast);
    formDataToSend.append("tanggal_bast", formData.tanggal_bast);
    formDataToSend.append("penerima_hibah", formData.penerima_hibah);
    formDataToSend.append("tahun_lokus", formData.tahun_lokus);
    formDataToSend.append("kepala_unit_pemberi", formData.kepala_unit_pemberi);
    formDataToSend.append("id_user_pemberi", formData.id_user_pemberi);
    formDataToSend.append("id_provinsi", formData.id_provinsi);
    formDataToSend.append("id_kabupaten", formData.id_kabupaten);
    formDataToSend.append("program", selectedProgram.value);
    formDataToSend.append("batch", selectedBatch.value);
    if (formData.contractFile) {
      formDataToSend.append("file_kontrak", formData.contractFile);
    }

    await axios({
      method: "post",
      url: `${import.meta.env.VITE_APP_API_URL}/api/dokumen`,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      data: formDataToSend,
    })
      .then(function (response) {
        setLoading(false);
        Swal.fire("Data Berhasil di Input!", "", "success");
        navigate("/dokumen");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleSimpan = async (e) => {
    e.preventDefault();
    setLoading(true);
    tambahDokumen();
  };

  useEffect(() => {
    fetchProvinsi();
    fetchUserData();
  }, []);

  const handleProvinsiChange = (selectedOption) => {
    setSelectedProvinsi(selectedOption);
    setSelectedKota(null);
    setSelectedKecamatan(null);
    setDataKota([]);
    setFormData((prev) => ({
      ...prev,
      id_provinsi: selectedOption ? selectedOption.value.toString() : "",
    }));
    if (selectedOption) {
      fetchKota(selectedOption.value);
    }
  };

  const handleKotaChange = (selectedOption) => {
    setSelectedKota(selectedOption);
    setSelectedKecamatan(null);
    setFormData((prev) => ({
      ...prev,
      id_kabupaten: selectedOption ? selectedOption.value.toString() : "",
    }));
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        penerima_hibah: `Kepala Dinas Kesehatan ${selectedOption.label}`,
      }));
    }
  };

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
    setFormData((prev) => ({
      ...prev,
      id_user_pemberi: selectedOption ? selectedOption.value.toString() : "",
    }));
  };

  const handleProgramChange = (selectedOption) => {
    setSelectedProgram(selectedOption);
    setFormData((prev) => ({
      ...prev,
      program: selectedOption ? selectedOption.value.toString() : "",
    }));
  };
  const handleBatchChange = (selectedOption) => {
    setSelectedBatch(selectedOption);
    setFormData((prev) => ({
      ...prev,
      program: selectedOption ? selectedOption.value.toString() : "",
    }));
  };
  return (
    <div>
      <Breadcrumb pageName="Form Tambah Data Dokumen" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1" ? "Form Tambah Data Dokumen" : ""}
          </h1>
          <div>
            <Link
              to="/dokumen"
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
                  htmlFor="nama_dokumen"
                >
                  Nama Dokumen :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nama_dokumen"
                  value={formData.nama_dokumen}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Nama Dokumen"
                />
              </div>
            </div>

            <FormInput
              select={true}
              id="provinsi"
              options={dataProvinsi}
              value={selectedProvinsi}
              onChange={handleProvinsiChange}
              placeholder="Pilih Provinsi"
              label="Provinsi :"
              required
            />

            <FormInput
              select={true}
              id="kota"
              options={dataKota}
              value={selectedKota}
              isDisabled={!selectedProvinsi}
              onChange={handleKotaChange}
              placeholder={
                selectedProvinsi ? "Pilih Kab / Kota" : "Pilih Provinsi Dahulu"
              }
              label="Kab / Kota :"
              required
            />

            <FormInput
              select={true}
              name="program"
              options={ProgramOptions}
              value={selectedProgram}
              onChange={handleProgramChange}
              placeholder={"Pilih Program"}
              label="Program :"
              required
            />
            <FormInput
              select={true}
              name="batch"
              options={batchOptions}
              value={selectedBatch}
              onChange={handleBatchChange}
              placeholder={"Pilih Batch"}
              label="Batch :"
              required
            />

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="nomor_bast"
                >
                  Nomor BAST :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nomor_bast"
                  value={formData.nomor_bast}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Nomor BAST"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="tanggal_bast"
                >
                  Tanggal BAST :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="tanggal_bast"
                  value={formData.tanggal_bast}
                  onChange={handleChange}
                  type="date"
                  required
                  placeholder="Tanggal BAST"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="tahun_lokus"
                >
                  Tahun Lokus :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="tahun_lokus"
                  value={formData.tahun_lokus}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Tahun Lokus"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="kepala_unit_pemberi"
                >
                  Kepala Unit Pemberi :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%] flex items-center">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="kepala_unit_pemberi"
                  value={formData.kepala_unit_pemberi}
                  onChange={handleChange}
                  type="text"
                  required
                  disabled={!isKepalaEditable}
                  placeholder="Kepala Unit Pemberi"
                />
                <button
                  type="button"
                  onClick={() => setIsKepalaEditable((prev) => !prev)}
                  className={`focus:outline-none ml-2 ${
                    isKepalaEditable ? "text-teal-500" : "text-[#728294]"
                  }`}
                >
                  <FaEdit />
                </button>
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="penerima_hibah"
                >
                  Penerima Hibah :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%] flex items-center">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="penerima_hibah"
                  value={formData.penerima_hibah}
                  onChange={handleChange}
                  type="text"
                  required
                  disabled={!isPenerimaEditable}
                  placeholder="Penerima Hibah"
                />
                <button
                  type="button"
                  onClick={() => setIsPenerimaEditable((prev) => !prev)}
                  className={`focus:outline-none ml-2 ${
                    isPenerimaEditable ? "text-teal-500" : "text-[#728294]"
                  }`}
                >
                  <FaEdit />
                </button>
              </div>
            </div>

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

export default TambahDokumen;
