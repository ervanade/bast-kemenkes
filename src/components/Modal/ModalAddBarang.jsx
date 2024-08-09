import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { selectThemeColors } from "../../data/utils";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const ModalAddBarang = ({ show, onClose, onSave, editIndex, dataBarang }) => {
  const user = useSelector((a) => a.auth.user);
  const [barang, setBarang] = useState({
    id_barang: "",
    jenis_alkes: "",
    jumlah_dikirim: "",
    jumlah_diterima: "",
    nomor_kepemilikan: "",
    merk: "",
    satuan: "",
    harga_satuan: "",
    status_barang: "",
    keterangan: "",
  });
  const [listBarang, setListBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);

  const handleBarangChange = (selectedOption) => {
    setSelectedBarang(selectedOption);
    if (selectedOption) {
      setBarang((prev) => ({
        ...prev,
        id_barang: selectedOption ? selectedOption.id : "",
        jenis_alkes: selectedOption ? selectedOption.value : "",
        merk: selectedOption.merk ? selectedOption.merk : "",
        satuan: selectedOption.satuan ? selectedOption.satuan : "",
        keterangan: selectedOption.keterangan ? selectedOption.keterangan : "",
        status_barang: selectedOption.status_barang
          ? selectedOption.status_barang
          : "",
        harga_satuan: selectedOption.harga_satuan
          ? selectedOption.harga_satuan
          : "",
      }));
    }
  };

  useEffect(() => {
    if (editIndex !== null && dataBarang) {
      setBarang(dataBarang);
    } else {
      setBarang({
        id_barang: "",
        jenis_alkes: "",
        jumlah_dikirim: "",
        jumlah_diterima: "",
        nomor_kepemilikan: "",
        jumlah_diterima: "0",
        merk: "",
        satuan: "",
        harga_satuan: "",
        keterangan: "",
      });
    }
  }, [editIndex, dataBarang]);

  const handleSave = () => {
    if (
      !barang.id_barang ||
      !barang.jumlah_dikirim ||
      !barang.jumlah_diterima
    ) {
      Swal.fire("Error", "Ada Form yang belum di lengkapi", "error");
      return;
    }
    onSave(barang);
    setBarang({
      id_barang: "",
      jenis_alkes: "",
      jumlah_dikirim: "",
      jumlah_diterima: "",
      nomor_kepemilikan: "",
      jumlah_diterima: "0",
      merk: "",
      satuan: "",
      harga_satuan: "",
      keterangan: "",
    });
    setSelectedBarang(null);
    onClose();
  };

  const fetchBarang = async (idKota) => {
    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/barang`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setListBarang([
        ...response.data.data.map((item) => ({
          label: item.nama_alkes,
          value: item.nama_alkes,
          ...item,
        })),
      ]);
    } catch (error) {
      setListBarang([]);
    }
  };
  useEffect(() => {
    fetchBarang();
  }, []);
  useEffect(() => {
    if (dataBarang && listBarang.length > 0) {
      const initialOption = listBarang?.find(
        (prov) => prov.id == dataBarang.id_barang
      );
      if (initialOption) {
        setSelectedBarang({
          label: initialOption.label,
          value: initialOption.value,
        });
        setBarang((prev) => ({
          ...prev,
          merk: initialOption.merk ? initialOption.merk : "",
        }));
      }
    }
  }, [dataBarang]);
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
              {editIndex !== null ? "Edit Barang" : "Tambah Barang"}
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
                    className="block text-[#728294] text-base font-semibold mb-2"
                    htmlFor="email"
                  >
                    Barang :
                  </label>
                </div>
                <div className="">
                  <Select
                    options={listBarang}
                    value={selectedBarang}
                    onChange={handleBarangChange}
                    placeholder="Pilih Barang"
                    className="w-full"
                    theme={selectThemeColors}
                  />
                </div>
              </div>

              {/* <div className="mb-8 flex-col  sm:gap-2 w-full flex ">
                <div className="">
                  <label
                    className=" block text-[#728294] text-base font-semibold mb-2"
                    htmlFor="email"
                  >
                    Merk / Type :
                  </label>
                </div>
                <div className="">
                  <input
                    className={` bg-white disabled:bg-[#F2F2F2] appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                    id="jumlah_barang_dikirim"
                    type="text"
                    value={barang.merk}
                    disabled
                    placeholder="Merk / Type"
                  />
                </div>
              </div> */}
              {
                user.role === "1" ? 
                  <div className="mb-8 flex-col  sm:gap-2 w-full flex ">
                  <div className="">
                    <label
                      className=" block text-[#728294] text-base font-semibold mb-2"
                      htmlFor="email"
                    >
                      Jumlah Barang yang dikirim :
                    </label>
                  </div>
                  <div className="">
                    <input
                      className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                      "border-red-500" 
                   rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                      id="jumlah_barang_dikirim"
                      type="number"
                      required
                      value={barang.jumlah_dikirim}
                      onChange={(e) =>
                        setBarang((prev) => ({
                          ...prev,
                          jumlah_dikirim: e.target.value,
                        }))
                      }
                      placeholder="Jumlah Barang yang dikirim"
                    />
                  </div>
                </div>
                : user.role === "3" ?   <div className="mb-8 flex-col  sm:gap-2 w-full flex ">
                <div className="">
                  <label
                    className=" block text-[#728294] text-base font-semibold mb-2"
                    htmlFor="email"
                  >
                    Jumlah Barang yang Diterima :
                  </label>
                </div>
                <div className="">
                  <input
                    className={` bg-white disabled:bg-[#F2F2F2] appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                    id="jumlah_diterima"
                    type="text"
                    required
                    value={barang.jumlah_diterima}
                    onChange={(e) =>
                      setBarang((prev) => ({
                        ...prev,
                        jumlah_diterima: e.target.value,
                      }))
                    }
                    placeholder="Jumlah Barang yang Diterima"
                  />
                </div>
              </div> : ""
                
              }

           
              
            

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
                {"Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddBarang;
