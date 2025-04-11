import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Index.css";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-container">
      {/* HEADER */}
      <header className="landing-header">
        <div className="logo">Alena Boarding School</div>

        {/* Navigation Links */}
        <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <a href="#fasilitas" onClick={toggleMenu}>Fasilitas</a>
          <a href="#jurusan" onClick={toggleMenu}>Jurusan</a>
          <a href="#info" onClick={toggleMenu}>Informasi</a>
          <NavLink to="/pendaftaran" className="nav-daftar" onClick={toggleMenu}>Daftar</NavLink>
          <NavLink to="/dashboard" className="nav-admin" onClick={toggleMenu}>Admin</NavLink>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Selamat Datang di PPDB AlenaBS</h1>
          <p>Bersama membentuk generasi cerdas dan berkarakter melalui pendidikan berkualitas.</p>
          <NavLink to="/pendaftaran" className="btn-daftar">Daftar Sekarang</NavLink>
        </div>
        <div className="hero-image">
          <img src="/poster.png" alt="PPDB Illustration" />
        </div>
      </section>

      {/* FASILITAS */}
      <section className="fasilitas" id="fasilitas">
        <h2>Fasilitas Unggulan</h2>
        <div className="fasilitas-grid">
          <div className="fasilitas-item">
            <img src="/labkom.jpg" alt="Lab Komputer" />
            <h4>Lab Komputer</h4>
            <p>Dilengkapi teknologi terkini untuk menunjang pembelajaran digital.</p>
          </div>
          <div className="fasilitas-item">
            <img src="/perpus.jpg" alt="Perpustakaan" />
            <h4>Perpustakaan Modern</h4>
            <p>Koleksi buku lengkap, ruang baca nyaman, dan akses e-book.</p>
          </div>
          <div className="fasilitas-item">
            <img src="/robotik.jpg" alt="Ekstrakurikuler" />
            <h4>Kegiatan Ekstrakurikuler</h4>
            <p>Pengembangan minat dan bakat siswa di berbagai bidang.</p>
          </div>
        </div>
      </section>

      {/* JURUSAN */}
      <section className="jurusan" id="jurusan">
        <h2>Jurusan Kami</h2>
        <div className="jurusan-grid">
          <div className="jurusan-card">
            <h3>PSJ</h3>
            <p>Dalam membangun, mengelola, dan mengamankan sistem jaringan komputer modern.</p>
          </div>
          <div className="jurusan-card">
            <h3>PPW</h3>
            <p>Siswa belajar membangun dan mengembangkan aplikasi berbasis web, mulai dari front-end hingga back-end.</p>
          </div>
          <div className="jurusan-card">
            <h3>PPM</h3>
            <p>Siswa diajarkan membuat aplikasi dari nol hingga siap digunakan, lengkap dengan desain UI/UX dan logika pemrograman yang efisien.</p>
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="info" id="info">
        <h2>Informasi Pendaftaran</h2>
        <p>Pendaftaran dibuka mulai <strong>1 April</strong> sampai <strong>30 Juni</strong> setiap tahun ajaran.</p>
        <p>Silahkan registrasi untuk menjadi siswa baru PeTIK</p>
        <NavLink to="/pendaftaran" className="btn-daftar">Mulai Pendaftaran</NavLink>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} PPDB Alena Boarding School. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
