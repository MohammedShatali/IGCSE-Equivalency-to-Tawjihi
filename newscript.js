// A*-U conversion
const conversion = {
  "A*": 100,
  "A": 95,
  "B": 85,
  "C": 75,
  "D": 65,
  "E": 55,
  "U": 0
};

// Oxford 1–9 conversion
const conversionOxford = {
  "9": 100,
  "8": 98,
  "7": 95,
  "6": 90,
  "5": 85,
  "4": 75,
  "3": 65,
  "2": 55,
  "1": 40
};

// Change placeholder when board changes
document.getElementById("board").addEventListener("change", function () {

  const selectedBoard = this.value;
  const igcseInputs = document.querySelectorAll("#igcse-grades .grade");

  igcseInputs.forEach((input, index) => {
    if (selectedBoard === "Oxford") {
      input.placeholder = `Grade ${index + 1} (1-9)`;
    } else {
      input.placeholder = `Grade ${index + 1} (A*-U)`;
    }
  });

});

function calculate() {

  const selectedBoard = document.getElementById("board").value;

  const igcseInputs = document.querySelectorAll(".grade");
  const ialInputs = document.querySelectorAll(".ial");

  const igcseGrades = [];
  const ialGrades = [];

  // Choose correct conversion table
  const activeConversion = selectedBoard === "Oxford"
    ? conversionOxford
    : conversion;

  // IGCSE grades
  igcseInputs.forEach(input => {
    const grade = input.value.trim().toUpperCase();
    if (activeConversion[grade] !== undefined) {
      igcseGrades.push(activeConversion[grade]);
    }
  });

  // IAL (always A*-U system)
  ialInputs.forEach(input => {
    const grade = input.value.trim().toUpperCase();
    if (conversion[grade] !== undefined) {
      ialGrades.push(conversion[grade]);
    }
  });

  if (igcseGrades.length === 0 || ialGrades.length === 0) {
    document.getElementById("result").innerText =
      "Please fill in your grades correctly.";
    return;
  }

  const igcseAvg =
    igcseGrades.reduce((a, b) => a + b, 0) / igcseGrades.length;

  const ialAvg =
    ialGrades.reduce((a, b) => a + b, 0) / ialGrades.length;

  const finalEquivalency =
    (igcseAvg * 0.75) + (ialAvg * 0.25);

  document.getElementById("result").innerText =
    `Your Grade is: ${finalEquivalency.toFixed(2)}%`;
}