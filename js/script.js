// Fungsi untuk memvalidasi input berat badan, tinggi badan, usia, dan jenis kelamin
const validateInput = (weight, height, age, gender) => {
  // Mengambil elemen error message untuk masing-masing input
  const genderErrorMessage = document.getElementById('genderErrorMessage');
  const weightErrorMessage = document.getElementById('weightErrorMessage');
  const ageErrorMessage = document.getElementById('ageErrorMessage');
  const heightErrorMessage = document.getElementById('heightErrorMessage');

  // Mengatur pesan error menjadi kosong untuk mereset pesan error sebelumnya
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((element) => (element.innerText = ''));

  let isValid = true;

  // Validasi jenis kelamin
  if (!gender) {
    genderErrorMessage.innerText = 'Pilihlah jenis kelamin terlebih dahulu';
    isValid = false;
  }
  
  // Validasi berat badan
  if (isNaN(weight) || weight <= 0) {
    weightErrorMessage.innerText = 'Mengisi berat badan harus berupa angka lebih dari 0';
    isValid = false;
  }
  
  // Validasi tinggi badan
  if (isNaN(height) || height <= 0) {
    heightErrorMessage.innerText = 'Mengisi tinggi badan harus berupa angka lebih dari 0';
    isValid = false;
  }
  
  // Validasi usia
  if (isNaN(age) || age <= 0) {
    ageErrorMessage.innerText = 'Mengisi Umur harus berupa angka lebih dari 0';
    isValid = false;
  }
  
  return isValid;
};

// Fungsi untuk menghitung BMI berdasarkan berat badan dan tinggi badan
const calculateBMI = (weight, height) => {
  let bmi = weight / ((height / 100) ** 2);
  return bmi.toFixed(1);
};

// Objek untuk menyimpan kategori BMI dan pesan terkaitnya
const categories_bmi = {
  underWeight: 'Kekurangan berat badan',
  normal: 'Normal (ideal)',
  overWeight: 'Kelebihan berat badan',
  obesity: 'Kegemukan (Obesitas)',
};

// Fungsi untuk mengecek status BMI berdasarkan nilai BMI dan jenis kelamin
const checkStatus = (bmi, gender) => {
  let status = '';

  // Menentukan status BMI berdasarkan kategori dan nilai BMI
  switch (gender) {
    case 'Pria':
      if (bmi < 18.5) {
        status = categories_bmi.underWeight;
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = categories_bmi.normal;
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        status = categories_bmi.overWeight;
      } else if (bmi >= 30.0) {
        status = categories_bmi.obesity;
      }
    break;
    case 'Wanita':
      if (bmi < 17) {
        status = categories_bmi.underWeight;
      } else if (bmi >= 17 && bmi <= 23.9) {
        status = categories_bmi.normal;
      } else if (bmi >= 24.0 && bmi <= 27.0) { 
        status = categories_bmi.overWeight;
      } else if (bmi > 27.0) {
        status = categories_bmi.obesity;
      }
    break;
  }

  return status;
};

// Fungsi untuk mendapatkan deskripsi teks berdasarkan status BMI
const getDescText = (status) => {
  if (status === categories_bmi.underWeight) {
    return 'Anda memiliki berat badan kurang dari normal.';
  } else if (status === categories_bmi.normal) {
    return 'Anda memiliki berat badan dalam kisaran normal.';
  } else if (status === categories_bmi.overWeight) {
    return 'Anda memiliki berat badan berlebih.';
  } else if (status === categories_bmi.obesity) {
    return 'Anda memiliki berat badan yang sangat berlebih.';
  }
};

// Fungsi untuk mendapatkan teks saran berdasarkan status BMI
const getSuggestionText = (status) => {
  if (status === categories_bmi.underWeight) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menambah berat badan hingga batas normal.';
  } else if (status === categories_bmi.normal) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda memiliki berat badan yang sehat.';
  } else if (status === categories_bmi.overWeight) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
  } else if (status === categories_bmi.obesity) {
    return 'Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk mengurangi berat badan hingga batas normal.';
  }
};

// Fungsi untuk mendapatkan teks saran gizi berdasarkan status BMI
const getAdviceText = (status) => {
  if (status === categories_bmi.underWeight) {
    return 'Perbanyak asupan makanan bergizi dan konsultasikan dengan ahli gizi untuk peningkatan berat badan.';
  } else if (status === categories_bmi.normal) {
    return 'Lanjutkan gaya hidup sehat dengan pola makan seimbang dan olahraga teratur.';
  } else if (status === categories_bmi.overWeight) {
    return 'Lakukan penyesuaian pola makan dan rutin berolahraga untuk menurunkan berat badan.';
  } else if (status === categories_bmi.obesity) {
    return 'Segera konsultasikan dengan ahli gizi untuk penurunan berat badan yang sehat.';
  }
};

