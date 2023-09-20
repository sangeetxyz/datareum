import { createObjectCsvWriter as createCsvWriter } from "csv-writer";

// Define the original column names
const originalColumnNames = [
  "Disea",
  "Testsrformed",
  "meSpan",
  "PreviousDiseases",
  "BloodGroup",
  "RhFactor",
  "laura",
  "Gender",
  "OxygenLevel",
  "BloodPressure",
  "Allergies",
  "SugarLevel",
  "NumberOfTests",
  "PastMedicalConditions",
  "Weight",
  "Height",
  "Bilirubin",
  "SodiumPotassiumLevel",
  "WBCCount",
  "PlateletCount",
  "RBCCount",
  "Cholesterol",
  "LeukocytesCount",
  "SurgicalHistory",
  "FamilyMedicalHistory",
  "Medicines",
  "RespiratoryRate",
  "Temperature",
  "HeartRate",
];

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random disease name
function generateRandomDisease() {
  const diseases = [
    "Flu",
    "Common Cold",
    "Allergies",
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Bronchitis",
    "Migraine",
    "Arthritis",
    "Pneumonia",
  ];

  const randomIndex = getRandomInt(0, diseases.length - 1);
  return diseases[randomIndex];
}

// Function to generate a random blood group
function generateRandomBloodGroup() {
  const bloodGroups = ["A", "B", "AB", "O"];
  const randomIndex = getRandomInt(0, bloodGroups.length - 1);
  return bloodGroups[randomIndex];
}

// Function to generate a random Rh factor
function generateRandomRhFactor() {
  return ["Positive", "Negative"][getRandomInt(0, 1)];
}

// Function to generate random blood pressure
function generateRandomBloodPressure() {
  return `${getRandomInt(90, 140)}/${getRandomInt(60, 90)}`;
}

// Function to generate random gender
function generateRandomGender() {
  const genders = ["Male", "Female"];
  return genders[getRandomInt(0, 1)];
}

// Function to generate random sodium potassium level
function generateRandomSodiumPotassiumLevel() {
  return `${getRandomInt(135, 145)}/${(Math.random() * (5 - 3.5) + 3.5).toFixed(
    2,
  )}`;
}

// Function to generate mock data for a single row with potential errors
function generateMockRowWithErrors(error) {
  // Shuffle the column names to introduce random misspellings
  const shuffledColumnNames = shuffleArray(originalColumnNames);

  const rowData = {};

  // Introduce errors in column names and values based on the error percentage
  for (let i = 0; i < originalColumnNames.length; i++) {
    const originalColumnName = originalColumnNames[i];
    const shuffledColumnName = shuffledColumnNames[i];

    // Determine if there should be an error for this column
    const shouldHaveError = Math.random() < error / 100;

    if (shouldHaveError) {
      // Simulate an error in the column name
      rowData[shuffledColumnName] = generateRandomDisease(); // Use an incorrect value
    } else {
      // Use the correct column name and generate a valid value
      rowData[originalColumnName] = generateValidValue(originalColumnName);
    }
  }
  return rowData;
}

// Function to generate a valid value based on the column name
function generateValidValue(columnName) {
  switch (columnName) {
    case "Disea":
      return generateRandomDisease();
    case "Testsrformed":
    case "meSpan":
      return getRandomInt(1, 30);
    case "PreviousDiseases":
    case "Allergies":
    case "PastMedicalConditions":
    case "SurgicalHistory":
    case "FamilyMedicalHistory":
    case "Medicines":
      return generateRandomDisease();
    case "BloodGroup":
      return generateRandomBloodGroup();
    case "RhFactor":
      return generateRandomRhFactor();
    case "laura":
      return getRandomInt(10, 18);
    case "Gender":
      return generateRandomGender();
    case "OxygenLevel":
      return getRandomInt(90, 100);
    case "BloodPressure":
      return generateRandomBloodPressure();
    case "SugarLevel":
      return getRandomInt(70, 140);
    case "NumberOfTests":
      return getRandomInt(1, 5);
    case "Weight":
      return getRandomInt(0, 100);
    case "Height":
      return getRandomInt(150, 190);
    case "Bilirubin":
      return getRandomInt(0, 2);
    case "SodiumPotassiumLevel":
      return generateRandomSodiumPotassiumLevel();
    case "WBCCount":
      return getRandomInt(4000, 11000);
    case "PlateletCount":
      return getRandomInt(150000, 450000);
    case "RBCCount":
      return getRandomInt(4, 6);
    case "Cholesterol":
      return getRandomInt(120, 220);
    case "LeukocytesCount":
      return getRandomInt(4000, 11000);
    case "RespiratoryRate":
      return getRandomInt(12, 20);
    case "Temperature":
      return getRandomInt(96, 101);
    case "HeartRate":
      return getRandomInt(60, 100);
    default:
      return "InvalidValue";
  }
}

// Generate and write the CSV file with errors
const errorPercentage = 50; // Adjust the error percentage as needed
const csvWriter = createCsvWriter({
  path: "mock_data_with_errors.csv",
  header: [
    ...originalColumnNames.map((columnName) => ({
      id: columnName,
      title: columnName,
    })),
  ],
});

const records = [];

for (let i = 0; i < 500; i++) {
  records.push(generateMockRowWithErrors(errorPercentage));
}

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log(
      `CSV file with ${errorPercentage}% errors generated successfully.`,
    );
  })
  .catch((error) => {
    console.error("Error generating CSV:", error);
  });
