import React, { useEffect, useState, useRef } from "react";
import UserDefault from "../assets/user/user-default.png";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import SignatureCanvas from "react-signature-canvas";

import { useSelector } from "react-redux";
import { roleOptions } from "../data/data";
import axios from "axios";
import ModalProfile from "../components/Modal/ModalProfile";

const Profile = () => {
  const [signature, setSignature] = useState(null);
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("tab2");

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleSaveSignature = (signatureDataURL) => {
    setSignature(signatureDataURL);
    setFile(null); // Clear file if a signature is saved
  };

  const handleUploadFile = (event) => {
    setFile(event.target.files[0]);
    setSignature(null); // Clear signature if a file is uploaded
    setShowPopup(false);
  };

  const handleTabChange = (event, tab) => {
    event.preventDefault();
    setActiveTab(tab);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Kirim data ke API sesuai dengan kebutuhan Anda
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (signature) {
      const response = await fetch(signature);
      const blob = await response.blob();
      formData.append(
        "signature",
        new File([blob], "signature.png", { type: "image/png" })
      );
    }
    // Fetch API call example
    await fetch("your-api-endpoint", {
      method: "POST",
      body: formData,
    });
    alert("Data submitted successfully");
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    role: roleOptions[2],
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    nip: "",
  });
  const user = useSelector((a) => a.auth.user);
  const fetchBarangData = async () => {
    try {
      // eslint-disable-next-line
      const responseUser = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/api/me`,
        headers: {
          "Content-Type": "application/json",
          //eslint-disable-next-line
          Authorization: `Bearer ${user?.token}`,
        },
      }).then(function (response) {
        // handle success
        // console.log(response)
        const data = response.data;
        setFormData({
          nama: data.name,
          nip: data.nip,
          no_telp: "",
          role: data.role,
          email: data.email,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBarangData();
  }, []);

  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Informasi Personal
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-5.5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={UserDefault} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Foto Profil Anda
                      </span>
                    </div>
                  </div>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-3/4 cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-4"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <p>
                        <span className="text-primary">
                          Upload Foto Profile Anda
                        </span>
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG</p>
                      <p>(max: 1MB size:800 X 800px)</p>
                    </div>
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="Username"
                    id="Username"
                    placeholder="Username"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nama: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="nama"
                  >
                    Nama
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="nama"
                    id="nama"
                    placeholder="nama"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nama: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Nip"
                  >
                    Nip
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="Nip"
                    id="Nip"
                    placeholder="Nip"
                    value={formData.nip}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nip: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Role"
                  >
                    Role
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="Role"
                    id="Role"
                    disabled
                    placeholder="Role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex justify-center gap-4.5">
                  {/* <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button> */}
                  <button
                    className="flex justify-center rounded bg-primary py-3 px-8 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                TTE Anda
              </h3>
            </div>
            <div className="p-7">
              <form className="p-4">
                <button
                  type="button"
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-3 w-full rounded mb-4"
                  onClick={handleOpenPopup}
                >
                  Input TTE
                </button>

                {!signature && !file ? (
                  <div className="w-full  rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 ">
                    <p className="text-center text-red-400 p-2 font-semibold">
                      Anda Belum TTE!
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {signature && (
                  <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center">
                      Preview TTE
                    </label>
                    <img
                      src={signature}
                      alt="Signature"
                      className="w-48 mx-auto py-2"
                      style={{ width: "200px", height: "100px" }}
                    />
                  </div>
                )}
                {file && (
                  <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center">
                      Preview TTE
                    </label>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="File"
                      className="w-48 mx-auto py-2"
                      style={{ width: "200px", height: "100px" }}
                    />
                  </div>
                )}

                <ModalProfile
                  isVisible={showPopup}
                  onClose={() => setShowPopup(false)}
                  onSaveSignature={handleSaveSignature}
                  onUploadFile={handleUploadFile}
                  signature={signature}
                  file={file}
                  activeTab={activeTab}
                  handleTabChange={handleTabChange}
                />

                <div className="flex justify-center mt-4">
                  {/* <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button> */}
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => {
                      setSignature(null);
                      setFile(null);
                    }}
                  >
                    Reset
                  </button>
                </div>
                {/* <div className="mb-4 flex items-center gap-3">
                  <div className="w-1/2">
                    <img src={UserDefault} alt="User" className="w-full" />
                  </div>
                  <div>
                    <span className="mb-1.5 text-black dark:text-white">
                      TTE Anda
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
