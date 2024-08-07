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
import { CgSpinner } from "react-icons/cg";

const EditDokumen = () => {
  const [formData, setFormData] = useState({
    nama_dokumen: "",
    // standar_rawat_inap: "",
    // standar_nonrawat_inap: "",
    nomor_bast: "",
    tanggal_bast: "",
    tahun_lokus: "",
    penerima_hibah: "",
    jenis_bmn: "",
    kepala_unit_pemberi: "",
    nama_kontrak_pengadaan: "",
    tanggal_kontrak_pengadaan: "",
    id_user_pemberi: "",
    contractFile: null,
    contractFileName: "",
    // keterangan: "",
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);
  const { id } = useParams();

  const fetchDokumenData = async () => {
    setGetLoading(true);
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/dokumen/${encodeURIComponent(decryptId(id))}`,
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
          nama_dokumen: data.nama_dokumen || "",
          nomor_bast: data.nomor_bast || "",
          tanggal_bast: data.tanggal_bast || "",
          tahun_lokus: data.tahun_lokus || "",
          penerima_hibah: data.penerima_hibah || "",
          jenis_bmn: data.jenis_bmn || "",
          kepala_unit_pemberi: data.kepala_unit_pemberi || "",
          nama_kontrak_pengadaan: data.nama_kontrak_pengadaan || "",
          tanggal_kontrak_pengadaan: data.tanggal_kontrak_pengadaan || "",
          id_user_pemberi: data.id_user_pemberi || "",
          contractFile: null,
          contractFileName: data.contractFileName || "",
          contractFileLink: data.contractFileLink || "",
        });
        setGetLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const updateDokumen = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "contractFile" && formData[key]) {
        formDataToSend.append("contractFile", formData[key]);
      } else if (key === "contractFileLink" && !formData.contractFile) {
        formDataToSend.append("contractFileLink", formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    await axios({
      method: "put",
      url: `${
        import.meta.env.VITE_APP_API_URL
      }/api/dokumen/${encodeURIComponent(decryptId(id))}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      data: JSON.stringify(formData),
    })
      .then(function (response) {
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
    updateDokumen();
  };
  useEffect(() => {
    fetchDokumenData();
  }, []);
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
      <Breadcrumb pageName="Form Edit Data Dokumen" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1" ? "Form Edit Data Dokumen" : ""}
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
                  htmlFor="penerima_hibah"
                >
                  Penerima Hibah :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="penerima_hibah"
                  value={formData.penerima_hibah}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Penerima Hibah"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="jenis_bmn"
                >
                  Jenis BMN :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="jenis_bmn"
                  value={formData.jenis_bmn}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Jenis BMN"
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
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="kepala_unit_pemberi"
                  value={formData.kepala_unit_pemberi}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Kepala Unit Pemberi"
                />
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

            {/* <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="nama_kontrak_pengadaan"
                >
                  Nama Kontrak Pengadaan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nama_kontrak_pengadaan"
                  value={formData.nama_kontrak_pengadaan}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Nama Kontrak Pengadaan"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="tanggal_kontrak_pengadaan"
                >
                  Tanggal Kontrak Pengadaan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="tanggal_kontrak_pengadaan"
                  value={formData.tanggal_kontrak_pengadaan}
                  onChange={handleChange}
                  type="date"
                  required
                  placeholder="Tanggal Kontrak Pengadaan"
                />
              </div>
            </div> */}

            {/* <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
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
            </div> */}

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

export default EditDokumen;
