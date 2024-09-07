import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const TesUpload = () => {
  const [pdfDocument, setPdfDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tteUrl, setTteUrl] = useState("");
  const [ttePosition, setTtePosition] = useState({ x: 200, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pdfScale, setPdfScale] = useState(1); // Track the scale of the PDF
  const [ttePage, setTtePage] = useState(1); // Track which page the TTE is on
  const containerRef = useRef(null);
  const canvasRef = useRef(null); // Canvas reference for scale calculation

  useEffect(() => {
    const tte = localStorage.getItem("tteImage");
    if (tte) {
      setTteUrl(tte);
    }
  }, []);

  useEffect(() => {
    // Reset TTE position when page changes
    setTtePosition({ x: 200, y: 100 });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      if (pageNumber !== ttePage) {
        // Reset TTE position if switching pages
        setTtePosition({ x: 200, y: 100 });
        setTtePage(pageNumber);
      }
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const pdfData = new Uint8Array(reader.result);
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfDocument(pdfUrl);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf",
  });

  const handleTteUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      setTteUrl(dataURL);
      localStorage.setItem("tteImage", dataURL);
    };

    reader.readAsDataURL(file);
  };

  const handleDragStart = (event) => {
    event.preventDefault();
    setDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    setDragOffset({
      x: ttePosition.x,
      y: ttePosition.y,
    });
  };

  const handleDrag = (event) => {
    if (dragging) {
      const x = event.clientX - dragStart.x + dragOffset.x;
      const y = event.clientY - dragStart.y + dragOffset.y;

      // Batasi posisi TTE agar tetap di dalam batas PDF
      const imgWidth = 80;
      const imgHeight = 80;
      setTtePosition({
        x: Math.max(0, Math.min(x, canvasRef.current.clientWidth - imgWidth)),
        y: Math.max(0, Math.min(y, canvasRef.current.clientHeight - imgHeight)),
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = (event) => handleDrag(event);
      const handleMouseUp = () => handleDragEnd();

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging]);

  const handleSave = async () => {
    if (!pdfDocument || !tteUrl) return;

    // Load PDF
    const pdfBytes = await fetch(pdfDocument).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Load TTE image
    const tteImageBytes = await fetch(tteUrl).then((res) => res.arrayBuffer());
    const tteImage = await pdfDoc.embedPng(tteImageBytes);

    // Add TTE image to the specific page
    const page = pdfDoc.getPage(ttePage - 1);
    const { width, height } = page.getSize();
    const imgWidth = 60;
    const imgHeight = 60;

    // Hitung posisi dengan skala PDF
    const x = Number(ttePosition.x) / Number(pdfScale) - 82;
    const y =
      height - Number(ttePosition.y) / Number(pdfScale) - imgHeight + 115;

    // Debugging
    console.log("ttePosition.x:", ttePosition.x);
    console.log("pdfScale:", pdfScale);
    console.log("Calculated x:", x);
    console.log("Calculated y:", y);

    // Pastikan nilai x dan y bukan NaN
    if (!isNaN(x) && !isNaN(y) && x >= 0 && y >= 0) {
      page.drawImage(tteImage, {
        x,
        y,
        width: imgWidth,
        height: imgHeight,
      });
    }

    // Save the PDF with TTE image
    const pdfBytesWithTTE = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytesWithTTE], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open or download the PDF
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #000",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop your PDF document here</p>
      </div>
      <div>
        <label htmlFor="">Pilih TTE : </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleTteUpload}
          style={{ marginBottom: "20px" }}
        />
      </div>
      {pdfDocument && (
        <div ref={containerRef} style={{ position: "relative" }}>
          <div style={{ marginTop: "10px" }}>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </button>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
              />
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <Document
            file={pdfDocument}
            onLoadSuccess={({ numPages, originalWidth }) => {
              setTotalPages(numPages);
              setPdfScale(1);
            }}
          >
            <Page
              key={`page_${currentPage}`}
              pageNumber={currentPage}
              scale={1.5}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              canvasRef={canvasRef}
            />
          </Document>
          {tteUrl && currentPage === ttePage && (
            <div
              className="tte"
              style={{
                position: "absolute",
                left: ttePosition.x,
                top: ttePosition.y,
                cursor: dragging ? "grabbing" : "grab",
                pointerEvents: dragging ? "none" : "auto",
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
            >
              <img
                src={tteUrl}
                alt="TTE"
                style={{
                  width: "80px",
                  height: "80px",
                  pointerEvents: "none",
                }}
              />
            </div>
          )}
          <button onClick={handleSave} style={{ marginTop: "20px" }}>
            Save Document
          </button>
        </div>
      )}
    </div>
  );
};

export default TesUpload;
