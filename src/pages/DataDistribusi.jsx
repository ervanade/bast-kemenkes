import React from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import Select from "react-select";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BiChevronDown } from "react-icons/bi";
import DataTable from "react-data-table-component";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const filteredItems = [
  {
    region: "us-east-1",
    impressions: 5,
    reach: 6,
    clicks: 6,
    ctr: 6,
  },
];
const DataDistribusi = () => {
  const selectThemeColors = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      // primary25: '#7367f01a', // for option hover bg-color
      // primary: '#7367f0', // for selected option bg-color
      primary75: "#E7FFFE", // for option hover bg-color
      primary50: "#E7FFFE", // for option hover bg-color
      primary25: "#E7FFFE", // for option hover bg-color
      primary: "#00B1A9", // for selected option bg-color
      neutral10: "#D9DEE3", // for tags bg-color
      neutral20: "#D9DEE3", // for input border-color
      neutral30: "#16B3AC", // for input hover border-color
    },
  });
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
    <div>
      <Breadcrumb pageName="Data Distribusi" />
      <div className="flex flex-col items-center justify-center w-full tracking-tight mb-12">
        <h1 className="font-normal mb-3 text-xl lg:text-[28px] tracking-tight text-bodydark1">
          SELAMAT DATANG ADMIN KAB/KOTA KOTA BEKASI
        </h1>
        <div className="mt-8 mb-3">
          <label
            className="block text-[#728294] text-lg font-normal mb-2"
            htmlFor="email"
          >
            Provinsi
          </label>
          <Select
            options={options}
            defaultValue={options[1]}
            className="w-100"
            theme={selectThemeColors}
            isDisabled
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-[#728294] text-lg font-normal mb-2"
            htmlFor="email"
          >
            Kab / Kota
          </label>
          <Select
            options={options}
            defaultValue={options[1]}
            className="w-100"
            theme={selectThemeColors}
            isDisabled
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-[#728294] text-lg font-normal mb-2"
            htmlFor="email"
          >
            Kecamatan
          </label>
          <Select
            options={options}
            defaultValue={options[1]}
            className="w-100"
            theme={selectThemeColors}
          />
        </div>
        <button className="cursor-pointer mt-8 text-lg text-white px-8 py-2 bg-primary rounded-md tracking-tight">
          Cari Data
        </button>
      </div>
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
};

export default DataDistribusi;
