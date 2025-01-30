// Ini JavaScript

// Menunggu DOM Selesai Dimuat
document.addEventListener('DOMContentLoaded', function () {
    console.log('Hai');

    // Menambahkan event listener untuk tombol "Hitung BMI"
    document.querySelector('.button-hitung').addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah reload halaman
        calculateBMI();
    });

    // Menambahkan event listener untuk tombol "Reset"
    document.querySelector('.button-reset').addEventListener('click', function () {
        resetForm();
    });

    // Menambahkan event listener untuk tombol "Download Hasil"
    document.querySelector('.download-result-button').addEventListener('click', function () {
        downloadResult();
    });
});

// Fungsi Menghitung BMI
function calculateBMI() {
    let weight = parseFloat(document.getElementById('input-berat-badan').value);
    let height = parseFloat(document.getElementById('input-tinggi-badan').value);
    let age = parseInt(document.getElementById('input-usia').value);

    let resultBMI = document.getElementById('result-BMI');
    let statusText = document.getElementById('status-BMI'); // Elemen baru untuk menampilkan status

    // Validasi input kosong atau tidak valid
    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        alert('Tolong isi semua form dengan benar!');
        return;
    }

    // Menghitung BMI dengan rumus
    let BMI = (weight / Math.pow(height / 100, 2)).toFixed(2);
    resultBMI.textContent = BMI;

    console.log("Berat:", weight, "kg | Tinggi:", height, "cm | Usia:", age, "tahun | BMI:", BMI);

    // Menentukan kategori BMI dan keterangan
    let category = "";
    let description = "";

    if (BMI < 18.5) {
        category = 'Kekurangan Berat Badan';
        description = 'Anda termasuk dalam kategori **kurus**. Disarankan untuk meningkatkan asupan gizi.';
    } else if (BMI >= 18.5 && BMI < 24.9) {
        category = 'Berat Badan Ideal';
        description = 'Selamat! Anda memiliki berat badan yang **normal (ideal)**. Tetap jaga pola hidup sehat.';
    } else if (BMI >= 25.0 && BMI < 29.9) {
        category = 'Kelebihan Berat Badan';
        description = 'Anda termasuk dalam kategori **kelebihan berat badan**. Sebaiknya mulai menjaga pola makan dan rutin berolahraga.';
    } else {
        category = 'Kegemukan (Obesitas)';
        description = 'Anda berada dalam kategori **obesitas**. Disarankan untuk berkonsultasi dengan ahli gizi atau dokter.';
    }

    // Menampilkan hasil status BMI di dalam form
    statusText.innerHTML = `<strong>${category}</strong><br>${description}`;
}

// Fungsi Reset Form
function resetForm() {
    document.getElementById('BMI-calc-form').reset();
    document.getElementById('result-BMI').textContent = "0"; // Reset hasil BMI
    document.getElementById('status-BMI').innerHTML = ""; // Reset status BMI
}

// Fungsi Download Hasil BMI
function downloadResult() {
    let BMI = document.getElementById('result-BMI').textContent;
    let statusText = document.getElementById('status-BMI').innerHTML;

    if (BMI === "0") {
        alert("Hitung BMI terlebih dahulu sebelum mengunduh hasil!");
        return;
    }

    const newTab = window.open('', '_blank');
    newTab.document.write(`
        <html>
        <head><title>Hasil BMI</title></head>
        <body>
            <h1>Hasil BMI Anda</h1>
            <p>Nilai BMI: <strong>${BMI}</strong></p>
            <p>${statusText}</p>
            <p>Terima kasih telah menggunakan Kalkulator BMI kami.</p>
        </body>
        </html>
    `);
}

// Fungsi Buka Halaman Konsultasi
function openConsultation(url) {
    window.open(url, '_blank');
}
