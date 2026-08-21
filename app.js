let riwayatData = [];

function hitungUFR() {

  const kode = document.getElementById("kodeSesi").value;
  const bb = parseFloat(document.getElementById("bb").value);
  const uf = parseFloat(document.getElementById("uf").value);
  const durasi = parseFloat(document.getElementById("durasi").value);
  const threshold = parseFloat(document.getElementById("threshold").value);

  const hasil = document.getElementById("hasil");

  if (!kode || !bb || !uf || !durasi || !threshold) {
    hasil.className = "";
    hasil.innerHTML = "⚠️ Mohon isi semua data.";
    return;
  }

  const ufr = uf / bb / durasi;

  let status;

  if (ufr >= threshold) {

    status = "HIGH UFR";

    hasil.className = "high-result";

    hasil.innerHTML = `
      <h3>Hasil Skrining</h3>

      <p>
        <strong>UFR: ${ufr.toFixed(2)} mL/kg/jam</strong>
      </p>

      <p style="color:#b91c1c; font-size:18px;">
        ⚠️ HIGH UFR
      </p>

      <p>
        Hasil berada pada atau di atas threshold
        ${threshold.toFixed(1)} mL/kg/jam.
      </p>

      <p style="font-size:13px;">
        Verifikasi kembali data pasien dan lakukan
        evaluasi klinis sesuai SOP unit hemodialisis.
      </p>
    `;

  } else {

    status = "DI BAWAH THRESHOLD";

    hasil.className = "normal-result";

    hasil.innerHTML = `
      <h3>Hasil Skrining</h3>

      <p>
        <strong>UFR: ${ufr.toFixed(2)} mL/kg/jam</strong>
      </p>

      <p style="color:#166534; font-size:18px;">
        ✓ DI BAWAH THRESHOLD
      </p>

      <p>
        Hasil berada di bawah threshold
        ${threshold.toFixed(1)} mL/kg/jam.
      </p>

      <p style="font-size:13px;">
        Hasil skrining tetap perlu diinterpretasikan
        sesuai kondisi klinis pasien dan SOP unit hemodialisis.
      </p>
    `;
  }

  // Simpan ke riwayat
  riwayatData.push({
    kode: kode,
    ufr: ufr.toFixed(2),
    status: status
  });

  tampilkanRiwayat();
}


function tampilkanRiwayat() {

  const riwayat = document.getElementById("riwayat");

  let html = "";

  riwayatData.forEach((data, index) => {

    html += `
      <div style="
        background:#f8fafc;
        padding:12px;
        margin-top:10px;
        border-radius:10px;
        border:1px solid #e2e8f0;
      ">

        <strong>${data.kode}</strong>

        <br>

        UFR:
        <strong>${data.ufr} mL/kg/jam</strong>

        <br>

        Status:
        <strong>${data.status}</strong>

      </div>
    `;
  });

  riwayat.innerHTML = html;
}