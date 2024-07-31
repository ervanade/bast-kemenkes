import React from "react";
import CardDataStats from "../components/CardDataStats";
import { MdOutlineDomainVerification } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { PiShieldWarningBold } from "react-icons/pi";
import { RiHospitalLine } from "react-icons/ri";
import Article1 from "../assets/article/article-1.jpg";
import Article2 from "../assets/article/article-2.jpg";
import Article3 from "../assets/article/article-3.jpg";
import { useSelector } from "react-redux";
import { returnRole } from "../data/utils";

const Dashboard = () => {
  const user = useSelector((a) => a.auth.user);
  return (
    <div className="">
      <div className="rounded-md border border-stroke bg-white py-4 md:py-12 px-4 md:px-8 shadow-default dark:border-strokedark dark:bg-boxdark flex items-center gap-6 text-bodydark2">
        <img src="/welcome.png" alt="Welcome" />
        <div className="welcome-text">
          <h1 className="font-semibold mb-3 text-xl lg:text-[28px] tracking-tight">
            SELAMAT DATANG {user.username || "Username"}
          </h1>
          <p className="font-normal text-xl lg:text-[24px] tracking-tight">
            {user.username || "Username"}
          </p>
          <p className="font-normal text-xl lg:text-[24px] tracking-tight">
            Role : {user.role ? returnRole(user.role) : "" || "Role"}
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Data Distribusi"
          total={user.role === "3" ? "500" : "8.000"}
          rate="0.43%"
          color="text-[#42DFC3]"
          levelUp
        >
          <div className="flex p-2 items-center justify-center rounded-md bg-[#E7FBF7] dark:bg-meta-4">
            <AiOutlineDatabase size={28} className="fill-primary " />
          </div>
        </CardDataStats>
        <CardDataStats
          title="Data Terverifikasi"
          total={user.role === "3" ? "400" : "6.000"}
          rate="4.35%"
          color="text-[#79DF42]"
          levelUp
        >
          <div className="flex p-2 items-center justify-center rounded-md bg-[#EEFBE7] dark:bg-meta-4">
            <MdOutlineDomainVerification
              size={28}
              className="fill-[#79DF42] "
            />
          </div>
        </CardDataStats>
        <CardDataStats
          title="Data Belum Terverifikasi"
          total={user.role === "3" ? "50" : "1.000"}
          rate="2.59%"
          color="text-[#DFB342]"
          levelUp
        >
          <div className="flex p-2 items-center justify-center rounded-md bg-[#FBF5E7] dark:bg-meta-4">
            <PiShieldWarningBold size={28} className="fill-[#DFB342] " />
          </div>
        </CardDataStats>
        <CardDataStats
          title="Data Belum Diproses"
          total={user.role === "3" ? "50" : "1.000"}
          rate="0.95%"
          color="text-[#F46D6D]"
          levelDown
        >
          <div className="flex p-2 items-center justify-center rounded-md bg-[#FBE7E7] dark:bg-meta-4">
            <PiShieldWarningBold size={28} className="fill-[#F46D6D] " />
          </div>
        </CardDataStats>
      </div>
      <div className="mt-4 md:mt-8 rounded-md border border-stroke bg-white py-6 md:py-12 px-4 md:px-8 shadow-default dark:border-strokedark dark:bg-boxdark text-bodydark2">
        <div className="welcome-text">
          <h1 className="font-semibold mb-3 text-xl lg:text-[28px] tracking-tight text-center">
            PENGUMUMAN & INFORMASI
          </h1>
        </div>
        <div className="article-wrapper mt-12 flex flex-col lg:flex-row gap-8 w-full">
          {[
            {
              title: "Peninjauan Fasilitas Kesehatan di Sumatera Selatan",
              img: Article1,
            },
            {
              title: "Belajar Bareng di Plataran Sehat",
              img: Article2,
            },
            {
              title: "Ini Puskesmas Terbaik dalam Imunisasi Rutin",
              img: Article3,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="w-full bg-transpatent border border-[#cacaca] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg max-h-64 w-full object-cover"
                  src={item.img}
                  alt="article"
                />
              </a>
              <div className="p-5">
                {/* <a href="#" className=""> */}
                <p className="mb-4 text-xl lg:text-2xl font-medium tracking-tight text-gray-900 dark:text-white line-clamp-2">
                  {item.title}
                </p>
                {/* </a> */}
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
