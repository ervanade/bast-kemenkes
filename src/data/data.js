export const dataUser = [
    {
        id: 1,
        email: 'user@example.com',
        username: "Admin Dinas Kesehatan Kota Bekasi",
        password: '123'
    }
]
export const dataProvinsi = [
    {
        label: "Jawa Barat",
        value: "jawa_barat"
    }
]
export const dataKota = [
    {
        label: "Bekasi",
        value: "bekasi"
    }
]
export const dataKecamatan = [
    // {
    //     "label": "Semua Kecamatan",
    //     "value": "all"
    // },
    {
        "label": "Bintara",
        "value": "bintara"
    },
    {
        "label": "Bintara Jaya",
        "value": "bintara_jaya"
    },
    {
        "label": "Jakarta Sampurna",
        "value": "jakarta_sampurna"
    },
    {
        "label": "Kota Baru",
        "value": "kota_baru"
    },
    {
        "label": "Kranji",
        "value": "kranji"
    },
    {
        "label": "Harapan Mulya",
        "value": "harapan_mulya"
    },
    {
        "label": "Kotabaru",
        "value": "kotabaru"
    },
    {
        "label": "Marga Mulya",
        "value": "marga_mulya"
    },
    {
        "label": "Pekayon Jaya",
        "value": "pekayon_jaya"
    },
    {
        "label": "Jatirasa",
        "value": "jatirasa"
    }
]

export const dataBarang = [
    {
        "label": "Alat Rapid Test",
        "value": "alat_rapid_test"
    },
    {
        "label": "Masker",
        "value": "masker"
    },
    {
        "label": "Thermometer",
        "value": "thermometer"
    },
]
export const dataPuskesmas = [
    {
        "label": "Puskesmas Bintara Jaya",
        "value": "puskesmas_bintara_jaya"
    },
    {
        "label": "Puskesmas Kota Baru",
        "value": "puskesmas_kota_baru"
    },
    {
        "label": "Puskesmas Kali Baru",
        "value": "puskesmas_kali_baru"
    },
]

