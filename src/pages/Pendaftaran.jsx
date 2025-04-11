import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⬅️ Tambahkan ini
import './Pendaftaran.css';

const Pendaftaran = () => {
  const navigate = useNavigate(); // ⬅️ Inisialisasi navigator
  const [form, setForm] = useState({
    nm_pendaftar: '',
    alamat: '',
    jenis_kelamin: '',
    no_hp: '',
    asal_sekolah: '',
    jurusan: '',
    tgl_lahir: '',
    nisn: '',
  });

  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState('');

  const jurusanOptions = ['PSJ', 'PPW', 'PPM'];

  const validate = () => {
    const newErrors = {};
    const hurufRegex = /^[A-Za-z\s]+$/;
    const angkaRegex = /^[0-9]+$/;
    const today = new Date();

    if (!form.nm_pendaftar.trim()) {
      newErrors.nm_pendaftar = 'Nama wajib diisi';
    } else if (!hurufRegex.test(form.nm_pendaftar)) {
      newErrors.nm_pendaftar = 'Nama hanya boleh huruf dan spasi';
    }

    if (!form.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi';
    }

    if (!form.jenis_kelamin) newErrors.jenis_kelamin = 'Pilih jenis kelamin';

    if (!form.no_hp.trim()) {
      newErrors.no_hp = 'Nomor HP wajib diisi';
    } else if (!angkaRegex.test(form.no_hp) || form.no_hp.length < 10) {
      newErrors.no_hp = 'Nomor HP harus angka dan minimal 10 digit';
    }

    if (!form.asal_sekolah.trim()) {
      newErrors.asal_sekolah = 'Asal sekolah wajib diisi';
    }

    if (!form.jurusan) newErrors.jurusan = 'Pilih jurusan';

    if (!form.tgl_lahir) {
      newErrors.tgl_lahir = 'Tanggal lahir wajib diisi';
    } else {
      const inputDate = new Date(form.tgl_lahir);
      if (inputDate > today) {
        newErrors.tgl_lahir = 'Tanggal tidak valid';
      }
    }

    if (!form.nisn.trim()) {
      newErrors.nisn = 'NISN wajib diisi';
    } else if (!angkaRegex.test(form.nisn) || form.nisn.length < 10) {
      newErrors.nisn = 'NISN harus angka dan minimal 10 digit';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('https://rizky.rikpetik.site/api/pendaftar', form);
      setPesan('✅ Pendaftaran berhasil!');
      setTimeout(() => {
        navigate('/'); // ⬅️ Arahkan ke halaman home
      }, 1500);
    } catch (err) {
      setPesan('❌ Pendaftaran gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="reg-container">
      <h2>Formulir Pendaftaran Siswa</h2>
      <form onSubmit={handleSubmit} className="reg-form">
        <input type="text" name="nm_pendaftar" value={form.nm_pendaftar} onChange={handleChange} placeholder="Nama Lengkap" />
        {errors.nm_pendaftar && <small className="error">{errors.nm_pendaftar}</small>}

        <textarea name="alamat" value={form.alamat} onChange={handleChange} placeholder="Alamat Lengkap"></textarea>
        {errors.alamat && <small className="error">{errors.alamat}</small>}

        <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange}>
          <option value="">Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        {errors.jenis_kelamin && <small className="error">{errors.jenis_kelamin}</small>}

        <input type="text" name="no_hp" value={form.no_hp} onChange={handleChange} placeholder="Nomor HP" />
        {errors.no_hp && <small className="error">{errors.no_hp}</small>}

        <input type="text" name="asal_sekolah" value={form.asal_sekolah} onChange={handleChange} placeholder="Asal Sekolah" />
        {errors.asal_sekolah && <small className="error">{errors.asal_sekolah}</small>}

        <select name="jurusan" value={form.jurusan} onChange={handleChange}>
          <option value="">Pilih Jurusan</option>
          {jurusanOptions.map((jrs, idx) => (
            <option key={idx} value={jrs}>{jrs}</option>
          ))}
        </select>
        {errors.jurusan && <small className="error">{errors.jurusan}</small>}

        <input type="date" name="tgl_lahir" value={form.tgl_lahir} onChange={handleChange} />
        {errors.tgl_lahir && <small className="error">{errors.tgl_lahir}</small>}

        <input type="text" name="nisn" value={form.nisn} onChange={handleChange} placeholder="NISN" />
        {errors.nisn && <small className="error">{errors.nisn}</small>}

        <div className="button-group">
          <button type="button" onClick={() => window.history.back()} className="btn-kembali">
            &larr; Kembali
          </button>
          <button type="submit">Daftar Sekarang</button>
        </div>
      </form>
      {pesan && <p className="reg-message">{pesan}</p>}
    </div>
  );
};

export default Pendaftaran;
