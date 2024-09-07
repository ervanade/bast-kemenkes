import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs".toString();

function TesUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState("/contoh_laporan.pdf");

  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`/contoh_laporan.pdf`);
  };
  return (
    <div className="App">
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default TesUpload;
