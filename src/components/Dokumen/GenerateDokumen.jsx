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
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";
import moment from "moment";
import "moment/locale/id";
import Html from "react-pdf-html";
import { dataDistribusiBekasi } from "../../data/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "@david.kucsai/react-pdf-table";
import { TableRow } from "@david.kucsai/react-pdf-table/lib/TableRow";
import { useMediaQuery } from "react-responsive";
import ModalTTE from "../../components/Modal/ModalTTE";
import { decryptId } from "../../data/utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { CgSpinner } from "react-icons/cg";
import { FaDownload } from "react-icons/fa";
import { RenderHibahPages } from "../Table/TableHibah";
import { RenderBarangPages } from "../Table/TableLampiran";

const defaultImage =
  "https://media.istockphoto.com/id/1472819341/photo/background-white-light-grey-total-grunge-abstract-concrete-cement-wall-paper-texture-platinum.webp?b=1&s=170667a&w=0&k=20&c=yoY1jUAKlKVdakeUsRRsNEZdCx2RPIEgaIxSwQ0lS1k=";
var today = new Date();
const defaultDate = today.toISOString().substring(0, 10);
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

const BORDER_COLOR = "#000";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 5;
const COLN_WIDTH = (100 - COL1_WIDTH) / 8;

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
    fontFamily: "Arial",
    justifyContent: "space-between",
  },
  reportTitle: {
    fontFamily: "Arial",
    color: "#000",
    fontSize: 11,
    fontWeight: "normal",
    width: "50%",
    letterSpacing: 0.3,
    lineHeight: 1.7,
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
    borderWidth: 1.5,
    display: "flex",
    width: "100%",
    height: 800,
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
    marginLeft: 90,
  },
  TableHeader: {
    color: "#000",
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: "center",
    fontFamily: "Arial",
    verticalAlign: "middle",
    paddingVertical: 5,
  },
  TableRow: {
    color: "#000",
    fontSize: 10,
    lineHeight: 1,
    textAlign: "center",
    fontFamily: "Arial",
    verticalAlign: "middle",
    paddingVertical: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    textAlign: "center",
    verticalAlign: "middle",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    verticalAlign: "middle",
  },
  tableColHeader: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    verticalAlign: "middle",
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    verticalAlign: "middle",
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    verticalAlign: "middle",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    lineHeight: 1.2,
    fontWeight: 500,
    textAlign: "center",
    verticalAlign: "middle",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    lineHeight: 1,
    textAlign: "center",
    verticalAlign: "middle",
  },
});

