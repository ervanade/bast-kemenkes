import React, { useEffect, useState } from "react";
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

const PreviewDokumen = () => {
  const { id } = useParams();
  const [jsonData, setJsonData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = dataDistribusiBekasi.find((a) => a.id === parseInt(id));
    if (!data) {
      navigate("/not-found");
    }
    setJsonData({
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
    </Document>
  );
  return (
    <div>
      <Breadcrumb
        pageName={`Dokumen BMN ${jsonData?.nomorSurat}`}
        back={true}
        tte={true}
        jsonData={jsonData}
      />
      {jsonData ? (
        <PDFViewer style={styles.viewer} className="app">
          <Dokumen />
        </PDFViewer>
      ) : (
        ""
      )}
    </div>
  );
};

export default PreviewDokumen;
