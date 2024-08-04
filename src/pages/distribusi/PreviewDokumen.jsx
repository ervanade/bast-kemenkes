import React, { useEffect, useState, useRef } from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  View,
  Text,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";

import Html from "react-pdf-html";
import { dataDistribusiBekasi } from "../../data/data";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";

const PreviewDokumen = () => {
  const { id } = useParams();
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

  const iframeRef = useRef(null);
  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);

  useEffect(() => {
    const iframeCurrent = iframeRef.current;

    const handleLoad = () => setIsIFrameLoaded(true);

    if (iframeCurrent) {
      iframeCurrent.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframeCurrent) {
        iframeCurrent.removeEventListener("load", handleLoad);
      }
    };
  }, [jsonData]);

  useEffect(() => {
    const data = dataDistribusiBekasi.find((a) => a.id === parseInt(id));
    if (!data) {
      navigate("/not-found");
    }
    setJsonData({
      id: data.id,
      nomorSurat: new Date().toISOString().substring(0, 10),
      tanggal: new Date().toISOString().substring(0, 10),
      kecamatan: data.kecamatan,
      puskesmas: data.Puskesmas,
      namaKapus: data.nama_kapus,
      nipKapus: "nip.121212",
      namaBarang: data.nama_barang,
      jumlahDikirim: data.jumlah_barang_dikirim.toString(),
      jumlahDiterima: data.jumlah_barang_diterima.toString(),
      tte: "",
      tteDaerah: {
        image_url:
          "https://www.shutterstock.com/image-vector/fake-autograph-samples-handdrawn-signatures-260nw-2332469589.jpg",
        width: 50,
        height: 50,
      },
      ket_daerah: "",
      ket_ppk: data.keterangan_ppk,
    });
  }, []);
  Font.register({
    family: "Arial",
    fonts: [
      {
        src: "/fonts/ARIAL.TTF",
        fontWeight: 400,
      },
      {
        src: "/fonts/ARIALBD.TTF",
        fontWeight: 700,
      },
    ],
  });

  const styles = StyleSheet.create({
    viewer: {
      width: "100%", //the pdf viewer will take up all of the width and height
      height: (window.innerHeight * 4) / 5,
    },
    page: {
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
      flexDirection: "column",
    },
    logo: {
      width: 74,
      height: 66,
      marginLeft: "auto",
      marginRight: "auto",
    },
    titleContainer: {
      flexDirection: "row",
      marginTop: 24,
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    reportTitle: {
      fontFamily: "Arial",
      color: "#000",
      fontSize: 12,
      fontWeight: "normal",
      width: "50%",
      letterSpacing: 1.2,
      textAlign: "left",
    },
    docContainer: {
      marginTop: 24,
      width: "100%",
    },
    docContainerBorder: {
      flexDirection: "column",
      marginTop: 16,
      border: 1,
      display: "flex",
      width: "100%",
      height: "520px",
      paddingVertical: "24px",
      paddingLeft: "10px",
      paddingRight: "16px",
    },
    ttdContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      //   alignItems: "flex-start",
      marginTop: 24,
      display: "flex",
      width: "100%",
    },
    text: {
      color: "#000",
      fontSize: 10,
      lineHeight: 1.5,
      fontWeight: "normal",
      textAlign: "left",
      fontFamily: "Arial",
      textOverflow: "clip",
    },
    textBold: {
      color: "#000",
      fontSize: 10,
      lineHeight: 1.5,
      fontWeight: "bold",
      textAlign: "left",
      fontFamily: "Arial",
    },
    textBoldTitle: {
      color: "#000",
      fontSize: 10,
      lineHeight: 1.5,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Arial",
      marginBottom: 24,
    },
    imageTtd: {
      width: 50,
      height: 50,
    },
    TableHeader: {
      color: "#000",
      fontSize: 10,
      lineHeight: 1.5,
      textAlign: "center",
      fontFamily: "Arial",
    },
  });

  const Dokumen = () => (
    <Document title={`Dokumen BMN ${jsonData?.nomorSurat}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}></Text>
          <Text style={styles.reportTitle}>
            LAMPIRAN SURAT EDARAN NOMOR HK.02.02/A/1902/2024 TENTANG PEDOMAN
            PENGELOLAAN BARANG MILIK NEGARA YANG SEJAK AWAL DISERAHKAN KEPADA
            MASYARAKAT/PEMERINTAH DAERAH DI LINGKUNGAN KEMENTERIAN KESEHATAN
          </Text>
        </View>
        <View style={styles.docContainer}>
          <Text style={styles.text}>
            A. Format I Berita Acara dan Daftar BMN
          </Text>
        </View>
        <View style={styles.docContainerBorder}>
          <Text style={styles.textBoldTitle}>
            BERITA ACARA SERAH TERIMA OPERASIONAL {"\n"} BARANG MILIK NEGARA{" "}
            {"\n"} ANTARA {"\n"}
            KEMENTERIAN KESEHATAN {"\n"} DENGAN {"\n"} DINAS KESEHATAN
            PROVINSI/KOTA/KABUPATEN/RSUD/SWASTA/{jsonData?.kecamatan} {"\n"}{" "}
            NOMOR {jsonData?.nomorSurat} {"\n"}TENTANG {"\n"} HIBAH BARANG MILIK
            NEGARA YANG DARI SEJAK AWAL DISERAHKAN KEPADA {"\n"}
            MASYARAKAT/PEMERINTAH {"\n"} DAERAH DINAS KESEHATAN
            PROVINSI/KOTA/KABUPATEN/RSUD/SWASTA/{jsonData?.puskesmas}
          </Text>
          <Text style={styles.text}>
            Dalam rangka pengelolaan Barang Milik Negara (BMN) yang dari awal
            untuk diserahkan kepada Masyarakat/Pemerintah Daerah berupa BMN{" "}
            {jsonData?.namaBarang} (dengan rincian terlampir), maka PIHAK KESATU
            dalam hal ini {jsonData?.puskesmas} yang diwakili oleh{" "}
            {jsonData?.namaKapus} berdasarkan Kontrak Pengadaan{" "}
            {jsonData?.puskesmas} Nomor {jsonData?.nomorSurat} tanggal{" "}
            {jsonData?.tanggal} dan PIHAK KEDUA dalam hal ini
            Masyarakat/Pemerintah Daerah yang diwakili oleh Kepala Dinas
            Kesehatan Provinsi/Kota/Kabupaten/RSUD/Swasta/
            {jsonData?.kecamatan}
            Berita Acara Serah Terima Operasional (BASTO) dibuat dan
            ditandatangani oleh PIHAK KESATU dan PIHAK KEDUA pada hari tanggal
            {jsonData?.tanggal.substring(8)} bulan{" "}
            {jsonData?.tanggal.substring(6, 7)} tahun{" "}
            {jsonData?.tanggal.substring(6, 7)} {jsonData?.tanggal} sebagaimana
            tersebut di atas.
          </Text>
          <View style={styles.ttdContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>PIHAK KESATU</Text>
              <Text style={styles.text}>Kementerian Kesehatan... (4) </Text>
              <Image
                style={{ ...styles.imageTtd, marginVertical: 16 }}
                src={jsonData?.tteDaerah.image_url}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : Nama Pegawai Kemenkes {"\n"}
                Nip :
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>PIHAK KEDUA</Text>
              <Text style={styles.text}>
                Kepala Dinas Kesehatan Provinsi/ Kota/ Kabupaten/RSUD/Swasta/
                {jsonData?.puskesmas}
              </Text>
              <Image
                style={{ ...styles.imageTtd, marginVertical: 8 }}
                src={jsonData?.tteDaerah.image_url}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : {jsonData?.namaKapus} {"\n"}
                Nip : 1996202491
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.docContainerBorder}>
          <View style={{ ...styles.titleContainer, marginBottom: 16 }}>
            <Text
              style={{
                ...styles.reportTitle,
                letterSpacing: 1,
              }}
            ></Text>
            <Text
              style={{
                ...styles.reportTitle,
                letterSpacing: 1,
              }}
            >
              LAMPIRAN{"\n"}BERITA ACARA SERAH TERIMA OPERASIONAL{"\n"}NOMOR:{" "}
              {jsonData?.nomorSurat}
              {"\n"}TANGGAL: {jsonData?.tanggal}
            </Text>
          </View>

          <View
            style={{ ...styles.titleContainer, width: "100%", marginBottom: 8 }}
          >
            <Text
              style={{
                ...styles.reportTitle,
                width: "100%",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              DAFTAR BARANG MILIK NEGARA YANG DARI SEJAK AWAL DISERAHKAN KEPADA
              MASYARAKAT/PEMERINTAH DAERAH DINAS KESEHATAN
              PROVINSI/KOTA/KABUPATEN/RSUD/SWASTA/..….. (1)
            </Text>
          </View>

          <Table
            data={[
              {
                no: "1",
                namaBarang: "Urine Analyzer",
                merk: "A",
                nomorBukti: new Date(2000, 1, 1),
                satuan: "1",
                jumlah: "1",
                hargaSatuan: "1",
                jumlahNilai: "Rp. 100.000",
                keterangan: "Keterangan",
              },
              {
                no: "2",
                namaBarang: "Infusion Pump",
                merk: "B",
                nomorBukti: new Date(2000, 1, 1),
                satuan: "1",
                jumlah: "1",
                hargaSatuan: "1",
                jumlahNilai: "Rp. 100.000",
                keterangan: "Keterangan",
              },
            ]}
          >
            <TableHeader>
              <TableCell style={styles.TableHeader} weighting={0.3}>
                No
              </TableCell>
              <TableCell style={styles.TableHeader}>Nama Barang</TableCell>
              <TableCell style={styles.TableHeader}>Merk/Tipe</TableCell>
              <TableCell style={styles.TableHeader}>
                Nomor Bukti Kepemilikan
              </TableCell>
              <TableCell style={styles.TableHeader}>Satuan</TableCell>
              <TableCell style={styles.TableHeader}>Jumlah</TableCell>
              <TableCell style={styles.TableHeader}>Harga Satuan</TableCell>
              <TableCell style={styles.TableHeader}>
                Jumlah Total Nilai Perolehan (Rp)
              </TableCell>
              <TableCell style={styles.TableHeader}>Keterangan</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.no}
                weighting={0.3}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.namaBarang}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.merk}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.nomorBukti.toLocaleString()}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.satuan}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.jumlah}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.hargaSatuan}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.jumlahNilai}
              />
              <DataTableCell
                style={styles.TableHeader}
                getContent={(r) => r.keterangan}
              />
            </TableBody>
          </Table>
          <View style={{ ...styles.ttdContainer, marginTop: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>PIHAK KESATU</Text>
              <Text style={styles.text}>Kementerian Kesehatan... (4) </Text>
              <Image
                style={{ ...styles.imageTtd, marginVertical: 16 }}
                src={jsonData?.tteDaerah.image_url}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : Nama Pegawai Kemenkes {"\n"}
                Nip :
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>PIHAK KEDUA</Text>
              <Text style={styles.text}>
                Kepala Dinas Kesehatan Provinsi/ Kota/ Kabupaten/RSUD/Swasta/
                {jsonData?.puskesmas}
              </Text>
              <Image
                style={{ ...styles.imageTtd, marginVertical: 8 }}
                src={jsonData?.tteDaerah.image_url}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : {jsonData?.namaKapus} {"\n"}
                Nip : 1996202491
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <div>
      <Breadcrumb
        pageName={`Dokumen BMN ${jsonData?.nomorSurat}`}
        back={true}
        tte={true}
        linkBack="/dokumen"
        jsonData={jsonData}
      />
      {isIFrameLoaded === false ? (
        <div className="flex h-[81vh]">
          <div className="m-auto">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="sr-only text-bodydark1">
                Loading Generate Dokumen...
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {jsonData && (
        <div
          className={`flex [&>*]:w-full ${isIFrameLoaded ? "h-[81vh]" : "h-0"}`}
        >
          <PDFViewer
            height="100%"
            width="100%"
            showToolbar={true}
            className="rounded-md"
            innerRef={iframeRef}
          >
            <Dokumen />
          </PDFViewer>
        </div>
      )}
      {/* {jsonData ? (
        <PDFViewer style={styles.viewer} className="app">
          <Dokumen />
        </PDFViewer>
      ) : (
        
""

      )} */}
    </div>
  );
};

export default PreviewDokumen;
