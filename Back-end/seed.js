const mongoose = require("mongoose");
require("dotenv").config();
const Material = require("./models/Material");

const materialsData = [
  {
    title: "Integral Tak Tentu dan Tertentu",
    subject: "Matematika",
    category: "Kalkulus",
    description: "Pelajari konsep dasar integral...",
    difficulty: "Sulit",
    duration: 45,
    topics: [
      "Integral Tak Tentu",
      "Integral Tertentu",
      "Teknik Substitusi",
      "Integral Parsial",
    ],
    content: `# Integral Tak Tentu dan Tertentu...`,
  },
  {
    title: "Hukum Newton dan Dinamika Gerak",
    subject: "Fisika",
    category: "Mekanika",
    description:
      "Memahami hukum-hukum Newton tentang gerak, gaya, dan aplikasinya dalam kehidupan sehari-hari.",
    difficulty: "Menengah",
    duration: 40,
    topics: [
      "Hukum Newton I",
      "Hukum Newton II",
      "Hukum Newton III",
      "Gerak Melingkar",
    ],
    content: `# Hukum Newton dan Dinamika Gerak\n\n## Hukum-Hukum Newton\n\n### Hukum Newton I (Hukum Kelembaman)\n"Setiap benda akan tetap diam atau bergerak lurus beraturan kecuali ada gaya luar yang bekerja padanya."\n\n**Rumus:** ΣF = 0...`,
  },
  {
    title: "Stoikiometri dan Perhitungan Kimia",
    subject: "Kimia",
    category: "Stoikiometri",
    description:
      "Mempelajari perhitungan kimia, mol, massa molar, dan reaksi kimia untuk persiapan ujian.",
    difficulty: "Menengah",
    duration: 35,
    topics: [
      "Konsep Mol",
      "Massa Molar",
      "Persamaan Reaksi",
      "Pereaksi Pembatas",
    ],
    content: `# Stoikiometri dan Perhitungan Kimia\n\n## Konsep Dasar\n\n### 1. Mol\nMol adalah satuan jumlah zat yang mengandung 6,02 × 10²³ partikel (bilangan Avogadro)...`,
  },
  {
    title: "Genetika dan Pewarisan Sifat",
    subject: "Biologi",
    category: "Genetika",
    description:
      "Memahami hukum Mendel, pola pewarisan sifat, dan aplikasi genetika dalam kehidupan.",
    difficulty: "Menengah",
    duration: 40,
    topics: [
      "Hukum Mendel",
      "Persilangan Monohibrid",
      "Persilangan Dihibrid",
      "Penyimpangan Semu",
    ],
    content: `# Genetika dan Pewarisan Sifat\n\n## Konsep Dasar Genetika\n\n### Istilah Penting:\n- **Gen**: Unit pewarisan sifat\n- **Alel**: Bentuk alternatif dari gen...`,
  },
  {
    title: "Teks Argumentasi dan Struktur",
    subject: "Bahasa Indonesia",
    category: "Teks",
    description:
      "Memahami struktur, ciri-ciri, dan cara menyusun teks argumentasi yang baik.",
    difficulty: "Mudah",
    duration: 30,
    topics: ["Struktur Teks", "Argumentasi", "Fakta dan Opini", "Konjungsi"],
    content: `# Teks Argumentasi dan Struktur\n\n## Pengertian Teks Argumentasi\n\nTeks argumentasi adalah teks yang berisi pendapat, gagasan, atau ide penulis disertai dengan bukti...`,
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
    content: `# Conditional Sentences (If Clauses)\n\n## What are Conditional Sentences?\n\nConditional sentences are statements that express situations and their consequences...`,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding✅");
    await Material.deleteMany({});
    await Material.insertMany(materialsData);
    console.log("Database berhasil diisi dengan 6 materi ujian! 🌱");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
