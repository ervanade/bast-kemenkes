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

const EditUser = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    c_password: "",
    username: "",
    name: "",
    role: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    nip: "",
    no_tlp: "",
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);

  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [getLoading, setGetLoading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchUserData = async () => {
    setGetLoading(true);
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/users/${encodeURIComponent(decryptId(id))}`,
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
          password: "",
          email: data.email || "",
          c_password: "",
          username: data.username || "",
          name: data.name || "",
          role: data.role || "",
          provinsi: data.provinsi || "",
          kabupaten: data.kabupaten || "",
          kecamatan: data.kecamatan || "",
          nip: data.nip || "",
          no_tlp: data.no_tlp || "",
        });
        setSelectedRole(roleOptions.find((a) => a.value == data.role));
        setGetLoading(false);
      });
    } catch (error) {
      if (error.response.status == 404) {
        navigate("/not-found");
      }
      console.log(error);
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
    } catch (error) {
      setError(true);
      setDataKecamatan([]);
    }
  };

  const updateUser = async () => {
    if (formData.password !== formData.c_password) {
      Swal.fire(
        "Error",
        "Password Tidak Sama dengan Confirm Password",
        "error"
      );
      setLoading(false);
      return;
    }
    if (formData.role == "3" && (!formData.provinsi || !formData.kabupaten)) {
      Swal.fire(
        "Error",
        "Jika User Daerah Harap Masukan Provinsi & Kabupaten",
        "error"
      );
      setLoading(false);
      return;
    }

    const formDataToSend = {
      email: formData.email,
      username: formData.username,
      name: formData.name,
      role: formData.role,
      provinsi: formData.provinsi.toString(),
      kabupaten: formData.kabupaten.toString(),
      kecamatan: formData.kecamatan.toString(),
      nip: formData.nip,
      no_tlp: formData.no_tlp,
    };

    // Add password fields only if they are not empty
    if (formData.password) {
      formDataToSend.password = formData.password;
    }
    if (formData.c_password) {
      formDataToSend.c_password = formData.c_password;
    }

    try {
      await axios({
        method: "put",
        url: `${
          import.meta.env.VITE_APP_API_URL
        }/api/users/${encodeURIComponent(decryptId(id))}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        data: JSON.stringify(formDataToSend),
      });
      Swal.fire("Data Berhasil di Input!", "", "success");
      navigate("/user-management");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.status == 500) {
        Swal.fire("Error", "Email Telah Digunakan", "error");
        setLoading(false);
        return;
      }
    }
  };
  const handleSimpan = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateUser();
  };
  useEffect(() => {
    fetchUserData();
    fetchProvinsi();
  }, []);

  const handleProvinsiChange = (selectedOption) => {
    setSelectedProvinsi(selectedOption);
    setSelectedKota(null);
    setSelectedKecamatan(null);
    setDataKota([]);
    setDataKecamatan([]);
    setFormData((prev) => ({
      ...prev,
      provinsi: selectedOption ? selectedOption.value : "",
    }));
    if (selectedOption) {
      fetchKota(selectedOption.value);
    }
  };

  const handleKotaChange = (selectedOption) => {
    setSelectedKota(selectedOption);
    setSelectedKecamatan(null);
    setDataKecamatan([]);
    setFormData((prev) => ({
      ...prev,
      kabupaten: selectedOption ? selectedOption.value : "",
    }));
    if (selectedOption) {
      fetchKecamatan(selectedOption.value);
    }
  };

  const handleKecamatanChange = (selectedOption) => {
    setSelectedKecamatan(selectedOption);
    setFormData((prev) => ({
      ...prev,
      kecamatan: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
    setFormData((prev) => ({
      ...prev,
      role: selectedOption ? selectedOption.value : "",
    }));
  };

  useEffect(() => {
    if (formData.provinsi && dataProvinsi.length > 0) {
      const initialOption = dataProvinsi?.find(
        (prov) => prov.value == formData.provinsi
      );
      if (initialOption) {
        setSelectedProvinsi({
          label: initialOption.label,
          value: initialOption.value,
        });
      }
    }
    if (formData.kecamatan && dataKecamatan.length > 0) {
      const initialOption = dataKecamatan.find(
        (kec) => kec.value == formData.kecamatan
      );
      if (initialOption) {
        setSelectedKecamatan({
          label: initialOption.label,
          value: initialOption.value,
        });
      }
    }
    if (formData.kabupaten && dataKota.length > 0) {
      const initialOption = dataKota.find(
        (kec) => kec.value == formData.kabupaten
      );

      if (initialOption) {
        setSelectedKota({
          label: initialOption.label,
          value: initialOption.value,
          provinsi: initialOption.provinsi,
        });
      }
    }
  }, [formData, dataProvinsi, dataKecamatan, dataKota]);
  useEffect(() => {
    if (formData.provinsi) {
      fetchKota(formData.provinsi);
    }
    if (formData.kabupaten) {
      fetchKecamatan(formData.kabupaten);
    }
  }, [formData.provinsi, formData.kabupaten]);

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
      <Breadcrumb pageName="Form Edit Data User" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role == "1" ? "Form Edit Data User" : ""}
          </h1>
          <div>
            <Link
              to="/user-management"
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
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
                  htmlFor="password"
                >
                  Password :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="*******"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="password"
                >
                  Confirm Password :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="password"
                  type="password"
                  value={formData.c_password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      c_password: e.target.value,
                    }))
                  }
                  placeholder="*******"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Username :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  type="text"
                  required
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Nama :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  required
                  placeholder="Nama"
                />
              </div>
            </div>
            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="nip"
                >
                  NIP :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="nip"
                  value={formData.nip}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nip: e.target.value,
                    }))
                  }
                  type="text"
                  required
                  placeholder="NIP"
                />
              </div>
            </div>
            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="no_tlp"
                >
                  No Handphone :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                  id="no_tlp"
                  value={formData.no_tlp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      no_tlp: e.target.value,
                    }))
                  }
                  type="text"
                  required
                  placeholder="No Handphone"
                />
              </div>
            </div>
            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Role :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={roleOptions}
                  value={selectedRole}
                  onChange={handleRoleChange}
                  placeholder="Pilih Role"
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
                  Provinsi :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataProvinsi}
                  value={selectedProvinsi}
                  onChange={handleProvinsiChange}
                  placeholder="Pilih Provinsi"
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
                  Kabupaten / Kota :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataKota}
                  value={selectedKota}
                  onChange={handleKotaChange}
                  isDisabled={!selectedProvinsi}
                  placeholder={
                    selectedProvinsi
                      ? "Pilih Kab / Kota"
                      : "Pilih Provinsi Dahulu"
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
                  htmlFor="email"
                >
                  Kecamatan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataKecamatan}
                  value={selectedKecamatan}
                  isDisabled={!selectedKota}
                  onChange={handleKecamatanChange}
                  placeholder={
                    selectedKota ? "Pilih Kecamatan" : "Pilih Kab / Kota Dahulu"
                  }
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

export default EditUser;
