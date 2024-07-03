import React from "react";
import CardDataStats from "../components/CardDataStats";
import { MdOutlineDomainVerification } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { PiShieldWarningBold } from "react-icons/pi";
import { RiHospitalLine } from "react-icons/ri";

const Dashboard = () => {
  return (
    <div className="">
      <div className="rounded-md border border-stroke bg-white py-4 md:py-12 px-4 md:px-8 shadow-default dark:border-strokedark dark:bg-boxdark flex items-center gap-6 text-bodydark2">
        <img src="/welcome.png" alt="Welcome" />
        <div className="welcome-text">
          <h1 className="font-semibold mb-3 text-xl lg:text-[28px] tracking-tight">
            SELAMAT DATANG ADMIN KAB/KOTA KOTA BEKASI
          </h1>
          <p className="font-normal text-xl lg:text-[24px] tracking-tight">
            Username
          </p>
          <p className="font-normal text-xl lg:text-[24px] tracking-tight">
            Role : Admin
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Data Distribusi"
          total="450"
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
          total="400"
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
          total="50"
          rate="2.59%"
          color="text-[#DFB342]"
          levelUp
        >
          <div className="flex p-2 items-center justify-center rounded-md bg-[#FBF5E7] dark:bg-meta-4">
            <PiShieldWarningBold size={28} className="fill-[#DFB342] " />
          </div>
        </CardDataStats>
        <CardDataStats
          title="Jumlah Puskesmas"
          total="28,150"
          rate="0.95%"
          color="text-[#F46D6D]"
          levelDown
        >
          <div className="flex p-2 items-center justify-center rounded-md bg-[#FBE7E7] dark:bg-meta-4">
            <RiHospitalLine size={28} className="fill-[#F46D6D] " />
          </div>
        </CardDataStats>
      </div>
      <div className="mt-4 md:mt-8 rounded-md border border-stroke bg-white py-6 md:py-12 px-4 md:px-8 shadow-default dark:border-strokedark dark:bg-boxdark text-bodydark2">
        <div className="welcome-text">
          <h1 className="font-semibold mb-3 text-xl lg:text-[28px] tracking-tight text-center">
            PENGUMUMAN & INFORMASI
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
