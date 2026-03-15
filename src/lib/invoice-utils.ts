import { ProductLine } from "@/types/invoice";

export const PREDEFINED_PRODUCTS = [
  { "id": "10023", "name": "Acorex Syp 100 ml", "packSize": "100 ml", "unitTp": 34.48, "vatRate": 17.4 },
  { "id": "11111", "name": "Adnor-3 Tab", "packSize": "3x10's", "unitTp": 112.50, "vatRate": 17.4 },
  { "id": "19031", "name": "Alafree Susp", "packSize": "50 ml", "unitTp": 38.98, "vatRate": 17.4 },
  { "id": "19013", "name": "Alafree-120 Tab", "packSize": "3x10's", "unitTp": 179.91, "vatRate": 17.4 },
  { "id": "16514", "name": "Angical-50 Tab", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "14513", "name": "A-One Plus Tab", "packSize": "10x10's", "unitTp": 179.91, "vatRate": 17.4 },
  { "id": "14525", "name": "A-One Susp 60 ml", "packSize": "60 ml", "unitTp": 26.23, "vatRate": 17.4 },
  { "id": "14612", "name": "A-One XR Tab", "packSize": "10x10's", "unitTp": 149.92, "vatRate": 17.4 },
  { "id": "10323", "name": "Apeclo SR Tab", "packSize": "10x10's", "unitTp": 224.89, "vatRate": 17.4 },
  { "id": "10413", "name": "Apexone-250 Cap", "packSize": "10's", "unitTp": 134.93, "vatRate": 17.4 },
  { "id": "10423", "name": "Apexone-500 Cap", "packSize": "10's", "unitTp": 262.37, "vatRate": 17.4 },
  { "id": "10433", "name": "Apexone-DS Susp", "packSize": "50 ml", "unitTp": 59.97, "vatRate": 17.4 },
  { "id": "10729", "name": "Apocal-D Tab", "packSize": "15's", "unitTp": 47.91, "vatRate": 17.4 },
  { "id": "10123", "name": "Aproxin-250 Tab", "packSize": "3x10's", "unitTp": 134.93, "vatRate": 17.4 },
  { "id": "10133", "name": "Aproxin-500 Tab", "packSize": "3x10's", "unitTp": 224.89, "vatRate": 17.4 },
  { "id": "10143", "name": "Aproxin-DS Susp", "packSize": "50 ml", "unitTp": 37.49, "vatRate": 17.4 },
  { "id": "10231", "name": "Astha-4 Tab", "packSize": "3x10's", "unitTp": 44.97, "vatRate": 17.4 },
  { "id": "10212", "name": "Astha-L Syp 100 ml", "packSize": "100 ml", "unitTp": 37.49, "vatRate": 17.4 },
  { "id": "10222", "name": "Astha-L Syp 50 ml", "packSize": "50 ml", "unitTp": 22.49, "vatRate": 17.4 },
  { "id": "11242", "name": "Aztra-500 Tab", "packSize": "2x6's", "unitTp": 314.85, "vatRate": 17.4 },
  { "id": "11252", "name": "Aztra-PFS", "packSize": "30 ml", "unitTp": 93.71, "vatRate": 17.4 },
  { "id": "11413", "name": "Baclo-10 Tab", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "11422", "name": "Baclo-25 Tab", "packSize": "2x10's", "unitTp": 187.41, "vatRate": 17.4 },
  { "id": "11431", "name": "Baclo-5 Tab", "packSize": "3x10's", "unitTp": 89.96, "vatRate": 17.4 },
  { "id": "11512", "name": "Ben-A Cap", "packSize": "3x10's", "unitTp": 67.46, "vatRate": 17.4 },
  { "id": "11721", "name": "Biz-2.5 Tab", "packSize": "3x10's", "unitTp": 89.96, "vatRate": 17.4 },
  { "id": "11711", "name": "Biz-5 Tab", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "11913", "name": "Calsi-D Tab", "packSize": "30's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "11922", "name": "Calsi-D DX Tab", "packSize": "30's", "unitTp": 179.91, "vatRate": 17.4 },
  { "id": "12023", "name": "Cef-3 200 Cap", "packSize": "12's", "unitTp": 251.87, "vatRate": 17.4 },
  { "id": "12013", "name": "Cef-3 400 Cap", "packSize": "14's", "unitTp": 524.74, "vatRate": 17.4 },
  { "id": "12042", "name": "Cef-3 Forte Susp", "packSize": "50 ml", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "12033", "name": "Cef-3 Susp 30 ml", "packSize": "30 ml", "unitTp": 89.96, "vatRate": 17.4 },
  { "id": "12034", "name": "Cef-3 Susp 50 ml", "packSize": "50 ml", "unitTp": 134.93, "vatRate": 17.4 },
  { "id": "12123", "name": "Ceph-250 Cap", "packSize": "12's", "unitTp": 107.95, "vatRate": 17.4 },
  { "id": "12113", "name": "Ceph-500 Cap", "packSize": "24's", "unitTp": 431.79, "vatRate": 17.4 },
  { "id": "12132", "name": "Ceph-PFS 100 ml", "packSize": "100 ml", "unitTp": 112.44, "vatRate": 17.4 },
  { "id": "12513", "name": "Cip-500 Tab", "packSize": "3x10's", "unitTp": 269.87, "vatRate": 17.4 },
  { "id": "12522", "name": "Cip-PFS", "packSize": "60 ml", "unitTp": 63.72, "vatRate": 17.4 },
  { "id": "22114", "name": "Clonapex 0.5 Tab", "packSize": "50's", "unitTp": 207.52, "vatRate": 17.4 },
  { "id": "22123", "name": "Clonapex 1 Tab", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "22131", "name": "Clonapex 2 Tab", "packSize": "3x10's", "unitTp": 224.89, "vatRate": 17.4 },
  { "id": "11621", "name": "Delot Tab", "packSize": "50's", "unitTp": 63.86, "vatRate": 17.4 },
  { "id": "11632", "name": "Delot-D Syp 50 ml", "packSize": "50 ml", "unitTp": 37.49, "vatRate": 17.4 },
  { "id": "13114", "name": "Dexa Tab", "packSize": "100x10's", "unitTp": 374.81, "vatRate": 17.4 },
  { "id": "13125", "name": "Dexa-20 Inj", "packSize": "1's", "unitTp": 14.99, "vatRate": 17.4 },
  { "id": "13214", "name": "Diclo-100 SR Tab", "packSize": "10x10's", "unitTp": 299.85, "vatRate": 17.4 },
  { "id": "13224", "name": "Diclo-50 Ent Tab", "packSize": "10x10's", "unitTp": 149.92, "vatRate": 17.4 },
  { "id": "13235", "name": "Diclo-Inj 3 ml", "packSize": "5's", "unitTp": 44.97, "vatRate": 17.4 },
  { "id": "13813", "name": "E-400 Cap", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "13912", "name": "Enoc-20 Inj", "packSize": "1's", "unitTp": 187.41, "vatRate": 17.4 },
  { "id": "13922", "name": "Enoc-40 Inj", "packSize": "1's", "unitTp": 299.85, "vatRate": 17.4 },
  { "id": "13932", "name": "Enoc-60 Inj", "packSize": "1's", "unitTp": 374.81, "vatRate": 17.4 },
  { "id": "14013", "name": "Esom-20 Cap", "packSize": "5x10's", "unitTp": 187.38, "vatRate": 17.4 },
  { "id": "14023", "name": "Esom-40 Cap", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "14032", "name": "Esom-40 IV Inj", "packSize": "1's", "unitTp": 52.47, "vatRate": 17.4 },
  { "id": "14122", "name": "Fixgut 200 Tab", "packSize": "10's", "unitTp": 224.89, "vatRate": 17.4 },
  { "id": "14112", "name": "Fixgut 400 Tab", "packSize": "10's", "unitTp": 374.81, "vatRate": 17.4 },
  { "id": "14135", "name": "Fixgut Tab", "packSize": "100's", "unitTp": 191.56, "vatRate": 17.4 },
  { "id": "14213", "name": "Fluniz 5 Tab", "packSize": "3x10's", "unitTp": 89.96, "vatRate": 17.4 },
  { "id": "14223", "name": "Fluniz-10 Tab", "packSize": "3x10's", "unitTp": 134.93, "vatRate": 17.4 },
  { "id": "12911", "name": "Lequin 500 Tab", "packSize": "20's", "unitTp": 127.71, "vatRate": 17.4 },
  { "id": "12921", "name": "Lequin 750 Tab", "packSize": "10's", "unitTp": 89.96, "vatRate": 17.4 },
  { "id": "12932", "name": "Lequin IV Infu", "packSize": "100 ml", "unitTp": 112.44, "vatRate": 17.4 },
  { "id": "13323", "name": "L-set-5 Tab", "packSize": "3x10's", "unitTp": 112.50, "vatRate": 17.4 },
  { "id": "13332", "name": "L-set-Syp", "packSize": "60 ml", "unitTp": 37.49, "vatRate": 17.4 },
  { "id": "13463", "name": "Montelon Kidz Tab", "packSize": "30's", "unitTp": 134.09, "vatRate": 17.4 },
  { "id": "13426", "name": "Montelon-10 Tab", "packSize": "30's", "unitTp": 306.49, "vatRate": 17.4 },
  { "id": "13413", "name": "Montelon-4 Tab", "packSize": "3x10's", "unitTp": 134.93, "vatRate": 17.4 },
  { "id": "13423", "name": "Montelon-5 Tab", "packSize": "3x10's", "unitTp": 179.91, "vatRate": 17.4 },
  { "id": "13701", "name": "Nexe MUPS Tab", "packSize": "30's", "unitTp": 191.56, "vatRate": 17.4 },
  { "id": "13712", "name": "Nexe-20 Cap", "packSize": "5x10's", "unitTp": 187.38, "vatRate": 17.4 },
  { "id": "13722", "name": "Nexe-40 Cap", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "13732", "name": "Nexe-40 IV Inj", "packSize": "1's", "unitTp": 52.47, "vatRate": 17.4 },
  { "id": "14413", "name": "On-4 Tab", "packSize": "3x10's", "unitTp": 89.96, "vatRate": 17.4 },
  { "id": "14422", "name": "On-Inj 2 ml", "packSize": "1's", "unitTp": 26.23, "vatRate": 17.4 },
  { "id": "14432", "name": "On-Soln 50 ml", "packSize": "50 ml", "unitTp": 44.97, "vatRate": 17.4 },
  { "id": "24153", "name": "Rabegend-20 Cap", "packSize": "100's", "unitTp": 510.82, "vatRate": 17.4 },
  { "id": "24112", "name": "Rabegend-20 IV", "packSize": "1's", "unitTp": 52.47, "vatRate": 17.4 },
  { "id": "14825", "name": "Texit PFS 50 ml", "packSize": "50 ml", "unitTp": 146.86, "vatRate": 17.4 },
  { "id": "14813", "name": "Texit-500 Tab", "packSize": "12's", "unitTp": 314.85, "vatRate": 17.4 },
  { "id": "14923", "name": "Tri-D Tab", "packSize": "30's", "unitTp": 224.89, "vatRate": 17.4 },
  { "id": "14913", "name": "Tri-G Tab", "packSize": "3x10's", "unitTp": 157.42, "vatRate": 17.4 },
  { "id": "15114", "name": "V-C 500 Tab", "packSize": "10x10's", "unitTp": 112.50, "vatRate": 17.4 },
  { "id": "25060", "name": "Xiva-200 Tab", "packSize": "30's", "unitTp": 114.94, "vatRate": 17.4 },
  { "id": "15312", "name": "Xiva-PFS 30 ml", "packSize": "30 ml", "unitTp": 93.71, "vatRate": 17.4 },
  { "id": "15322", "name": "Xiva-PFS 50 ml", "packSize": "50 ml", "unitTp": 149.92, "vatRate": 17.4 },
  { "id": "15481", "name": "Zipol-B Tab", "packSize": "30's", "unitTp": 57.47, "vatRate": 17.4 },
  { "id": "50022", "name": "Alchek DS Eye Drops", "packSize": "1's", "unitTp": 134.93, "vatRate": 17.4 },
  { "id": "50012", "name": "Alchek Eye Drops", "packSize": "1's", "unitTp": 82.46, "vatRate": 17.4 },
  { "id": "11263", "name": "Aztrum-i Cap", "packSize": "32's", "unitTp": 239.88, "vatRate": 17.4 },
  { "id": "51011", "name": "Lequin Eye Drops", "packSize": "1's", "unitTp": 59.97, "vatRate": 17.4 },
  { "id": "51122", "name": "Lox Eye Drops", "packSize": "1's", "unitTp": 33.73, "vatRate": 17.4 },
  { "id": "51213", "name": "Moxigram Eye Drops", "packSize": "1's", "unitTp": 108.70, "vatRate": 17.4 },
  { "id": "51322", "name": "Ocubac Eye Drops", "packSize": "1's", "unitTp": 25.86, "vatRate": 17.4 },
  { "id": "51332", "name": "Ocubac-D Eye Drops", "packSize": "1's", "unitTp": 48.73, "vatRate": 17.4 },
  { "id": "51412", "name": "Optafresh Eye Drops", "packSize": "1's", "unitTp": 63.72, "vatRate": 17.4 },
  { "id": "51612", "name": "Polysol Eye Drops", "packSize": "1's", "unitTp": 104.95, "vatRate": 17.4 },
  { "id": "51711", "name": "Tobrac Eye Drops", "packSize": "1's", "unitTp": 41.23, "vatRate": 17.4 }
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
