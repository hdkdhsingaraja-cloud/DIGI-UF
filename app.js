// ==================================================
// DIGI-UF
// DIGITAL ULTRAFILTRATION RATE CALCULATOR
// ==================================================


// ==================================================
// DATA RIWAYAT
// ==================================================

let riwayatData = JSON.parse(
    localStorage.getItem("riwayatDIGIUF") || "[]"
);


// ==================================================
// HITUNG UFR
// ==================================================

function hitungUFR() {

    const kode =
        document
            .getElementById("kodeSesi")
            .value
            .trim();


    const bb =
        parseFloat(
            document
                .getElementById("bb")
                .value
        );


    const uf =
        parseFloat(
            document
                .getElementById("uf")
                .value
        );


    const durasi =
        parseFloat(
            document
                .getElementById("durasi")
                .value
        );


    const threshold =
        parseFloat(
            document
                .getElementById("threshold")
                .value
        );


    const hasil =
        document.getElementById("hasil");


    // ==================================================
    // VALIDASI DATA
    // ==================================================

    if (
        !kode ||
        !bb ||
        !uf ||
        !durasi ||
        !threshold
    ) {

        hasil.className =
            "warning-result";


        hasil.innerHTML = `

            <h3>
                ⚠️ Data Belum Lengkap
            </h3>

            <p>
                Mohon isi semua data sebelum
                melakukan perhitungan.
            </p>

        `;

        return;
    }


    if (
        bb <= 0 ||
        uf <= 0 ||
        durasi <= 0 ||
        threshold <= 0
    ) {

        hasil.className =
            "warning-result";


        hasil.innerHTML = `

            <h3>
                ⚠️ Data Tidak Valid
            </h3>

            <p>
                Nilai harus lebih dari 0.
            </p>

        `;

        return;
    }


    // ==================================================
    // RUMUS UFR
    // ==================================================

    const ufr =
        uf / bb / durasi;


    const ufrTampil =
        ufr.toFixed(2);


    const thresholdTampil =
        threshold.toFixed(2);


    // ==================================================
    // HIGH UFR
    // ==================================================

    if (ufr >= threshold) {

        hasil.className =
            "high-result";


        hasil.innerHTML = `

            <div class="result-header">

                <h3>
                    🔴 HIGH UFR
                </h3>

            </div>


            <div class="result-data">

                <p>
                    <strong>
                        Kode Sesi
                    </strong>

                    <span>
                        ${kode}
                    </span>
                </p>


                <p>
                    <strong>
                        UFR
                    </strong>

                    <span>
                        ${ufrTampil}
                        mL/kg/jam
                    </span>
                </p>


                <p>
                    <strong>
                        Threshold
                    </strong>

                    <span>
                        ${thresholdTampil}
                        mL/kg/jam
                    </span>
                </p>


                <p>
                    <strong>
                        Status
                    </strong>

                    <span>
                        HIGH UFR
                    </span>
                </p>

            </div>


            <div class="recommendation">

                <h4>
                    ⚠️ Rekomendasi Tindak Lanjut
                </h4>

                <ul>

                    <li>
                        Berikan perhatian khusus
                        terhadap hasil skrining.
                    </li>

                    <li>
                        Lakukan evaluasi klinis
                        pasien dan parameter
                        hemodialisis.
                    </li>

                    <li>
                        Evaluasi kembali target UF
                        dan durasi hemodialisis
                        sesuai kondisi pasien dan
                        preskripsi yang berlaku.
                    </li>

                    <li>
                        Diskusikan hasil skrining
                        dengan tim atau dokter
                        yang bertanggung jawab.
                    </li>

                    <li>
                        Dokumentasikan hasil
                        skrining dan tindak lanjut.
                    </li>

                </ul>

            </div>


            <div class="disclaimer">

                <strong>
                    Catatan:
                </strong>

                DIGI-UF merupakan alat bantu
                skrining dan bukan pengganti
                penilaian klinis atau preskripsi
                hemodialisis.

            </div>

        `;


        simpanRiwayat(
            kode,
            bb,
            uf,
            durasi,
            threshold,
            ufrTampil,
            "HIGH UFR"
        );


    }


    // ==================================================
    // DI BAWAH THRESHOLD
    // ==================================================

    else {

        hasil.className =
            "normal-result";


        hasil.innerHTML = `

            <div class="result-header">

                <h3>
                    🟢 UFR DI BAWAH THRESHOLD
                </h3>

            </div>


            <div class="result-data">

                <p>
                    <strong>
                        Kode Sesi
                    </strong>

                    <span>
                        ${kode}
                    </span>
                </p>


                <p>
                    <strong>
                        UFR
                    </strong>

                    <span>
                        ${ufrTampil}
                        mL/kg/jam
                    </span>
                </p>


                <p>
                    <strong>
                        Threshold
                    </strong>

                    <span>
                        ${thresholdTampil}
                        mL/kg/jam
                    </span>
                </p>


                <p>
                    <strong>
                        Status
                    </strong>

                    <span>
                        DI BAWAH THRESHOLD
                    </span>
                </p>

            </div>


            <div class="recommendation">

                <h4>
                    ✅ Rekomendasi Tindak Lanjut
                </h4>

                <ul>

                    <li>
                        Lanjutkan pemantauan
                        sesuai prosedur
                        hemodialisis.
                    </li>

                    <li>
                        Evaluasi kembali UFR
                        apabila terdapat perubahan
                        berat badan, UF yang
                        direncanakan, atau durasi
                        hemodialisis.
                    </li>

                    <li>
                        Tetap lakukan pemantauan
                        kondisi klinis pasien selama
                        proses hemodialisis.
                    </li>

                    <li>
                        Dokumentasikan hasil
                        skrining.
                    </li>

                </ul>

            </div>


            <div class="disclaimer">

                <strong>
                    Catatan:
                </strong>

                DIGI-UF merupakan alat bantu
                skrining dan bukan pengganti
                penilaian klinis atau preskripsi
                hemodialisis.

            </div>

        `;


        simpanRiwayat(
            kode,
            bb,
            uf,
            durasi,
            threshold,
            ufrTampil,
            "DI BAWAH THRESHOLD"
        );

    }

}


