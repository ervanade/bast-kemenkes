import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { dataBarang, dataKecamatan, dataPuskesmas, roleOptions } from "../../data/data";
import { selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";

const TambahUser = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    c_password: "",
    username: "",
    name: "",
    role: roleOptions[2],
    provinsi: "",
    kabupaten:"",
    kecamatan:"",
    nip:""
  });

  const navigate = useNavigate();
  const user = useSelector((a) => a.auth.user);

  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKota, setListKota] = useState([]);
  const [listKecamatan, setListKecamatan] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProvinsiData = async () => {
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_APP_API_URL}/api/provinsi`,
        headers: {
          'Content-Type': 'application/json',
          //eslint-disable-next-line
          'Authorization': `Bearer ${user?.token}`
        }
      })
        .then(function (response) {
          // handle success
          // console.log(response)
          setListProvinsi(response.data.data);

        })

    } catch (error) {
      console.log(error)
    }
  }
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
  useEffect(() => {
    fetchProvinsiData()
  
  }, [])
  
  return (
    <div>
      <Breadcrumb pageName="Form Input Data User" />
      <Card>
        <div className="card-header flex justify-between">
          <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
            {user.role === "1"
              ? "Form Input Data User"
              : ""}
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
                required
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
                required
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
                  Nip :
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
                placeholder="Nip"
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
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: e,
                    }))
                  }
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
                  options={listProvinsi}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  value={formData.provinsi}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      provinsi: e,
                    }))
                  }
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
                  Kabupaten :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={roleOptions}
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: e,
                    }))
                  }
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
                  Kecamatan :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={roleOptions}
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: e,
                    }))
                  }
                  placeholder="Pilih Role"
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
    </div>
  );
};

export default TambahUser;