const GenerateDokumen = async (jsonData) => {
  const MyDocument = () => (
    <Document title={`Dokumen ${jsonData?.nomorSurat}`}>
      <Page size="FOLIO" style={styles.page}>
        {/* <View style={styles.titleContainer}>
          <Text style={{ ...styles.reportTitle, width: "40%" }}></Text>
          <Text style={{ ...styles.reportTitle, width: "50%" }}>
            LAMPIRAN{"\n"}SURAT EDARAN{"\n"}NOMOR HK.02.02/A/1902/2024{"\n"}
            TENTANG PEDOMAN PENGELOLAAN{"\n"}BARANG MILIK NEGARA YANG SEJAK
            {"\n"}AWAL DISERAHKAN KEPADA{"\n"}MASYARAKAT/PEMERINTAH DAERAH{"\n"}
            DI LINGKUNGAN KEMENTERIAN{"\n"}KESEHATAN
          </Text>
        </View>
        <View style={styles.docContainer}>
          <Text style={styles.text}>
            A. Format I Berita Acara dan Daftar BMN
          </Text>
        </View> */}
        <View
          style={{
            ...styles.docContainerBorder,
            paddingHorizontal: 24,
            paddingVertical: 16,
          }}
        >
          {/* <Text
            style={{ ...styles.text, textAlign: "center", marginBottom: 24 }}
          >
            --------------------------------------------Kop----------------------------------------
          </Text> */}
          <View
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Image
              style={{
                width: "490px",
                height: "120px",
                // marginVertical: 16,
              }}
              src="/kop_surat.png"
            />
          </View>
          <Text
            style={{
              ...styles.textBoldTitle,
              marginBottom: 32,
              lineHeight: 1.8,
            }}
          >
            BERITA ACARA SERAH TERIMA OPERASIONAL {"\n"} BARANG MILIK NEGARA{" "}
            {"\n"} ANTARA {"\n"}
            KEMENTERIAN KESEHATAN {"\n"} DENGAN {"\n"} DINAS KESEHATAN
            {jsonData?.kabupaten} {"\n"} NOMOR {jsonData?.nomorSurat} {"\n"}
            TENTANG {"\n"} HIBAH BARANG MILIK NEGARA YANG DARI SEJAK AWAL
            DISERAHKAN KEPADA {"\n"}
            MASYARAKAT/PEMERINTAH {"\n"} DAERAH DINAS KESEHATAN{" "}
            {jsonData?.kabupaten}
          </Text>
          <Text style={styles.text}>
            Dalam rangka pengelolaan Barang Milik Negara (BMN) yang dari awal
            untuk diserahkan kepada Masyarakat/Pemerintah Daerah berupa BMN{" "}
            {jsonData?.namaBarang} (dengan rincian terlampir), maka PIHAK KESATU
            dalam hal ini {jsonData?.kepala_unit_pemberi} yang diwakili oleh{" "}
            {jsonData?.nama_ppk} berdasarkan Kontrak Pengadaan Nomor{" "}
            {jsonData?.nomorSurat} tanggal {jsonData?.tanggal} dan PIHAK KEDUA
            dalam hal ini Masyarakat/Pemerintah Daerah yang diwakili oleh Kepala
            Dinas Kesehatan {jsonData?.kabupaten}
            {"\n"}
            Berita Acara Serah Terima Operasional (BASTO) dibuat dan
            ditandatangani oleh PIHAK KESATU dan PIHAK KEDUA pada hari tanggal{" "}
            {moment(jsonData?.tanggal_tte_ppk || defaultDate).format(
              "d",
              "id"
            )}{" "}
            bulan{" "}
            {moment(jsonData?.tanggal_tte_ppk || defaultDate).format(
              "MM",
              "id"
            )}{" "}
            tahun{" "}
            {moment(jsonData?.tanggal_tte_ppk || defaultDate).format(
              "yyyy",
              "id"
            )}
            {" ("}
            {moment(jsonData?.tanggal_tte_ppk || defaultDate).format(
              "D-MM-YYYY",
              "id"
            )}
            {") "}
            sebagaimana tersebut di atas.
          </Text>
          <Text style={{ ...styles.text, marginTop: 8 }}>Berdasarkan :</Text>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              width: "100%",
            }}
          >
            <Text style={{ marginRight: 32 }}>1.</Text>
            <Text style={{ marginRight: 32 }}>
              Undang-Undang Nomor 1 Tahun 2004 tentang Perbendaharaan Negara
              (Lembaran Negara Republik Indonesia Tahun 2004 Nomor 5, Tambahan
              Lembaran NegaraRepublik Indonesia Nomor 4355);
            </Text>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              width: "100%",
            }}
          >
            <Text style={{ marginRight: 32 }}>2.</Text>
            <Text style={{ marginRight: 32 }}>
              Peraturan Pemerintah Nomor 27 Tahun 2014 tentang Pengelolaan
              Barang Milik Negara/Daerah (Lembaran Negara Republik Indonesia
              Tahun 2014 Nomor 92, Tambahan Lembaran Negara Republik Indonesia
              Nomor 5533) sebagaimana telah diubah dengan Peraturan Pemerintah
              Nomor 28 Tahun 2020 tentang Perubahan atas Peraturan Pemerintah
              Nomor 27 Tahun 2014 tentang Pengelolaan Barang Milik Negara/Daerah
              (Lembaran Negara Republik Indonesia Tahun 2020 Nomor 142, Tambahan
              Lembaran Negara Republik Indonesia Nomor 6523);
            </Text>
          </View>

          {/* <View style={styles.ttdContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>PIHAK KESATU</Text>
              <Text style={styles.text}>Kementerian Kesehatan {jsonData?.kepala_unit_pemberi || ""}</Text>
              <Image
                style={{ ...styles.imageTtd, marginVertical: 16 }}
                src={jsonData?.tte_ppk}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : {jsonData?.nama_ppk || ""} {"\n"}
                NIP : {jsonData?.nip_ppk || ""}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>PIHAK KEDUA</Text>
              <Text style={styles.text}>
                Kepala Dinas Kesehatan {jsonData?.kabupaten || ""}
                {jsonData?.puskesmas}
              </Text>
              <Image
                style={{ ...styles.imageTtd, marginVertical: 8 }}
                src={jsonData?.tte_daerah}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : {jsonData?.penerima_hibah || ""} {"\n"}
                NIP : {jsonData?.nip_daerah || ""}
              </Text>
            </View>
          </View> */}
        </View>
      </Page>

      <Page size="FOLIO" style={styles.page}>
        <View
          style={{
            ...styles.docContainerBorder,
            paddingHorizontal: 24,
            paddingVertical: 16,
            height: 800,
          }}
        >
          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              width: "100%",
            }}
          >
            <Text style={{ marginRight: 32 }}>3.</Text>
            <Text style={{ marginRight: 32 }}>
              Peraturan Menteri Keuangan Nomor 111/PMK.06/2016 tentang Tata Cara
              Pelaksanaan Pemindahtanganan Barang Milik Negara (Berita Negara
              Republik Indonesia Tahun 2016 Nomor 1018) sebagaimana telah diubah
              dengan Peraturan Menteri Keuangan Nomor 165/PMK.06/2021 tentang
              Perubahan atas Peraturan Menteri Keuangan Nomor 111/PMK.06/2016
              tentang Tata Cara Pelaksanaan Pemindahtanganan Barang Milik Negara
              (Berita Negara Republik Indonesia Tahun 2021 Nomor 1292);
            </Text>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              width: "100%",
            }}
          >
            <Text style={{ marginRight: 32 }}>4.</Text>
            <Text style={{ marginRight: 32 }}>
              Peraturan Menteri Keuangan Nomor 181/PMK.06/2016 tentang
              Penatausahaan Barang Milik Negara (Berita Negara Republik
              Indonesia Tahun 2016 Nomor 1817); dan
            </Text>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "row",
              marginTop: 8,
              width: "100%",
            }}
          >
            <Text style={{ marginRight: 32 }}>5.</Text>
            <Text style={{ marginRight: 32 }}>
              Keputusan Menteri Kesehatan Nomor HK.01.07/MENKES/155/2023 tentang
              Pendelegasian Sebagian Wewenang Menteri Kesehatan selaku Pengguna
              Barang kepada Pimpinan Tinggi Madya dan Kuasa Pengguna Barang
              dalam Pengelolaan Barang Milik Negara di Lingkungan Kementerian
              Kesehatan.
            </Text>
          </View>

          <Text
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              marginTop: 16,
              width: "100%",
            }}
          >
            Pada hari tanggal {jsonData?.tanggal.substring(8)} bulan{" "}
            {jsonData?.tanggal.substring(6, 7)} tahun{" "}
            {jsonData?.tanggal.substring(6, 7)} {jsonData?.tanggal}, telah
            dilakukan serah terima operasional hibah BMN dari PIHAK KESATU
            kepada PIHAK KEDUA dan PIHAK KEDUA menyatakan menerima hibah BMN
            tersebut yang selanjutnya disebut sebagai OBJEK HIBAH, dengan
            ketentuan sebagai berikut:{" "}
          </Text>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 1
            </Text>
            <Text
              style={{
                ...styles.text,
                textAlign: "left",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              Hibah BMN ini bertujuan untuk mendukung dan menunjang
              penyelenggaraan Tugas Pokok dan Fungsi Dinas Kesehatan
              {jsonData?.kabupaten || ""} dalam rangka meningkatkan pelayanan
              kesehatan kepada masyarakat.
            </Text>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 2
            </Text>
            <Text
              style={{
                ...styles.text,
                textAlign: "left",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              Jumlah barang yang dihibahkan adalah{" "}
              {jsonData?.total_barang_dikirim || ""} unit dan jumlah nilai
              perolehan sebesar Rp {jsonData?.dtotal_harga || ""} dengan rincian
              sebagaimana tercantum dalam lampiran, yang merupakan bagian tidak
              terpisahkan dari Berita Acara Serah Terima Operasional (BASTO)
              ini.
            </Text>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 3
            </Text>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                width: "100%",
              }}
            >
              <Text
                style={{
                  ...styles.text,
                  textAlign: "left",
                  lineHeight: 1.7,
                  letterSpacing: 0.1,
                }}
              >
                Dinas Kesehatan {jsonData?.kabupaten || ""} adalah sebagai
                penerima hibah atas
              </Text>
              <Text
                style={{
                  ...styles.textBold,
                  textAlign: "left",
                  lineHeight: 1.7,
                  letterSpacing: 0.1,
                }}
              >
                OBJEK HIBAH
              </Text>
            </View>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 4
            </Text>
            <Text
              style={{
                ...styles.text,
                textAlign: "left",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PIHAK KESATU dan PIHAK KEDUA menerangkan bahwa hibah ini dilakukan
              dengan syarat-syarat sebagai berikut:
            </Text>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(1)</Text>
              <Text style={{ marginRight: 16 }}>
                status kepemilikan OBJEK HIBAH berpindah dari semula BMN pada
                Pemerintah Pusat menjadi Barang Milik Daerah (BMD) pada Dinas
                Kesehatan {jsonData?.kabupaten || ""}{" "}
              </Text>
            </View>

            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(2)</Text>
              <Text style={{ marginRight: 16 }}>
                PIHAK KEDUA mempergunakan OBJEK HIBAH sesuai dengan peruntukan
                sebagaimana dimaksud dalam Pasal 1.
              </Text>
            </View>

            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(3)</Text>
              <Text style={{ marginRight: 16 }}>
                {" "}
                PIHAK KESATU dan PIHAK KEDUA sepakat untuk melaksanakan hibah
                atas BMN tersebut sesuai peraturan perundang-undangan.
              </Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="FOLIO" style={styles.page}>
        <View
          style={{
            ...styles.docContainerBorder,
            paddingHorizontal: 24,
            paddingVertical: 16,
            height: 800,
          }}
        >
          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 5
            </Text>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(1)</Text>
              <Text style={{ marginRight: 16 }}>
                PIHAK KESATU berkewajiban untuk:
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>a.</Text>
              <Text style={{ marginRight: 16 }}>
                menyerahkan OBJEK HIBAH kepada PIHAK KEDUA; dan
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>b.</Text>
              <Text style={{ marginRight: 16 }}>
                melakukan koordinasi dengan PIHAK KEDUA dalam pelaksanaan Berita
                Acara Serah Terima Operasional (BASTO) ini.
              </Text>
            </View>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 6
            </Text>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(1)</Text>
              <Text style={{ marginRight: 16 }}>
                PIHAK KEDUA berhak untuk menggunakan OBJEK HIBAH sesuai dengan
                ketentuan dan persyaratan dalam Berita Acara Serah Terima
                Operasional (BASTO) ini.
              </Text>
            </View>

            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(2)</Text>
              <Text style={{ marginRight: 16 }}>
                PIHAK KEDUA berkewajiban untuk:
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>a.</Text>
              <Text style={{ marginRight: 16 }}>
                menerima penyerahan OBJEK HIBAH dari PIHAK KESATU;
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>b.</Text>
              <Text style={{ marginRight: 16 }}>mencatat OBJEK HIBAH;</Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>c.</Text>
              <Text style={{ marginRight: 16 }}>
                mempergunakan dan memelihara OBJEK HIBAH sesuai ketentuan yang
                berlaku;
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>d.</Text>
              <Text style={{ marginRight: 16 }}>
                melakukan pengamanan OBJEK HIBAH yang meliputi pengamanan
                administrasi, pengamanan fisik, pengamanan hukum;
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>e.</Text>
              <Text style={{ marginRight: 16 }}>
                bertanggung jawab atas segala biaya yang dikeluarkan dalam
                kaitan dengan penggunaan, pemeliharaan, dan pengamanan OBJEK
                HIBAH berikut bagian-bagiannya;
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>f.</Text>
              <Text style={{ marginRight: 16 }}>
                bertanggung jawab sepenuhnya atas segala risiko yang berkaitan
                dengan OBJEK HIBAH; dan
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>g.</Text>
              <Text style={{ marginRight: 16 }}>
                mengelola dan melaksanakan penerimaan hibah secara transparan
                dan akuntabel sesuai dengan peraturan perundang-undangan.
              </Text>
            </View>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 7
            </Text>
            <Text
              style={{
                ...styles.text,
                textAlign: "left",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PIHAK KESATU menyatakan dan menjamin kepada PIHAK KEDUA dan PIHAK
              KEDUA menyatakan dan menjamin PIHAK KESATU, sebagai berikut:
            </Text>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>a.</Text>
              <Text style={{ marginRight: 16 }}>
                PIHAK KESATU dan PIHAK KEDUA mempunyai wewenang penuh untuk
                menandatangani dan melaksanakan Berita Acara Serah Terima
                Operasional (BASTO) ini;
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>b.</Text>
              <Text style={{ marginRight: 16 }}>
                PIHAK KESATU dan PIHAK KEDUA telah melakukan seluruh tindakan
                yang dibutuhkan dalam pengikatan Berita Acara Serah Terima
                Operasional (BASTO); dan
              </Text>
            </View>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                paddingHorizontal: 24,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>c.</Text>
              <Text style={{ marginRight: 16 }}>
                Berita Acara Serah Terima Operasional (BASTO) ini setelah
                ditandatangani menjadi sah dan mengikat PIHAK KESATU dan PIHAK
                KEDUA untuk melaksanakan Berita Acara Serah Terima Operasional
                (BASTO) ini.
              </Text>
            </View>
          </View>

          <View
            style={{
              ...styles.text,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              display: "flex",
              flexDirection: "column",
              marginTop: 16,
              width: "100%",
            }}
          >
            <Text
              style={{
                ...styles.textBold,
                textAlign: "center",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PASAL 8
            </Text>
            <Text
              style={{
                ...styles.text,
                textAlign: "left",
                lineHeight: 1.7,
                letterSpacing: 0.1,
                width: "100%",
              }}
            >
              PIHAK KESATU dan PIHAK KEDUA menerangkan bahwa hibah ini dilakukan
              dengan syarat-syarat sebagai berikut:
            </Text>
            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(1)</Text>
              <Text style={{ marginRight: 16 }}>
                Segala ketentuan dan persyaratan dalam Berita Acara Serah Terima
                Operasional (BASTO) ini berlaku serta mengikat bagi PIHAK KESATU
                dan PIHAK KEDUA yang menandatangani.
              </Text>
            </View>

            <View
              style={{
                ...styles.text,
                lineHeight: 1.7,
                letterSpacing: 0.1,
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text style={{ marginRight: 16 }}>(2)</Text>
              <Text style={{ marginRight: 16 }}>
                Berita Acara Serah Terima Operasional (BASTO) ini dibuat
                sebanyak 3 (tiga) rangkap asli dan mempunyai kekuatan hukum yang
                sama, rangkap pertama dan rangkap kedua masingmasing bermeterai
                cukup, rangkap kesatu dan rangkap ketiga dipegang oleh PIHAK
                KESATU sedangkan rangkap kedua dipegang oleh PIHAK KEDUA.
              </Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="FOLIO" style={styles.page}>
        <View style={styles.docContainer}>
          <View style={{ ...styles.docContainerBorder, height: 800 }}>
            <View style={styles.ttdContainer}>
              <View style={{ flex: 1 }}>
                <Text style={{ ...styles.textBold, textAlign: "center" }}>
                  PIHAK KESATU
                </Text>
                <Text style={{ ...styles.text, textAlign: "center" }}>
                  Kementerian Kesehatan {"\n"}
                  {jsonData?.kepala_unit_pemberi || ""}
                </Text>
                <Image
                  style={{ ...styles.imageTtd, marginVertical: 8 }}
                  src={`${jsonData?.tte_ppk}?not-from-cache-please`}
                  onError={(error) => {
                    error.target.src = defaultImage;
                  }}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontFamily: "Arial",
                    marginTop: 8,
                    fontSize: 10,
                    lineHeight: 1.2,
                    textAlign: "center",
                    letterSpacing: 0.2,
                  }}
                >
                  Nama : {jsonData?.nama_ppk || ""} {"\n"}
                  NIP : {jsonData?.nip_ppk || ""}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ ...styles.textBold, textAlign: "center" }}>
                  PIHAK KEDUA
                </Text>
                <Text style={{ ...styles.text, textAlign: "center" }}>
                  Kepala Dinas Kesehatan {"\n"} {jsonData?.kabupaten || ""}
                </Text>
                <Image
                  style={{ ...styles.imageTtd, marginVertical: 8 }}
                  src={`${jsonData?.tte_daerah}?not-from-cache-please`}
                  onError={(error) => {
                    error.target.src = defaultImage;
                  }}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontFamily: "Arial",
                    marginTop: 8,
                    fontSize: 10,
                    lineHeight: 1.2,
                    textAlign: "center",
                    letterSpacing: 0.2,
                  }}
                >
                  Nama : {jsonData?.nama_daerah || ""} {"\n"}
                  NIP : {jsonData?.nip_daerah || ""}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      {RenderBarangPages(jsonData)}

      <Page size="FOLIO" style={styles.page}>
        {/* <View style={styles.docContainer}>
              <Text style={styles.text}>
                B. Format II, Naskah Hibah dan Berita Acara Serah Terima BMN
              </Text>
            </View> */}
        <View
          style={{
            ...styles.docContainerBorder,
            paddingHorizontal: 24,
            paddingVertical: 16,
            height: 800,
          }}
        >
          {/* <Text
                style={{
                  ...styles.text,
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                --------------------------------------------Kop----------------------------------------
              </Text> */}
          <View
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Image
              style={{
                width: "490px",
                height: "120px",
                // marginVertical: 16,
              }}
              src="/kop_surat.png"
            />
          </View>
          <Text
            style={{
              ...styles.textBoldTitle,
              marginBottom: 32,
              lineHeight: 1.8,
            }}
          >
            NASKAH HIBAH {"\n"} DAN {"\n"} BERITA ACARA SERAH TERIMA {"\n"}{" "}
            BARANG MILIK NEGARA {"\n"} ANTARA {"\n"}
            KEMENTERIAN KESEHATAN {"\n"} DENGAN {"\n"} DINAS KESEHATAN{" "}
            {jsonData?.kabupaten} {"\n"} NOMOR {jsonData?.nomorSurat} {"\n"}
            TENTANG {"\n"} HIBAH BARANG MILIK NEGARA YANG DARI SEJAK AWAL
            DISERAHKAN KEPADA {"\n"}
            MASYARAKAT/PEMERINTAH {"\n"} DAERAH DINAS KESEHATAN{" "}
            {jsonData?.kabupaten}{" "}
          </Text>
          <Text style={styles.text}>
            Berdasarkan Peraturan Menteri Keuangan Nomor 111/PMK.06/2016 tentang
            Tata Cara Pelaksanaan Pemindahtanganan Barang Milik Negara (Berita
            Negara Republik Indonesia Tahun 2016 Nomor 1018) sebagaimana telah
            diubah dengan Peraturan Menteri Keuangan Nomor 165/PMK.06/2021
            tentang Perubahan atas Peraturan Menteri Keuangan Nomor
            111/PMK.06/2016 tentang Tata Cara Pelaksanaan Pemindahtanganan
            Barang Milik Negara (Berita Negara Republik Indonesia Tahun 2021
            Nomor 1292), dengan ini kami sampaikan bahwa telah dilaksanakan
            pemindahtanganan BMN berupa Hibah antara PIHAK KESATU dalam hal ini
            {jsonData?.kepala_unit_pemberi} yang diwakili {jsonData?.nama_ppk}{" "}
            oleh dan PIHAK KEDUA dalam hal ini Masyarakat/Pemerintah Daerah yang
            diwakili oleh Kepala Dinas Kesehatan {jsonData?.kabupaten} berupa
            BMN dengan rincian terlampir , sejumlah{" "}
            {jsonData?.total_barang_dikirim} dengan total nilai perolehan
            sebesar Rp{jsonData?.total_harga}, sesuai dengan Berita Acara Serah
            Terima Operasional (BASTO) nomor {jsonData?.nomorSurat} tanggal{" "}
            {jsonData?.tanggal} (terlampir). Demikian Naskah Hibah dan BAST ini
            kami buat, selanjutnya agar digunakan sebagaimana mestinya.
          </Text>

          <View style={styles.ttdContainer}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>
                JAKARTA,{" "}
                {moment(jsonData?.tanggal_tte_ppk).format("D-MM-YYYY", "id")}{" "}
              </Text>
              <Text style={styles.text}>{jsonData?.kepala_unit_pemberi}</Text>
              <Image
                style={{
                  ...styles.imageTtd,
                  marginVertical: 8,
                  marginLeft: 16,
                }}
                src={`${jsonData?.tte_ppk}?not-from-cache-please`}
              />
              <Text style={{ marginTop: 8 }}>
                Nama : {jsonData?.nama_ppk || ""} {"\n"}
                NIP : {jsonData?.nip_ppk || ""}
              </Text>
            </View>
          </View>
        </View>
      </Page>
      {RenderHibahPages(jsonData)}
    </Document>
  );
  const blob = await pdf(<MyDocument />).toBlob();
  return blob;
};

export default GenerateDokumen;