// ==================================================
// SIMPAN RIWAYAT
// ==================================================

function simpanRiwayat(
    kode,
    bb,
    uf,
    durasi,
    threshold,
    ufr,
    status
) {

    const dataBaru = {

        kode: kode,

        bb: bb,

        uf: uf,

        durasi: durasi,

        threshold: threshold,

        ufr: ufr,

        status: status,

        waktu:
            new Date()
                .toLocaleString("id-ID")

    };


    riwayatData.unshift(
        dataBaru
    );


    // Maksimal 50 data

    if (
        riwayatData.length > 50
    ) {

        riwayatData =
            riwayatData.slice(
                0,
                50
            );

    }


    localStorage.setItem(
        "riwayatDIGIUF",
        JSON.stringify(
            riwayatData
        )
    );


    tampilkanRiwayat();

}


// ==================================================
// DASHBOARD
// ==================================================

function updateDashboard() {

    const totalSkrining =
        document.getElementById(
            "totalSkrining"
        );


    const totalHigh =
        document.getElementById(
            "totalHigh"
        );


    const totalNormal =
        document.getElementById(
            "totalNormal"
        );


    // Jika elemen belum ada

    if (
        !totalSkrining ||
        !totalHigh ||
        !totalNormal
    ) {

        return;

    }


    // Total skrining

    const total =
        riwayatData.length;


    // Total HIGH UFR

    const high =
        riwayatData.filter(
            function(data) {

                return (
                    data.status ===
                    "HIGH UFR"
                );

            }
        ).length;


    // Total di bawah threshold

    const normal =
        riwayatData.filter(
            function(data) {

                return (
                    data.status ===
                    "DI BAWAH THRESHOLD"
                );

            }
        ).length;


    // Tampilkan angka

    totalSkrining.textContent =
        total;


    totalHigh.textContent =
        high;


    totalNormal.textContent =
        normal;

}


// ==================================================
// TAMPILKAN RIWAYAT
// ==================================================

function tampilkanRiwayat() {

    // Update dashboard

    updateDashboard();


    const riwayat =
        document.getElementById(
            "riwayat"
        );


    if (!riwayat) {

        return;

    }


    // Belum ada data

    if (
        riwayatData.length === 0
    ) {

        riwayat.innerHTML = `

            <div
                style="
                    text-align:center;
                    color:#94a3b8;
                    padding:25px 10px;
                    font-size:13px;
                "
            >

                📋

                <br><br>

                Belum ada data skrining.

            </div>

        `;

        return;

    }


    // Buat daftar riwayat

    riwayat.innerHTML =

        riwayatData
            .map(
                function(data) {

                    const high =
                        data.status ===
                        "HIGH UFR";


                    const kelas =
                        high
                            ? "history-high"
                            : "history-normal";


                    const icon =
                        high
                            ? "🔴"
                            : "🟢";


                    return `

                        <div
                            class="
                                history-item
                                ${kelas}
                            "
                        >

                            <div
                                class="
                                    history-title
                                "
                            >

                                ${icon}

                                <strong>
                                    ${data.kode}
                                </strong>

                            </div>


                            <div
                                class="
                                    history-info
                                "
                            >

                                <span>
                                    UFR:
                                    <strong>
                                        ${data.ufr}
                                        mL/kg/jam
                                    </strong>
                                </span>


                                <span>
                                    Status:
                                    <strong>
                                        ${data.status}
                                    </strong>
                                </span>


                                <span>
                                    ${data.waktu}
                                </span>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


// ==================================================
// NAVIGASI
// ==================================================

function bukaHalaman(
    namaHalaman,
    tombol
) {


    // Sembunyikan semua halaman

    document
        .querySelectorAll(".page")
        .forEach(
            function(page) {

                page.classList.remove(
                    "active"
                );

            }
        );


    // Tampilkan halaman

    const halaman =
        document.getElementById(
            "page-" + namaHalaman
        );


    if (halaman) {

        halaman.classList.add(
            "active"
        );

    }


    // Reset navigasi

    document
        .querySelectorAll(".nav-item")
        .forEach(
            function(item) {

                item.classList.remove(
                    "active"
                );

            }
        );


    // Aktifkan tombol

    if (tombol) {

        tombol.classList.add(
            "active"
        );

    }


    // Refresh dashboard

    updateDashboard();


    // Refresh riwayat

    if (
        namaHalaman === "riwayat"
    ) {

        tampilkanRiwayat();

    }


    // Kembali ke atas

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==================================================
// SAAT APLIKASI DIBUKA
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateDashboard();

        tampilkanRiwayat();

    }
);
