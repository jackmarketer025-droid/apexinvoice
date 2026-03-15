import { ProductLine } from "@/types/invoice";

export function calculateLineTotals(line: ProductLine) {
  const totalTp = line.unitTp * line.quantity;
  const totalVat = totalTp * (line.vatRate / 100);
  const totalPrice = totalTp + totalVat;
  const unitVat = line.unitTp * (line.vatRate / 100);
  
  return {
    totalTp,
    totalVat,
    totalPrice,
    unitVat
  };
}

export function formatCurrency(amount: number) {
  return amount.toFixed(2);
}

export function numberToWords(amount: number): string {
  const singleDigits = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
  const teens = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
  const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
  const levels = ["", "THOUSAND", "MILLION", "BILLION"];

  if (amount === 0) return "ZERO TAKA ONLY";

  const split = amount.toFixed(2).split(".");
  const wholePart = parseInt(split[0]);
  const decimalPart = parseInt(split[1]);

  function convertGroup(num: number): string {
    let result = "";
    if (num >= 100) {
      result += singleDigits[Math.floor(num / 100)] + " HUNDRED ";
      num %= 100;
    }
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    } else if (num >= 10) {
      result += teens[num - 10] + " ";
      num = 0;
    }
    if (num > 0) {
      result += singleDigits[num] + " ";
    }
    return result.trim();
  }

  let words = "";
  let tempWhole = wholePart;
  let levelIdx = 0;

  while (tempWhole > 0) {
    const group = tempWhole % 1000;
    if (group > 0) {
      const groupWords = convertGroup(group);
      words = groupWords + " " + levels[levelIdx] + " " + words;
    }
    tempWhole = Math.floor(tempWhole / 1000);
    levelIdx++;
  }

  words = "TAKA " + words.trim();

  if (decimalPart > 0) {
    words += " AND " + convertGroup(decimalPart) + " PAISHA ONLY";
  } else {
    words += " ONLY";
  }

  return words.replace(/\s+/g, ' ');
}