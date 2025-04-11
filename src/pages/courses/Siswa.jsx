import React, { useEffect, useState } from "react";
import "./Siswa.css";
import Layout from "../layout/Layout";

const Siswa = () => {
  const [pendaftar, setPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    nm_pendaftar: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    jurusan: "",
    tgl_lahir: "",
    nisn: "",
  });

  const [errors, setErrors] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://rizky.rikpetik.site/api/pendaftar");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setPendaftar(data.data || []);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      alert("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus data ini?");
    if (!konfirmasi) return;

    try {
      const res = await fetch(`https://rizky.rikpetik.site/api/pendaftar/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      setPendaftar((prev) => prev.filter((item) => item.id_pendaftar !== id));
    } catch (err) {
      console.error("Gagal menghapus:", err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData({ ...item });
    setSelectedId(item.id_pendaftar);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const resetForm = () => {
    setFormData({
      nm_pendaftar: "",
      alamat: "",
      jenis_kelamin: "",
      no_hp: "",
      asal_sekolah: "",
      jurusan: "",
      tgl_lahir: "",
      nisn: "",
    });
    setErrors({});
    setIsEdit(false);
    setSelectedId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const hurufRegex = /^[a-zA-Z\s]+$/;
    const jurusanValid = ["psj", "ppw", "ppm"];

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = "Field ini wajib diisi";
      }
    }

    if (formData.nm_pendaftar && !hurufRegex.test(formData.nm_pendaftar)) {
      newErrors.nm_pendaftar = "Nama berupa huruf .";
    }
    if (formData.jurusan && !jurusanValid.includes(formData.jurusan.toLowerCase())) {
      newErrors.jurusan = "Jurusan tidak valid.";
    }
    if (formData.nisn && !/^\d{10,}$/.test(formData.nisn)) {
      newErrors.nisn = "NISN harus berupa angka dan minimal 10 digit.";
    }
    if (formData.no_hp && !/^\d{10,15}$/.test(formData.no_hp)) {
      newErrors.no_hp = "Nomor HP harus berupa angka dan 10-15 digit.";
    }
    const today = new Date();
    const inputDate = new Date(formData.tgl_lahir);
    if (formData.tgl_lahir && inputDate > today) {
      newErrors.tgl_lahir = "Tanggal lahir tidak valid.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const endpoint = isEdit
        ? `https://rizky.rikpetik.site/api/pendaftar/${selectedId}`
        : "https://rizky.rikpetik.site/api/pendaftar";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      fetchData();
      setShowModal(false);
      resetForm();
      alert(`Data berhasil ${isEdit ? "diperbarui" : "ditambahkan"}.`);
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const filteredData = pendaftar.filter((item) =>
    item.nisn?.toLowerCase().includes(searchId.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Layout>
      <div className="table-container">
        <h2>DATA PENDAFTAR</h2>

        <div className="top-bar">
          <input
            type="text"
            placeholder="Cari berdasarkan NISN..."
            value={searchId}
            onChange={(e) => {
              setSearchId(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          <button
            className="btn tambah"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Tambah Siswa
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center" }}>Sedang memuat data...</p>
        ) : (
          <div className="table-wrapper">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>No HP</th>
                  <th>Asal Sekolah</th>
                  <th>Jurusan</th>
                  <th>Tgl Lahir</th>
                  <th>NISN</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id_pendaftar}>
                      <td>{item.id_pendaftar}</td>
                      <td>{item.nm_pendaftar}</td>
                      <td>{item.alamat}</td>
                      <td>{item.jenis_kelamin}</td>
                      <td>{item.no_hp}</td>
                      <td>{item.asal_sekolah}</td>
                      <td>{item.jurusan}</td>
                      <td>{item.tgl_lahir}</td>
                      <td>{item.nisn}</td>
                      <td>
                        <button className="btn edit" onClick={() => handleEdit(item)}>
                          Edit
                        </button>
                        <button className="btn delete" onClick={() => handleDelete(item.id_pendaftar)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pagination">
              <button className="btn" onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    className={`btn page-number ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button className="btn" onClick={handleNext} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>

          </div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{isEdit ? "Edit Siswa" : "Tambah Siswa"}</h3>
              <form onSubmit={handleSubmit} className="modal-form">
                <input name="nm_pendaftar" placeholder="Nama" value={formData.nm_pendaftar} onChange={handleInputChange} required />
                <span className="error">{errors.nm_pendaftar}</span>

                <input name="alamat" placeholder="Alamat" value={formData.alamat} onChange={handleInputChange} required />
                <span className="error">{errors.alamat}</span>

                <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleInputChange} required>
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <span className="error">{errors.jenis_kelamin}</span>

                <input name="no_hp" placeholder="No HP" value={formData.no_hp} onChange={handleInputChange} required />
                <span className="error">{errors.no_hp}</span>

                <input name="asal_sekolah" placeholder="Asal Sekolah" value={formData.asal_sekolah} onChange={handleInputChange} required />
                <span className="error">{errors.asal_sekolah}</span>

                <select name="jurusan" value={formData.jurusan} onChange={handleInputChange} required>
                  <option value="">-- Pilih Jurusan --</option>
                  <option value="PSJ">PSJ</option>
                  <option value="PPW">PPW</option>
                  <option value="PPM">PPM</option>
                </select>
                <span className="error">{errors.jurusan}</span>

                <input type="date" name="tgl_lahir" value={formData.tgl_lahir} onChange={handleInputChange} required />
                <span className="error">{errors.tgl_lahir}</span>

                <input
                  name="nisn"
                  placeholder="NISN"
                  value={formData.nisn}
                  onChange={handleInputChange}
                  required
                  disabled={isEdit}
                />
                <span className="error">{errors.nisn}</span>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn cancel"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn submit">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Siswa;