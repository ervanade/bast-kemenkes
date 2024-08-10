import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModalTTE = ({ show, onClose, onSave, editIndex, jsonData, user }) => {
  const [formData, setFormData] = useState({
    nip: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSave = () => {
    Swal.fire({
      title: "Perhatian",
      text: "Jumlah dikirim dan diterima sudah sesuai, tandatangani BAST ini?",
      showCancelButton: true,
      denyButtonColor: "#3B82F6",
      confirmButtonColor: "#16B3AC",
      confirmButtonText: "Ya",
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
    setFormData({
      nip: "",
      password: "",
    });
    onClose();
  };

  if (!show) {
    return null;
  }
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-999 outline-none focus:outline-none">
      <div className="overlay fixed top-0 left-0 w-screen h-screen -z-99 bg-black/15"></div>
      <div className="relative my-6 mx-auto w-[85%] max-h-[80%] overflow-auto sm:w-3/4 xl:w-1/2 z-1">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-black/20 rounded-t ">
            <h3 className="text-xl font-bold text-primary">
              {editIndex !== null
                ? `TTE Dokumen ${jsonData?.nama_dokumen}`
                : `TTE Dokumen ${jsonData?.nama_dokumen}`}
            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={onClose}
            >
              <MdClose className="text-gray-500 opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full" />
              {/* <span className="text-red-500 opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span> */}
            </button>
          </div>
          <div className="modal-content">
            <form className="mt-5" onSubmit={handleSave}></form>
            <div className=" p-6 flex-auto w-full">
              <div className="mb-8 flex-col  sm:gap-2 w-full flex ">
                <div className="">
                  <label
                    className=" block text-[#728294] text-base font-semibold mb-2"
                    htmlFor="email"
                  >
                    NIP :
                  </label>
                </div>
                <div className="">
                  <input
                    className={` bg-white disabled:bg-[#F2F2F2] appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                  "border-red-500" 
               rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                    id="jumlah_barang_dikirim"
                    type="text"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nip: e.target.value,
                      }))
                    }
                    value={formData.nip}
                    placeholder="NIP"
                  />
                </div>
              </div>

              <div className="mb-8 flex-col  sm:gap-2 w-full flex ">
                <div className="">
                  <label
                    className="block text-[#728294] text-sm font-semibold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <div className="">
                  <input
                    className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
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
              <p className="text-center text-bodydark2 font-bold">
                TTE Dokumen Ini Sebagai{" "}
                {user?.role === "3" ? "User Daerah" : "PPK / Admin Pusat"}
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t gap-2 border-solid border-black/20 rounded-b">
              <button
                className="text-red-500 border-red-500 border background-transparent rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-[#0ACBC2]  text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent mr-1 mb-1"
                type="submit"
                onClick={handleSave}
              >
                {"TTE Dokumen Ini"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTTE;
