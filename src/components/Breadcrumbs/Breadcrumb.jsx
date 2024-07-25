import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Breadcrumb = ({ pageName, back, tte, jsonData, linkBack }) => {
  const navigate = useNavigate();
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
    <div className="mb-6 flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
      <h2 className="hidden text-title-md2 font-semibold text-[#728294] dark:text-white">
        {pageName}
      </h2>

      {back ? (
        <button
          onClick={() => navigate(`/data-distribusi/edit/${jsonData?.id}`)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-semibold"
        >
          Back
        </button>
      ) : (
        ""
      )}
      {tte ? (
        <div>
          <button
            type="button"
            className={` disabled:bg-red-100 disabled:text-red-500 bg-blue-600  text-white font-bold py-2 px-5 rounded-md focus:outline-none focus:shadow-outline dark:bg-transparent`}
            onClick={handleSimpan}
            disabled={jsonData?.jumlahDikirim !== jsonData?.jumlahDiterima}
          >
            {jsonData?.jumlahDikirim !== jsonData?.jumlahDiterima
              ? "Pastikan Jumlah Barang Dikirim / DIterima Sama Sebelum TTD !"
              : "Tanda Tangani Dokumen"}
          </button>
        </div>
      ) : (
        ""
      )}

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-[#B6BEC7]" to="/">
              Home /
            </Link>
          </li>
          <li className="font-medium text-[#728294]">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
