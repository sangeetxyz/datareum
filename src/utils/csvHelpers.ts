import Fuse from "fuse.js";

export const analyzeObjectList = (
  objList: object[],
): {
  objectCount: number;
  shortestObjectLength: number;
  longestObjectLength: number;
} => {
  let objectCount = 0;
  let longestObjectLength = 0;
  let shortestObjectLength = Infinity;
  let longestObjectIndex;
  let shortestObjectIndex;
  for (const key in objList) {
    if (objList.hasOwnProperty(key)) {
      objectCount++;
      const currentObject = objList[key];
      const currentObjectLength = Object.keys(currentObject).length;
      if (currentObjectLength > longestObjectLength) {
        longestObjectLength = currentObjectLength;
        longestObjectIndex = key;
      }
      if (currentObjectLength < shortestObjectLength) {
        shortestObjectLength = currentObjectLength;
        shortestObjectIndex = key;
      }
    }
  }
  return {
    objectCount,
    shortestObjectLength,
    longestObjectLength,
  };
  console.log(`Number of objects in the main list: ${objectCount}`);
  console.log(
    `Length of the longest object (index ${longestObjectIndex}): ${longestObjectLength}`,
  );
  console.log(
    `Length of the shortest object (index ${shortestObjectIndex}): ${shortestObjectLength}`,
  );
};
export const medicalDataFields: {
  name: string;
  dataType: string;
  allowedValues?: (value: string) => boolean;
}[] = [
  {
    name: "Disease",
    dataType: "string",
  },
  {
    name: "TestsPerformed",
    dataType: "number",
  },
  {
    name: "TimeSpan",
    dataType: "number",
  },
  {
    name: "PreviousDiseases",
    dataType: "string",
  },
  {
    name: "BloodGroup",
    dataType: "string",
    allowedValues: (value: string) =>
      ["A", "B", "AB", "O"].includes(value.toUpperCase()),
  },
  {
    name: "RhFactor",
    dataType: "string",
    allowedValues: (value: string) =>
      ["Positive", "Negative"].includes(
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      ),
  },
  {
    name: "HemoglobinCount",
    dataType: "number",
  },
  {
    name: "OxygenLevel",
    dataType: "number",
  },
  {
    name: "BloodPressure",
    dataType: "string",
  },
  {
    name: "Allergies",
    dataType: "string",
  },
  {
    name: "SugarLevel",
    dataType: "number",
  },
  {
    name: "NumberOfTests",
    dataType: "number",
  },
  {
    name: "Gender",
    dataType: "string",
    allowedValues: (value: string) =>
      ["Male", "Female", "Other"].includes(
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      ),
  },
  {
    name: "PastMedicalConditions",
    dataType: "string",
  },
  {
    name: "Weight",
    dataType: "number",
  },
  {
    name: "Height",
    dataType: "number",
  },
  {
    name: "Bilirubin",
    dataType: "number",
  },
  {
    name: "SodiumPotassiumLevel",
    dataType: "string",
  },
  {
    name: "WBCCount",
    dataType: "number",
  },
  {
    name: "PlateletCount",
    dataType: "number",
  },
  {
    name: "RBCCount",
    dataType: "number",
  },
  {
    name: "Cholesterol",
    dataType: "number",
  },
  {
    name: "LeukocytesCount",
    dataType: "number",
  },
  {
    name: "SurgicalHistory",
    dataType: "string",
  },
  {
    name: "FamilyMedicalHistory",
    dataType: "string",
  },
  {
    name: "Medicines",
    dataType: "string",
  },
  {
    name: "RespiratoryRate",
    dataType: "number",
  },
  {
    name: "Temperature",
    dataType: "number",
  },
  {
    name: "HeartRate",
    dataType: "number",
  },
];
export const isInvalidString = (value: string): boolean => {
  return !/[a-zA-Z/]/.test(value);
};
export const isInvalidNumber = (value: string): boolean => {
  return !/^\d+$/.test(value);
};
export const processCsvData = (csvData: object[]): object[] => {
  const fuse = new Fuse(medicalDataFields, {
    threshold: 0.5,
    keys: ["name"],
  });
  const processedData = csvData
    .map((row: any) => {
      const processedRow: any = {};
      Object.keys(row).forEach((columnName: string) => {
        const result = fuse.search(columnName);
        if (result.length > 0 && result[0].item) {
          const mainAttribute = result[0].item.name;
          const csvValue = row[columnName];
          const expectedAttribute = medicalDataFields.find(
            (attribute) => attribute.name === mainAttribute,
          );
          if (expectedAttribute) {
            const expectedDataType: any = expectedAttribute.dataType;
            if (typeof expectedDataType === "string") {
              if (
                (expectedDataType === "string" &&
                  typeof csvValue === "string" &&
                  csvValue.trim() !== "" &&
                  !isInvalidString(csvValue)) ||
                (expectedDataType === "number" && !isInvalidNumber(csvValue))
              ) {
                if (
                  expectedAttribute.allowedValues &&
                  !expectedAttribute.allowedValues(csvValue)
                ) {
                  return;
                }
                processedRow[mainAttribute] = csvValue;
              }
            } else if (typeof expectedDataType === "function") {
              if (expectedDataType(csvValue)) {
                processedRow[mainAttribute] = csvValue;
              }
            }
          }
        }
      });
      return processedRow;
    })
    .filter((row) => Object.keys(row).length > 0);
  return processedData;
};
export const calculateColumnCounts = (
  rawObjects: object[],
  parsedObjects: object[],
): { name: string; rawColumns: number; parsedColumns: number }[] => {
  const result: { name: string; rawColumns: number; parsedColumns: number }[] =
    [];

  for (let i = 0; i < rawObjects.length && i < parsedObjects.length; i++) {
    const rawObject: any = rawObjects[i];
    const parsedObject: any = parsedObjects[i];

    // Initialize counters for rawColumns and parsedColumns
    let rawColumns = 0;
    let parsedColumns = 0;

    // Count attributes with non-empty string values
    for (const key in rawObject) {
      if (rawObject.hasOwnProperty(key) && rawObject[key] !== "") {
        rawColumns++;
      }
    }

    for (const key in parsedObject) {
      if (parsedObject.hasOwnProperty(key) && parsedObject[key] !== "") {
        parsedColumns++;
      }
    }

    // Add the result to the array
    result.push({ name: (i + 1).toString(), rawColumns, parsedColumns });
  }

  return result;
};

export function countAttributes(
  obj: object[],
): { name: string; attributeCount: number }[] {
  const result: { name: string; attributeCount: number }[] = [];

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const innerObject = obj[key];
      const attributeCount = Object.keys(innerObject).length;
      result.push({ name: key, attributeCount });
    }
  }

  return result;
}