// Fungsi untuk mendapatkan daftar penyakit berdasarkan status BMI
const getDiseases = (status) => {
  if (status === categories_bmi.underWeight) {
    return ['Kekurangan gizi', 'Gangguan pertumbuhan', 'Sistem kekebalan tubuh lemah', 'Gangguan kesuburan'];
  } else if (status === categories_bmi.normal) {
    return ['Tidak menimbulkan'];
  } else if (status === categories_bmi.overWeight) {
    return ['Diabetes Tipe 2', 'Serangan Jantung', 'Hipertensi', 'Gastroesophageal Reflux Disease', 'Osteoarthritis', 'Kanker', 'Kolesterol Tinggi'];
  } else if (status === categories_bmi.obesity) {
    return ['Penyakit Jantung', 'Stroke', 'Kanker', 'Masalah Pencernaan', 'Sleep Apnea', 'Osteoartritis'];
  }
};

// Fungsi untuk menampilkan hasil BMI, status, saran, dan risiko penyakit
const generateDisplay = (bmi, status) => {
  const resultTitle = document.getElementById('result-title');
  resultTitle.innerText = status;
  const resultBmi = document.getElementById('result-bmi');
  resultBmi.innerText = bmi;
  const resultDesc = document.getElementById('result-desc');
  resultDesc.innerText = getDescText(status);

  const resultText = document.getElementById('result-text');
  resultText.innerText = `Hasil BMI: ${bmi}`;

  const suggestionText = document.getElementById('suggestion-text');
  suggestionText.innerText = getSuggestionText(status);

  const adviceText = document.getElementById('advice-text');
  adviceText.innerText = getAdviceText(status);

  const detailTitle = document.getElementById('detail-title');
  detailTitle.innerText = `Beberapa risiko penyakit yang berasal dari tubuh ${status}`;

  const detailList = document.getElementById('list-detail');
  detailList.innerHTML = '';

  const diseases = getDiseases(status);
  diseases.forEach((disease) => {
    const listItem = document.createElement('li');
    listItem.innerText = disease;
    detailList.appendChild(listItem);
  });

  // Menyembunyikan form dan menampilkan hasil
  document.getElementById('form').reset();
  document.getElementById('result').classList.remove('d-hidden');
  document.getElementById('home').classList.add('d-hidden');
  
  // Menampilkan tombol download
  document.getElementById('download-btn').classList.remove('d-hidden');
};

// Fungsi untuk mengecek BMI dan menampilkan hasil
const checkBMI = () => {
  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);
  const genderElement = document.querySelector('input[name="gender"]:checked');
  const age = Number(document.getElementById('age').value);

  const gender = genderElement ? genderElement.value : null;

  if (!validateInput(weight, height, age, gender)) {
    return;
  }

  const bmi = calculateBMI(weight, height);
  const status = checkStatus(bmi, gender);
  generateDisplay(bmi, status);

  document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
};

// Fungsi untuk download hasil result
const downloadResult = () => {
  const resultTitle = document.getElementById('result-title').innerText;
  const resultBmi = document.getElementById('result-bmi').innerText;
  const resultDesc = document.getElementById('result-desc').innerText;
  const suggestionText = document.getElementById('suggestion-text').innerText;
  const adviceText = document.getElementById('advice-text').innerText;
  const detailListItems = document.getElementById('list-detail').getElementsByTagName('li');

  let detailListText = '';
  for (let item of detailListItems) {
    detailListText += `- ${item.innerText}\n`;
  }

  const resultText = `
  Hasil BMI: ${resultBmi}\n
  Status: ${resultTitle}\n
  Deskripsi: ${resultDesc}\n
  Saran: ${suggestionText}\n
  Nasehat: ${adviceText}\n
  Risiko Penyakit:\n${detailListText}
`;

  const blob = new Blob([resultText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'hasil_bmi.txt';
  a.click();
  URL.revokeObjectURL(url);
};

// Fungsi untuk mengembalikan tampilan form
const regenerateBMI = () => {
  document.getElementById('home').classList.remove('d-hidden');
  document.getElementById('result').classList.add('d-hidden');
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('download-btn').classList.add('d-hidden');
};
