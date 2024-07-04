import React, { useState } from "react";
import Card from "../components/Card/Card";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { dataKecamatan } from "../data/data";
import { selectThemeColors } from "../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";

const FormInput = () => {
  const [formData, setFormData] = useState({
    kecamatan: "",
    password: "",
    email: "",
    nomor: "",
    agree: false,
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
  return (
    <div>
      <Breadcrumb pageName="Form Input Data BAST" />
      <Card>
        <h1 className="mb-12 font-medium font-antic text-xl lg:text-[28px] tracking-tight text-left text-bodydark1">
          Form Input Data BAST Admin Dinas Kesehatan Kab/Kota
        </h1>
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
                  options={dataKecamatan}
                  placeholder="Pilih Puskesmas"
                  className="w-full"
                  theme={selectThemeColors}
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Nama Kepala Puskesmas :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="text"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Nama Kepala Puskesmas"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  NIP Kepala Puskesmas :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="text"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="NIP Kepala Puskesmas"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className="block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Nama Barang yang diterima :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <Select
                  options={dataKecamatan}
                  placeholder="Pilih Barang"
                  className="w-full"
                  theme={selectThemeColors}
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Jumlah Barang yang dikirim :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={`sm:flex-[5_5_0%] bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="number"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Jumlah Barang yang dikirim"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Jumlah Barang yang diterima :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <input
                  className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="number"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Jumlah Barang yang diterima"
                />
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Upload TTE :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <button
                  className="w-1/4 bg-[#0ACBC2]  text-white font-bold py-4 px-6 rounded-md focus:outline-none focus:shadow-outline"
                  onClick={handleSimpan}
                >
                  {loading ? "Loading..." : "Pilih File"}
                </button>
                <span className="text-sm text-bodydark2">
                  petunjuk upload file: besaran kb/mb, tipe file jpg/jpeg
                </span>
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Keterangan Daerah :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <textarea
                  id="message"
                  rows="4"
                  className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline`}
                  placeholder="Keterangan : misal: komplit dan baik atau kurang dari rensi dan baik"
                ></textarea>
              </div>
            </div>

            <div className="mb-8 flex-col sm:flex-row sm:gap-8 flex sm:items-center sm:justify-center">
              <div className="sm:flex-[2_2_0%]">
                <label
                  className=" block text-[#728294] text-base font-normal mb-2"
                  htmlFor="email"
                >
                  Keterangan PPK :
                </label>
              </div>
              <div className="sm:flex-[5_5_0%]">
                <textarea
                  id="message"
                  rows="4"
                  className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline`}
                  placeholder="Keterangan : misal: disetujui atau konfirmasi ke transporter barang sedang dikirim kembali"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6 sm:mt-12 sm:gap-8">
              <div className="div sm:flex-[2_2_0%]"></div>
              <div className="div sm:flex-[5_5_0%] ">
                <div className="w-4/5 flex items-center gap-4">
                  <button
                    className="w-full bg-[#0ACBC2]  text-white font-bold py-4 px-6 rounded-md focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {loading ? "Loading..." : "Simpan"}
                  </button>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="w-full bg-[#fff]  text-[#0ACBC2] border border-[#0ACBC2] font-bold py-4 px-6 rounded-md focus:outline-none focus:shadow-outline"
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

export default FormInput;
