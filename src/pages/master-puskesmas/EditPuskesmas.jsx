import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  dataBarang,
  dataKecamatan,
  dataPuskesmas,
  roleOptions,
} from "../../data/data";
import { decryptId, selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

const EditPuskesmas = () => {
  const [formData, setFormData] = useState({
    nama_puskesmas: "",
    id_provinsi: "",
    id_kabupaten: "",
    id_kecamatan: "",
    alamat: "",
    nomor_telpon: "",
    email: "",
    status_puskesmas: "",
    keterangan: "",
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);

  const [error, setError] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchPuskesmasData = async () => {
    setGetLoading(true);
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/puskesmas/${encodeURIComponent(decryptId(id))}`,
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
          nama_puskesmas: data.nama_puskesmas || "",
          id_provinsi: data.id_provinsi || "",
          id_kabupaten: data.id_kabupaten || "",
          id_kecamatan: data.id_kecamatan || "",
          alamat: data.alamat || "",
          nomor_telpon: data.nomor_telpon || "",
          email: data.email || "",
          status_puskesmas: data.status_puskesmas || "",
          keterangan: data.keterangan || "",
        });
      });
      setGetLoading(false);
    } catch (error) {
      if (error.response.status == 404) {
        navigate("/not-found");
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const updatePuskesmas = async () => {
    await axios({
      method: "put",
      url: `${
        import.meta.env.VITE_APP_API_URL
      }/api/puskesmas/${encodeURIComponent(decryptId(id))}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      data: JSON.stringify(formData),
    })
      .then(function (response) {
        Swal.fire("Data Berhasil di Update!", "", "success");
        navigate("/master-data-puskesmas");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleSimpan = async (e) => {
    e.preventDefault();
    setLoading(true);
    updatePuskesmas();
  };
  useEffect(() => {
    fetchPuskesmasData();
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
      <Breadcrumb pageName="Form Edit Data Puskesmas" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1" ? "Form Edit Data Puskesmas" : ""}
          </h1>
          <div>
            <Link
              to="/master-data-puskesmas"
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
                  Nama Puskesmas :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nama_puskesmas"
                  value={formData.nama_puskesmas}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Nama Puskesmas"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="id_provinsi"
                >
                  Provinsi :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="id_provinsi"
                  value={formData.id_provinsi}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Provinsi"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="id_kabupaten"
                >
                  Kabupaten :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="id_kabupaten"
                  value={formData.id_kabupaten}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Kabupaten"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="id_kecamatan"
                >
                  Kecamatan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="id_kecamatan"
                  value={formData.id_kecamatan}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Kecamatan"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="alamat"
                >
                  Alamat :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Alamat"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="nomor_telpon"
                >
                  Nomor Telpon :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nomor_telpon"
                  value={formData.nomor_telpon}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Nomor Telpon"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Email :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="status_puskesmas"
                >
                  Status Puskesmas :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="status_puskesmas"
                  value={formData.status_puskesmas}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Status Puskesmas"
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
                  placeholder="Keterangan Puskesmas"
                ></textarea>
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

export default EditPuskesmas;
