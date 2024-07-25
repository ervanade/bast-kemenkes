import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ModalConfirmPPK = ({ showModal, setShowModal, children, Title }) => {
  //   const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button> */}
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-999 outline-none focus:outline-none">
            <div className="overlay fixed top-0 left-0 w-screen h-screen -z-99 bg-black/15"></div>
            <div className="relative my-6 mx-auto w-[85%] max-h-[80%] overflow-auto sm:w-3/4 xl:w-1/2 z-1">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-black/20 rounded-t ">
                  <h3 className="text-xl font-bold text-primary">
                    {Title || "Popup"}
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <MdClose className="text-gray-500 opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full" />
                    {/* <span className="text-red-500 opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span> */}
                  </button>
                </div>
                <div className=" p-6 flex-auto w-full">
                  <div className="mb-8 flex-col sm:gap-2 flex w-full">
                    <div className="">
                      <label
                        className=" block text-[#728294] text-base font-semibold mb-2"
                        htmlFor="email"
                      >
                        Keterangan PPK :
                      </label>
                    </div>
                    <div className="">
                      <textarea
                        id="message"
                        rows="4"
                        // value={formData.ket_ppk}
                        // onChange={(e) =>
                        //   setFormData((prev) => ({
                        //     ...prev,
                        //     ket_ppk: e.target.value,
                        //   }))
                        // }
                        className={` bg-white appearance-none border border-[#cacaca] focus:border-[#0ACBC2]
                    "border-red-500" 
                 rounded-md w-full py-3 px-3 text-[#728294] leading-tight focus:outline-none focus:shadow-outline dark:bg-transparent`}
                        placeholder="Keterangan : misal: disetujui atau konfirmasi ke transporter barang sedang dikirim kembali"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t gap-2 border-solid border-black/20 rounded-b">
                  <button
                    className="text-red-500 border-red-500 border background-transparent rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-primary font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalConfirmPPK;
