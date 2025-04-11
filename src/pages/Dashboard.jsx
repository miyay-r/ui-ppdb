import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import "./Dashboard.css";
import { MdPeople, MdCloud, MdWeb, MdPhoneIphone } from "react-icons/md";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      const res = await fetch("https://rizky.rikpetik.site/api/pendaftar");
      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error("Gagal mengambil data siswa:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = data.length;
  const totalPSJ = data.filter((siswa) => siswa.jurusan?.toLowerCase() === "psj").length;
  const totalPPW = data.filter((siswa) => siswa.jurusan?.toLowerCase() === "ppw").length;
  const totalPPM = data.filter((siswa) => siswa.jurusan?.toLowerCase() === "ppm").length;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <div className="card-wrapper">
          <div className="card total">
            <div className="card-icon"><MdPeople /></div>
            <h4>Siswa</h4>
            <p>{total}</p>
          </div>
          <div className="card psj">
            <div className="card-icon"><MdCloud /></div>
            <h4>PSJ</h4>
            <p>{totalPSJ}</p>
          </div>
          <div className="card ppw">
            <div className="card-icon"><MdWeb /></div>
            <h4>PPW</h4>
            <p>{totalPPW}</p>
          </div>
          <div className="card ppm">
            <div className="card-icon"><MdPhoneIphone /></div>
            <h4>PPM</h4>
            <p>{totalPPM}</p>
          </div>
        </div>

        <h3 className="table-title">Data Siswa</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>Sekolah</th>
                <th>Jurusan</th>
                <th>NISN</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((siswa, index) => (
                <tr key={siswa.id_pendaftar}>
                  <td>{startIndex + index + 1}</td>
                  <td>{siswa.nm_pendaftar}</td>
                  <td>{siswa.jenis_kelamin}</td>
                  <td>{siswa.asal_sekolah}</td>
                  <td>{siswa.jurusan?.toUpperCase()}</td>
                  <td>{siswa.nisn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
