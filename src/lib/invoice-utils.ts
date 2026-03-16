import { ProductLine } from "@/types/invoice";

export const PREDEFINED_PRODUCTS = [
  { "id": "10023", "name": "Acorex Syrup 100 ml", "packSize": "100 ml", "tpVat": 40.48 },
  { "id": "11111", "name": "Adnor-3 Tablet", "packSize": "3x10's", "tpVat": 132.08 },
  { "id": "19031", "name": "Alafree Susp", "packSize": "50 ml", "tpVat": 45.76 },
  { "id": "19013", "name": "Alafree-120 Tablet", "packSize": "3x10's", "tpVat": 211.21 },
  { "id": "16514", "name": "Angical-50 Tablet", "packSize": "3x10's", "tpVat": 184.81 },
  { "id": "14513", "name": "A-One Plus Tablet", "packSize": "10x10's", "tpVat": 211.21 },
  { "id": "14525", "name": "A-One Susp 60 ml", "packSize": "60 ml", "tpVat": 30.80 },
  { "id": "14612", "name": "A-One XR Tablet", "packSize": "10x10's", "tpVat": 176.01 },
  { "id": "10323", "name": "Apeclo SR Tablet", "packSize": "5x10's", "tpVat": 220.01 },
  { "id": "10316", "name": "Apeclo Tablet", "packSize": "10x10's", "tpVat": 264.02 },
  { "id": "10414", "name": "Aphrin-500 Cap", "packSize": "3x7's", "tpVat": 258.74 },
  { "id": "10729", "name": "Apocal-D Tablet", "packSize": "15's", "tpVat": 66.04 },
  { "id": "10715", "name": "Apocal-D Tablet", "packSize": "30's", "tpVat": 132.08 },
  { "id": "10614", "name": "Apocal-DM Tablet", "packSize": "15's", "tpVat": 66.04 },
  { "id": "10624", "name": "Apocal-DM Tablet", "packSize": "30's", "tpVat": 132.08 },
  { "id": "10833", "name": "Apoxy PFS 100 ml", "packSize": "100 ml", "tpVat": 61.61 },
  { "id": "10826", "name": "Apoxy-250 Cap", "packSize": "6x10's", "tpVat": 330.02 },
  { "id": "11025", "name": "Aspra-20 Cap", "packSize": "5x10's", "tpVat": 211.21 },
  { "id": "11015", "name": "Aspra-40 Cap", "packSize": "3x10's", "tpVat": 79.21 },
  { "id": "11172", "name": "Azinil PFS 20 ml", "packSize": "20 ml", "tpVat": 123.21 },
  { "id": "11142", "name": "Azinil PFS 35 ml", "packSize": "35 ml", "tpVat": 176.01 },
  { "id": "11182", "name": "Azinil PFS 50 ml", "packSize": "50 ml", "tpVat": 176.01 },
  { "id": "11154", "name": "Azinil-250 Tablet", "packSize": "1x6's", "tpVat": 264.02 },
  { "id": "11167", "name": "Azinil-500 Tablet", "packSize": "3x4's", "tpVat": 422.43 },
  { "id": "11252", "name": "Aztrum A-Z Tablet", "packSize": "30's", "tpVat": 118.81 },
  { "id": "11225", "name": "Aztrum Gold Tablet", "packSize": "30's", "tpVat": 237.62 },
  { "id": "11315", "name": "Bacspa-10 Tablet", "packSize": "3x10's", "tpVat": 211.21 },
  { "id": "34001", "name": "Bilaxe Tablet 20 mg", "packSize": "2x10's", "tpVat": 264.02 },
  { "id": "11413", "name": "Cepoxid PFS 50 ml", "packSize": "50 ml", "tpVat": 88.01 },
  { "id": "27011", "name": "Clavutil PFS 70 ml", "packSize": "70 ml", "tpVat": 250.81 },
  { "id": "26014", "name": "Clavutil-250 Tablet", "packSize": "2x7's", "tpVat": 431.23 },
  { "id": "26053", "name": "Clavutil-500 Tablet", "packSize": "1x7's", "tpVat": 338.83 },
  { "id": "11511", "name": "Cod Plus Syrup", "packSize": "100 ml", "tpVat": 70.40 },
  { "id": "11521", "name": "Cod Plus Syrup", "packSize": "200 ml", "tpVat": 127.61 },
  { "id": "11611", "name": "Delot Syrup", "packSize": "60 ml", "tpVat": 22.00 },
  { "id": "11621", "name": "Delot Tablet", "packSize": "5x10's", "tpVat": 88.01 },
  { "id": "11931", "name": "Eflam-120 Tablet", "packSize": "2x10's", "tpVat": 246.42 },
  { "id": "11912", "name": "Eflam-60 Tablet", "packSize": "3x10's", "tpVat": 184.81 },
  { "id": "11923", "name": "Eflam-90 Tablet", "packSize": "3x10's", "tpVat": 316.82 },
  { "id": "14142", "name": "Fixgut Syrup 60 ml", "packSize": "60 ml", "tpVat": 31.68 },
  { "id": "14135", "name": "Fixgut Tablet", "packSize": "10x10's", "tpVat": 264.02 },
  { "id": "12113", "name": "Flunarin-10 Tablet", "packSize": "3x10's", "tpVat": 132.01 },
  { "id": "12123", "name": "Flunarin-5 Tablet", "packSize": "5x10's", "tpVat": 154.01 },
  { "id": "13901", "name": "Gavipex Susp", "packSize": "200 ml", "tpVat": 220.02 },
  { "id": "12314", "name": "Hemostop Capsule", "packSize": "3x10's", "tpVat": 528.04 },
  { "id": "10901", "name": "Itrapex 100", "packSize": "5x4's", "tpVat": 264.02 },
  { "id": "12716", "name": "Kflam Tablet", "packSize": "3x10's", "tpVat": 290.42 },
  { "id": "40400", "name": "Klinisol Antiseptic", "packSize": "1 L", "tpVat": 193.62 },
  { "id": "40200", "name": "Klinisol Hand Rub", "packSize": "250 ml", "tpVat": 114.42 },
  { "id": "40201", "name": "Klinisol Hand Rub", "packSize": "50 ml", "tpVat": 35.21 },
  { "id": "12811", "name": "Lequin-500 Tablet", "packSize": "5x4's", "tpVat": 176.02 },
  { "id": "12933", "name": "Lesal Syrup 100 ml", "packSize": "100 ml", "tpVat": 35.21 },
  { "id": "12944", "name": "Lesal Syrup 60 ml", "packSize": "60 ml", "tpVat": 28.16 },
  { "id": "13133", "name": "Luf PFS 100 ml", "packSize": "100 ml", "tpVat": 70.40 },
  { "id": "13116", "name": "Luf-250 Capsule", "packSize": "5x6's", "tpVat": 171.62 },
  { "id": "13124", "name": "Luf-500 Capsule", "packSize": "5x6's", "tpVat": 316.82 },
  { "id": "13212", "name": "Maxiron Capsule", "packSize": "3x10's", "tpVat": 105.61 },
  { "id": "12415", "name": "Mirapex Syrup", "packSize": "100 ml", "tpVat": 70.40 },
  { "id": "13315", "name": "Mixit Tablet", "packSize": "5x10's", "tpVat": 220.01 },
  { "id": "13463", "name": "Montelon Kidz Tablet", "packSize": "3x10's", "tpVat": 184.81 },
  { "id": "13442", "name": "Montelon-5 Tablet", "packSize": "3x10's", "tpVat": 237.62 },
  { "id": "13426", "name": "Montelon-10 Tablet", "packSize": "3x10's", "tpVat": 422.42 },
  { "id": "29102", "name": "Napronex-375/20", "packSize": "3x10's", "tpVat": 316.83 },
  { "id": "29202", "name": "Napronex-500/20", "packSize": "3x10's", "tpVat": 396.04 },
  { "id": "13526", "name": "Nervopex Tablet", "packSize": "5x10's", "tpVat": 396.03 },
  { "id": "21014", "name": "Nexe-20 Capsule", "packSize": "6x10's", "tpVat": 343.23 },
  { "id": "13615", "name": "Nexe-20 Tablet", "packSize": "6x10's", "tpVat": 264.02 },
  { "id": "21061", "name": "Nexe-40 Capsule", "packSize": "6x10's", "tpVat": 475.24 },
  { "id": "13701", "name": "Nexe MUPS Tablet", "packSize": "3x10's", "tpVat": 264.02 },
  { "id": "20013", "name": "Onamis Tablet", "packSize": "3x10's", "tpVat": 290.42 },
  { "id": "14881", "name": "Texit DS PFS 50 ml", "packSize": "50 ml", "tpVat": 282.69 },
  { "id": "14854", "name": "Texit Junior PD", "packSize": "20 ml", "tpVat": 88.01 },
  { "id": "14841", "name": "Texit Large PFS", "packSize": "100 ml", "tpVat": 220.02 },
  { "id": "14825", "name": "Texit PFS 50 ml", "packSize": "50 ml", "tpVat": 202.41 },
  { "id": "14819", "name": "Texit-200 Capsule", "packSize": "2x7's", "tpVat": 492.83 },
  { "id": "14835", "name": "Texit-400 Capsule", "packSize": "1x7's", "tpVat": 338.83 },
  { "id": "12211", "name": "Vinca 10 Tablet", "packSize": "3x10's", "tpVat": 184.81 },
  { "id": "12212", "name": "Vinca 20 Tablet", "packSize": "3x10's", "tpVat": 264.02 },
  { "id": "15012", "name": "Visnor Tablet", "packSize": "5x10's", "tpVat": 220.01 },
  { "id": "24011", "name": "Xiva Syrup 100 ml", "packSize": "100 ml", "tpVat": 88.00 },
  { "id": "24060", "name": "Xiva Syrup 60 ml", "packSize": "60 ml", "tpVat": 52.81 },
  { "id": "17410", "name": "Xoricard Tablet", "packSize": "3x10's", "tpVat": 211.21 },
  { "id": "15452", "name": "Zipol 20 Tablet", "packSize": "5x10's", "tpVat": 110.01 },
  { "id": "15481", "name": "Zipol B Tablet", "packSize": "30's", "tpVat": 79.21 },
  { "id": "15422", "name": "Zipol Plus Syrup", "packSize": "100 ml", "tpVat": 44.00 },
  { "id": "15432", "name": "Zipol Syrup 100 ml", "packSize": "100 ml", "tpVat": 28.16 },
  { "id": "15523", "name": "Zolen-150 Capsule", "packSize": "10's", "tpVat": 176.01 },
  { "id": "15512", "name": "Zolen-50 Capsule", "packSize": "5x10's", "tpVat": 352.02 },
  { "id": "50052", "name": "Alchek DS Eye Drops", "packSize": "5 ml", "tpVat": 158.41 },
  { "id": "50012", "name": "Alchek Eye Drops", "packSize": "5 ml", "tpVat": 96.81 },
  { "id": "11263", "name": "Aztrum-i Capsule", "packSize": "32's", "tpVat": 281.62 },
  { "id": "51011", "name": "Lequin Eye Drops", "packSize": "5 ml", "tpVat": 70.40 },
  { "id": "51122", "name": "Lox Eye Drops", "packSize": "5 ml", "tpVat": 39.60 },
  { "id": "51213", "name": "Moxigram Eye Drops", "packSize": "5 ml", "tpVat": 127.61 },
  { "id": "51322", "name": "Ocubac Eye Drops", "packSize": "5 ml", "tpVat": 30.36 },
  { "id": "51332", "name": "Ocubac-D Eye Drops", "packSize": "5 ml", "tpVat": 57.21 },
  { "id": "51412", "name": "Optafresh Eye Drops", "packSize": "10 ml", "tpVat": 74.81 },
  { "id": "51612", "name": "Polysol Eye Drops", "packSize": "10 ml", "tpVat": 176.02 },
  { "id": "15725", "name": "Keptrix 1 g IM Inj.", "packSize": "1's", "tpVat": 132.00 }
];

