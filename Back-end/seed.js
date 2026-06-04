const mongoose = require("mongoose");
require("dotenv").config();

const Material = require("./models/Material");

const materialsData = [
  {
    title: "Integral Tak Tentu dan Tertentu",
    subject: "Matematika",
    category: "Kalkulus",
    description:
      "Pelajari konsep dasar integral, teknik substitusi, integral parsial, dan penerapannya dalam soal ujian.",
    difficulty: "Sulit",
    duration: 45,
    topics: [
      "Integral Tak Tentu",
      "Integral Tertentu",
      "Teknik Substitusi",
      "Integral Parsial",
    ],
    content: `# Integral Tak Tentu dan Tertentu

Integral adalah operasi invers dari turunan. Materi ini penting untuk memahami luas daerah, akumulasi perubahan, dan banyak soal kalkulus dasar.

## Integral Tak Tentu
Bentuk umum integral tak tentu adalah ∫ f(x) dx = F(x) + C, dengan F'(x) = f(x).

## Integral Tertentu
Integral tertentu digunakan untuk menghitung akumulasi atau luas area pada interval tertentu.

## Tips Belajar
1. Kuasai aturan dasar pangkat.
2. Latih substitusi sederhana.
3. Pahami kapan memakai integral parsial.`,
  },
  {
    title: "Hukum Newton dan Dinamika Gerak",
    subject: "Fisika",
    category: "Mekanika",
    description:
      "Memahami hukum Newton tentang gaya, massa, percepatan, dan aplikasinya dalam kehidupan sehari-hari.",
    difficulty: "Menengah",
    duration: 40,
    topics: [
      "Hukum Newton I",
      "Hukum Newton II",
      "Hukum Newton III",
      "Gerak Melingkar",
    ],
    content: `# Hukum Newton dan Dinamika Gerak

## Hukum Newton I
Benda akan mempertahankan keadaan diam atau bergerak lurus beraturan jika resultan gaya sama dengan nol.

## Hukum Newton II
Percepatan benda berbanding lurus dengan resultan gaya dan berbanding terbalik dengan massa benda. Rumus umum: F = m × a.

## Hukum Newton III
Setiap aksi memiliki reaksi yang sama besar dan berlawanan arah.`,
  },
  {
    title: "Stoikiometri dan Perhitungan Kimia",
    subject: "Kimia",
    category: "Stoikiometri",
    description:
      "Mempelajari konsep mol, massa molar, persamaan reaksi, dan pereaksi pembatas untuk persiapan ujian.",
    difficulty: "Menengah",
    duration: 35,
    topics: [
      "Konsep Mol",
      "Massa Molar",
      "Persamaan Reaksi",
      "Pereaksi Pembatas",
    ],
    content: `# Stoikiometri dan Perhitungan Kimia

Stoikiometri membantu kita menghitung jumlah zat dalam reaksi kimia.

## Konsep Mol
Mol adalah satuan jumlah zat. Satu mol mengandung sekitar 6,02 × 10²³ partikel.

## Langkah Umum Menyelesaikan Soal
1. Setarakan persamaan reaksi.
2. Ubah data menjadi mol.
3. Gunakan perbandingan koefisien.
4. Ubah kembali ke satuan yang diminta.`,
  },
  {
    title: "Genetika dan Pewarisan Sifat",
    subject: "Biologi",
    category: "Genetika",
    description:
      "Memahami hukum Mendel, pola pewarisan sifat, dan penerapan genetika dalam kehidupan.",
    difficulty: "Menengah",
    duration: 40,
    topics: [
      "Hukum Mendel",
      "Persilangan Monohibrid",
      "Persilangan Dihibrid",
      "Penyimpangan Semu",
    ],
    content: `# Genetika dan Pewarisan Sifat

Genetika mempelajari pewarisan sifat dari induk kepada keturunannya.

## Istilah Penting
- Gen: unit pewarisan sifat.
- Alel: variasi dari suatu gen.
- Genotipe: susunan genetik individu.
- Fenotipe: sifat yang tampak.

## Hukum Mendel
Hukum Mendel menjelaskan pola dasar pewarisan sifat pada organisme.`,
  },
  {
    title: "Teks Argumentasi dan Struktur",
    subject: "Bahasa Indonesia",
    category: "Teks",
    description:
      "Memahami struktur, ciri-ciri, dan cara menyusun teks argumentasi yang jelas dan meyakinkan.",
    difficulty: "Mudah",
    duration: 30,
    topics: ["Struktur Teks", "Argumentasi", "Fakta dan Opini", "Konjungsi"],
    content: `# Teks Argumentasi dan Struktur

Teks argumentasi adalah teks yang berisi pendapat atau gagasan penulis yang didukung alasan dan bukti.

## Struktur Umum
1. Pendahuluan: memperkenalkan isu.
2. Argumen: menjelaskan alasan dan bukti.
3. Penegasan ulang: memperkuat pendapat utama.

## Tips Menulis
Gunakan data, contoh, dan bahasa yang logis agar argumen lebih meyakinkan.`,
  },
  {
    title: "Conditional Sentences (If Clauses)",
    subject: "Bahasa Inggris",
    category: "Grammar",
    description:
      "Mempelajari jenis-jenis kalimat pengandaian dalam bahasa Inggris dan penggunaannya.",
    difficulty: "Menengah",
    duration: 35,
    topics: ["Type 0", "Type 1", "Type 2", "Type 3", "Mixed Conditionals"],
    content: `# Conditional Sentences

Conditional sentence adalah kalimat yang menyatakan kondisi dan akibatnya.

## Type 0
Digunakan untuk fakta umum. Example: If water reaches 100°C, it boils.

## Type 1
Digunakan untuk kemungkinan nyata di masa depan. Example: If I study, I will pass the exam.

## Type 2
Digunakan untuk situasi imajiner saat ini. Example: If I had more time, I would practice more.`,
  },
];

const seedDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error(
      "MONGO_URI is missing. Create Back-end/.env based on .env.example",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    await Material.deleteMany({});
    await Material.insertMany(materialsData);

    console.log(
      `🌱 Database seeded with ${materialsData.length} learning materials`,
    );
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
};

seedDB();
