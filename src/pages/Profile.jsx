import Layout from './layout/Layout'
import './Profile.css'

const Profile = () => {
  return (
    <Layout>
      <div className="profile-container">
        <h1 className="text-3xl font-bold mb-4 text-orange-500">Tentang Website PPDB</h1>
        <p className="text-lg mb-4">
          Website ini dibuat sebagai bagian dari tugas sertifikasi BNSP dengan tema
          <strong> Penerimaan Peserta Didik Baru (PPDB)</strong>. Tujuan utama dari pembuatan website ini
          adalah untuk mempermudah proses pendaftaran siswa baru secara digital, serta menunjukkan kemampuan saya
          dalam membangun aplikasi berbasis web.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Fitur Website:</h2>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>Landing Page informatif</li>
          <li>Formulir pendaftaran siswa baru</li>
          <li>Manajemen data pendaftar (tambah, edit, hapus, cari)</li>
          <li>Halaman responsif dan user-friendly</li>
          <li>Koneksi API menggunakan Express.js dan Sequelize</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Teknologi yang Digunakan:</h2>
        <ul className="list-disc list-inside text-lg">
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>Backend:</strong> Express.js, Node.js, Sequelize</li>
          <li><strong>Database:</strong> MySQL</li>
        </ul>
        <p className="text-lg mt-4">
          Dengan proyek ini, saya ingin menunjukkan kemampuan dalam pengembangan web fullstack dan penerapan praktik terbaik
          dalam membangun aplikasi berbasis kebutuhan nyata.
        </p>
      </div>
    </Layout>
  )
}

export default Profile