export function calculateLineTotals(line: ProductLine) {
  const unitTp = Number(line.unitTp) || 0;
  const vatRate = Number(line.vatRate) || 0;
  const unitDis = Number(line.unitDis) || 0;
  const qty = Number(line.quantity) || 0;
  const specialDis = Number(line.specialDis) || 0;

  const unitVat = (unitTp * vatRate) / 100;
  const totalTp = unitTp * qty;
  const totalVat = unitVat * qty;
  const totalUnitDis = unitDis * qty;
  
  const totalPrice = totalTp + totalVat - totalUnitDis - specialDis;

  return {
    unitVat,
    totalTp,
    totalVat,
    totalUnitDis,
    totalPrice
  };
}

export function formatCurrency(amount: any) {
  const val = Number(amount);
  if (isNaN(val)) return "0.00";
  return val.toFixed(2);
}

export function numberToWords(amount: number): string {
  const singleDigits = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
  const teens = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
  const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
  const levels = ["", "THOUSAND", "MILLION", "BILLION"];

  const num = Number(amount) || 0;
  if (num === 0) return "ZERO TAKA ONLY";

  const split = num.toFixed(2).split(".");
  const wholePart = parseInt(split[0]);
  const decimalPart = parseInt(split[1]);

  function convertGroup(n: number): string {
    let result = "";
    if (n >= 100) {
      result += singleDigits[Math.floor(n / 100)] + " HUNDRED ";
      n %= 100;
    }
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + " ";
      n = 0;
    }
    if (n > 0) {
      result += singleDigits[n] + " ";
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
      words = groupWords + " " + (levels[levelIdx] || "") + " " + words;
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