export const dataDistribusiBekasi =
    [
        {
            "id": 1,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Bintara",
            "Puskesmas": "Puskesmas Bintara",
            "nama_kapus": "Dr. Adi Wijaya",
            "nama_barang": "Alat Rapid Test",
            "jumlah_barang_dikirim": 100,
            "jumlah_barang_diterima": 100,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 2,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Bintara Jaya",
            "Puskesmas": "Puskesmas Bintara Jaya",
            "nama_kapus": "Dr. Budi Setiawan",
            "nama_barang": "APD",
            "jumlah_barang_dikirim": 50,
            "jumlah_barang_diterima": 50,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 3,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakasampurna",
            "Puskesmas": "Puskesmas Jakasampurna",
            "nama_kapus": "Dr. Chandra Purnama",
            "nama_barang": "Vaksin",
            "jumlah_barang_dikirim": 200,
            "jumlah_barang_diterima": 190,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kerusakan kemasan"
        },
        {
            "id": 4,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Kota Baru",
            "Puskesmas": "Puskesmas Kota Baru",
            "nama_kapus": "Dr. Dian Pratama",
            "nama_barang": "Masker",
            "jumlah_barang_dikirim": 300,
            "jumlah_barang_diterima": 300,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 5,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Kalibaru",
            "Puskesmas": "Puskesmas Kalibaru",
            "nama_kapus": "Dr. Edi Kusuma",
            "nama_barang": "Hand Sanitizer",
            "jumlah_barang_dikirim": 150,
            "jumlah_barang_diterima": 150,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 6,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Harapan Mulya",
            "Puskesmas": "Puskesmas Harapan Mulya",
            "nama_kapus": "Dr. Fadli Rahman",
            "nama_barang": "Vitamin C",
            "jumlah_barang_dikirim": 500,
            "jumlah_barang_diterima": 480,
            "status_tte": "Belum",
            "keterangan_ppk": "Sebagian rusak"
        },
        {
            "id": 7,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Medan Satria",
            "Puskesmas": "Puskesmas Medan Satria",
            "nama_kapus": "Dr. Galih Ananta",
            "nama_barang": "Thermometer",
            "jumlah_barang_dikirim": 120,
            "jumlah_barang_diterima": 120,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 8,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Kranji",
            "Puskesmas": "Puskesmas Kranji",
            "nama_kapus": "Dr. Hana Putri",
            "nama_barang": "Alat Swab Test",
            "jumlah_barang_dikirim": 250,
            "jumlah_barang_diterima": 250,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 9,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jaka Setia",
            "Puskesmas": "Puskesmas Jaka Setia",
            "nama_kapus": "Dr. Ika Sari",
            "nama_barang": "Oximeter",
            "jumlah_barang_dikirim": 80,
            "jumlah_barang_diterima": 80,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 10,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jaka Mulya",
            "Puskesmas": "Puskesmas Jaka Mulya",
            "nama_kapus": "Dr. Joko Susilo",
            "nama_barang": "APD",
            "jumlah_barang_dikirim": 60,
            "jumlah_barang_diterima": 60,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 11,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakamulya",
            "Puskesmas": "Puskesmas Jakamulya",
            "nama_kapus": "Dr. Kiki Andika",
            "nama_barang": "Masker",
            "jumlah_barang_dikirim": 300,
            "jumlah_barang_diterima": 290,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kekurangan"
        },
        {
            "id": 12,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakabali",
            "Puskesmas": "Puskesmas Jakabali",
            "nama_kapus": "Dr. Liana Pratiwi",
            "nama_barang": "Face Shield",
            "jumlah_barang_dikirim": 100,
            "jumlah_barang_diterima": 100,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 13,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakapurnama",
            "Puskesmas": "Puskesmas Jakapurnama",
            "nama_kapus": "Dr. Mahendra",
            "nama_barang": "Sarung Tangan",
            "jumlah_barang_dikirim": 150,
            "jumlah_barang_diterima": 150,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 14,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakapura",
            "Puskesmas": "Puskesmas Jakapura",
            "nama_kapus": "Dr. Nia Dewi",
            "nama_barang": "Alat Tes Antigen",
            "jumlah_barang_dikirim": 200,
            "jumlah_barang_diterima": 195,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kekurangan"
        },
        {
            "id": 15,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakaraya",
            "Puskesmas": "Puskesmas Jakaraya",
            "nama_kapus": "Dr. Oki Wibowo",
            "nama_barang": "Thermometer",
            "jumlah_barang_dikirim": 120,
            "jumlah_barang_diterima": 120,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 16,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakatama",
            "Puskesmas": "Puskesmas Jakatama",
            "nama_kapus": "Dr. Putri Anggraini",
            "nama_barang": "Hand Sanitizer",
            "jumlah_barang_dikirim": 150,
            "jumlah_barang_diterima": 150,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 17,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakapasar",
            "Puskesmas": "Puskesmas Jakapasar",
            "nama_kapus": "Dr. Ratna Sari",
            "nama_barang": "Alat Swab Test",
            "jumlah_barang_dikirim": 250,
            "jumlah_barang_diterima": 240,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kekurangan"
        },
        {
            "id": 18,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakasejahtera",
            "Puskesmas": "Puskesmas Jakasejahtera",
            "nama_kapus": "Dr. Sari Dewi",
            "nama_barang": "Oximeter",
            "jumlah_barang_dikirim": 80,
            "jumlah_barang_diterima": 80,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 19,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakaputri",
            "Puskesmas": "Puskesmas Jakaputri",
            "nama_kapus": "Dr. Tina Kartika",
            "nama_barang": "Alat Rapid Test",
            "jumlah_barang_dikirim": 100,
            "jumlah_barang_diterima": 100,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 20,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakasari",
            "Puskesmas": "Puskesmas Jakasari",
            "nama_kapus": "Dr. Wahyu Setiawan",
            "nama_barang": "APD",
            "jumlah_barang_dikirim": 50,
            "jumlah_barang_diterima": 50,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 21,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakasari Jaya",
            "Puskesmas": "Puskesmas Jakasari Jaya",
            "nama_kapus": "Dr. Yoga Pratama",
            "nama_barang": "Vaksin",
            "jumlah_barang_dikirim": 200,
            "jumlah_barang_diterima": 190,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kerusakan kemasan"
        },
        {
            "id": 22,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakautama",
            "Puskesmas": "Puskesmas Jakautama",
            "nama_kapus": "Dr. Yuni Setyowati",
            "nama_barang": "Masker",
            "jumlah_barang_dikirim": 300,
            "jumlah_barang_diterima": 300,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 23,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakamulya Utara",
            "Puskesmas": "Puskesmas Jakamulya Utara",
            "nama_kapus": "Dr. Zaenal Abidin",
            "nama_barang": "Hand Sanitizer",
            "jumlah_barang_dikirim": 150,
            "jumlah_barang_diterima": 150,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 24,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakamulya Barat",
            "Puskesmas": "Puskesmas Jakamulya Barat",
            "nama_kapus": "Dr. Zainal Arifin",
            "nama_barang": "Vitamin C",
            "jumlah_barang_dikirim": 500,
            "jumlah_barang_diterima": 480,
            "status_tte": "Belum",
            "keterangan_ppk": "Sebagian rusak"
        },
        {
            "id": 25,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jaka Tengah",
            "Puskesmas": "Puskesmas Jaka Tengah",
            "nama_kapus": "Dr. Zubaidah",
            "nama_barang": "Thermometer",
            "jumlah_barang_dikirim": 120,
            "jumlah_barang_diterima": 120,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 26,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jaka Timur",
            "Puskesmas": "Puskesmas Jaka Timur",
            "nama_kapus": "Dr. Ahmad Yani",
            "nama_barang": "Alat Swab Test",
            "jumlah_barang_dikirim": 250,
            "jumlah_barang_diterima": 240,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kekurangan"
        },
        {
            "id": 27,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jaka Barat",
            "Puskesmas": "Puskesmas Jaka Barat",
            "nama_kapus": "Dr. Beni Mulyana",
            "nama_barang": "Oximeter",
            "jumlah_barang_dikirim": 80,
            "jumlah_barang_diterima": 80,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 28,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jaka Utama",
            "Puskesmas": "Puskesmas Jaka Utama",
            "nama_kapus": "Dr. Cinta Kasih",
            "nama_barang": "Alat Rapid Test",
            "jumlah_barang_dikirim": 100,
            "jumlah_barang_diterima": 100,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 29,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakasetia Jaya",
            "Puskesmas": "Puskesmas Jakasetia Jaya",
            "nama_kapus": "Dr. Dian Putri",
            "nama_barang": "APD",
            "jumlah_barang_dikirim": 50,
            "jumlah_barang_diterima": 50,
            "status_tte": "Sudah",
            "keterangan_ppk": "Barang dalam kondisi baik"
        },
        {
            "id": 30,
            "provinsi": "Jawa Barat",
            "kab_kota": "Bekasi",
            "kecamatan": "Jakasetia Barat",
            "Puskesmas": "Puskesmas Jakasetia Barat",
            "nama_kapus": "Dr. Eka Sari",
            "nama_barang": "Vaksin",
            "jumlah_barang_dikirim": 200,
            "jumlah_barang_diterima": 190,
            "status_tte": "Belum",
            "keterangan_ppk": "Ada kerusakan kemasan"
        },
    ]