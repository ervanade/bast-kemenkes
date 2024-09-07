import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const TesUpload = () => {
  const [pdfDocument, setPdfDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [tteUrl, setTteUrl] = useState("");
  const [ttePosition, setTtePosition] = useState({ x: 20, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [ttePage, setTtePage] = useState(1); // Track which page the TTE is on
  const containerRef = useRef(null);

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
        setTtePosition({ x: 20, y: 100 });
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
      setTtePosition({ x, y });
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

  const handleSave = () => {
    // Implement logic to save PDF with TTE
    alert("Document saved!");
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
      <input
        type="file"
        accept="image/*"
        onChange={handleTteUpload}
        style={{ marginBottom: "20px" }}
      />
      {pdfDocument && (
        <div ref={containerRef} style={{ position: "relative" }}>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
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
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
          >
            <Page
              key={`page_${currentPage}`}
              pageNumber={currentPage}
              scale={1.5}
              renderTextLayer={false}
              renderAnnotationLayer={false}
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
                  width: "100px",
                  height: "auto",
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
