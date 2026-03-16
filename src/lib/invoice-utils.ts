import { ProductLine } from "@/types/invoice";

export const PREDEFINED_PRODUCTS = [
  { "si": 1, "productId": "10023", "productName": "Acorex Syrup 100 ml", "genericName": "Ambroxol HCl", "strength": "15 mg/5 ml", "packSize": "100 ml", "tpVat": 40.48, "mrp": 46.00 },
  { "si": 2, "productId": "11111", "productName": "Adnor-3 Tablet", "genericName": "Doxepin", "strength": "3 mg", "packSize": "3x10's", "tpVat": 132.08, "mrp": 150.00 },
  { "si": 3, "productId": "19031", "productName": "Alafree Susp", "genericName": "Fexofenadine HCl", "strength": "30 mg/5 ml", "packSize": "50 ml", "tpVat": 45.76, "mrp": 52.00 },
  { "si": 4, "productId": "19013", "productName": "Alafree-120 Tablet", "genericName": "Fexofenadine HCl", "strength": "120 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "si": 5, "productId": "16514", "productName": "Angical-50 Tablet", "genericName": "Amlodipine + Atenolol", "strength": "5 mg+50 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "si": 6, "productId": "14513", "productName": "A-One Plus Tablet", "genericName": "Paracetamol+Caffeine", "strength": "500 mg+65 mg", "packSize": "10x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "si": 7, "productId": "14525", "productName": "A-One Susp 60 ml", "genericName": "Paracetamol", "strength": "120 mg/5 ml", "packSize": "60 ml", "tpVat": 30.80, "mrp": 35.00 },
  { "si": 8, "productId": "14612", "productName": "A-One XR Tablet", "genericName": "Paracetamol", "strength": "665 mg", "packSize": "10x10's", "tpVat": 176.01, "mrp": 200.00 },
  { "si": 9, "productId": "10323", "productName": "Apeclo SR Tablet", "genericName": "Aceclofenac", "strength": "200 mg", "packSize": "5x10's", "tpVat": 220.01, "mrp": 250.00 },
  { "si": 10, "productId": "10316", "productName": "Apeclo Tablet", "genericName": "Aceclofenac", "strength": "100 mg", "packSize": "10x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 11, "productId": "10414", "productName": "Aphrin-500 Cap", "genericName": "Cephradine", "strength": "500 mg", "packSize": "3x7's", "tpVat": 258.74, "mrp": 294.00 },
  { "si": 12, "productId": "10729", "productName": "Apocal-D Tablet", "genericName": "Calcium+Vit. D3", "strength": "500 mg+200 IU", "packSize": "15's", "tpVat": 66.04, "mrp": 75.00 },
  { "si": 13, "productId": "10715", "productName": "Apocal-D Tablet", "genericName": "Calcium+Vit. D3", "strength": "500 mg+200 IU", "packSize": "30's", "tpVat": 132.08, "mrp": 150.00 },
  { "si": 14, "productId": "10614", "productName": "Apocal-DM Tablet", "genericName": "Calcium+Vit. D3+Mineral", "strength": "-", "packSize": "15's", "tpVat": 66.04, "mrp": 75.00 },
  { "si": 15, "productId": "10624", "productName": "Apocal-DM Tablet", "genericName": "Calcium+Vit. D3+Mineral", "strength": "-", "packSize": "30's", "tpVat": 132.08, "mrp": 150.00 },
  { "si": 16, "productId": "10833", "productName": "Apoxy PFS 100 ml", "genericName": "Amoxicillin Trihydrate", "strength": "125 mg/5 ml", "packSize": "100 ml", "tpVat": 61.61, "mrp": 70.00 },
  { "si": 17, "productId": "10826", "productName": "Apoxy-250 Cap", "genericName": "Amoxicillin Trihydrate", "strength": "250 mg", "packSize": "6x10's", "tpVat": 330.02, "mrp": 375.00 },
  { "si": 18, "productId": "11025", "productName": "Aspra-20 Cap", "genericName": "Omeprazole", "strength": "20 mg", "packSize": "5x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "si": 19, "productId": "11015", "productName": "Aspra-40 Cap", "genericName": "Omeprazole", "strength": "40 mg", "packSize": "3x10's", "tpVat": 79.21, "mrp": 90.00 },
  { "si": 20, "productId": "11172", "productName": "Azinil PFS 20 ml", "genericName": "Azithromycin", "strength": "200 mg/5 ml", "packSize": "20 ml", "tpVat": 123.21, "mrp": 140.00 },
  { "si": 21, "productId": "11142", "productName": "Azinil PFS 35 ml", "genericName": "Azithromycin", "strength": "200 mg/5 ml", "packSize": "35 ml", "tpVat": 176.01, "mrp": 200.00 },
  { "si": 22, "productId": "11182", "productName": "Azinil PFS 50 ml", "genericName": "Azithromycin", "strength": "200 mg/5 ml", "packSize": "50 ml", "tpVat": 176.01, "mrp": 200.00 },
  { "si": 23, "productId": "11154", "productName": "Azinil-250 Tablet", "genericName": "Azithromycin", "strength": "250 mg", "packSize": "1x6's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 24, "productId": "11167", "productName": "Azinil-500 Tablet", "genericName": "Azithromycin", "strength": "500 mg", "packSize": "3x4's", "tpVat": 422.43, "mrp": 480.00 },
  { "si": 25, "productId": "11252", "productName": "Aztrum A-Z Tablet", "genericName": "Multi Vit.+Multimineral", "strength": "-", "packSize": "30's", "tpVat": 118.81, "mrp": 135.00 },
  { "si": 26, "productId": "11225", "productName": "Aztrum Gold Tablet", "genericName": "Multi Vit.+Multimineral", "strength": "-", "packSize": "30's", "tpVat": 237.62, "mrp": 270.00 },
  { "si": 27, "productId": "11315", "productName": "Bacspa-10 Tablet", "genericName": "Baclofen", "strength": "10 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "si": 28, "productId": "34001", "productName": "Bilaxe Tablet 20 mg", "genericName": "Bilastine", "strength": "20 mg", "packSize": "2x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 29, "productId": "11413", "productName": "Cepoxid PFS 50 ml", "genericName": "Cefpodoxime Proxetil", "strength": "40 mg/5 ml", "packSize": "50 ml", "tpVat": 88.01, "mrp": 100.00 },
  { "si": 30, "productId": "27011", "productName": "Clavutil PFS 70 ml", "genericName": "Cefuroxime+Clavulanic", "strength": "125+31.25 mg", "packSize": "70 ml", "tpVat": 250.81, "mrp": 285.00 },
  { "si": 31, "productId": "26014", "productName": "Clavutil-250 Tablet", "genericName": "Cefuroxime+Clavulanic", "strength": "250+62.5 mg", "packSize": "2x7's", "tpVat": 431.23, "mrp": 490.00 },
  { "si": 32, "productId": "26053", "productName": "Clavutil-500 Tablet", "genericName": "Cefuroxime+Clavulanic", "strength": "500+125 mg", "packSize": "1x7's", "tpVat": 338.83, "mrp": 385.00 },
  { "si": 33, "productId": "11511", "productName": "Cod Plus Syrup", "genericName": "Multi Vit.+Cod Liver Oil", "strength": "-", "packSize": "100 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "si": 34, "productId": "11521", "productName": "Cod Plus Syrup", "genericName": "Multi Vit.+Cod Liver Oil", "strength": "-", "packSize": "200 ml", "tpVat": 127.61, "mrp": 145.00 },
  { "si": 35, "productId": "11611", "productName": "Delot Syrup", "genericName": "Desloratadine", "strength": "2.5 mg/5 ml", "packSize": "60 ml", "tpVat": 22.00, "mrp": 25.00 },
  { "si": 36, "productId": "11621", "productName": "Delot Tablet", "genericName": "Desloratadine", "strength": "5 mg", "packSize": "5x10's", "tpVat": 88.01, "mrp": 100.00 },
  { "si": 37, "productId": "11931", "productName": "Eflam-120 Tablet", "genericName": "Etoricoxib", "strength": "120 mg", "packSize": "2x10's", "tpVat": 246.42, "mrp": 280.00 },
  { "si": 38, "productId": "11912", "productName": "Eflam-60 Tablet", "genericName": "Etoricoxib", "strength": "60 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "si": 39, "productId": "11923", "productName": "Eflam-90 Tablet", "genericName": "Etoricoxib", "strength": "90 mg", "packSize": "3x10's", "tpVat": 316.82, "mrp": 360.00 },
  { "si": 40, "productId": "14142", "productName": "Fixgut Syrup 60 ml", "genericName": "Domperidone", "strength": "5 mg/5 ml", "packSize": "60 ml", "tpVat": 31.68, "mrp": 36.00 },
  { "si": 41, "productId": "14135", "productName": "Fixgut Tablet", "genericName": "Domperidone", "strength": "10 mg", "packSize": "10x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 42, "productId": "12113", "productName": "Flunarin-10 Tablet", "genericName": "Flunarizine", "strength": "10 mg", "packSize": "3x10's", "tpVat": 132.01, "mrp": 150.00 },
  { "si": 43, "productId": "12123", "productName": "Flunarin-5 Tablet", "genericName": "Flunarizine", "strength": "5 mg", "packSize": "5x10's", "tpVat": 154.01, "mrp": 175.00 },
  { "si": 44, "productId": "13901", "productName": "Gavipex Susp", "genericName": "Na-Alginate+Na-Bicarb", "strength": "-", "packSize": "200 ml", "tpVat": 220.02, "mrp": 250.00 },
  { "si": 45, "productId": "12314", "productName": "Hemostop Capsule", "genericName": "Tranexamic Acid", "strength": "500 mg", "packSize": "3x10's", "tpVat": 528.04, "mrp": 600.00 },
  { "si": 46, "productId": "10901", "productName": "Itrapex 100", "genericName": "Itraconazole", "strength": "100 mg", "packSize": "5x4's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 47, "productId": "12716", "productName": "Kflam Tablet", "genericName": "Ketorolac", "strength": "10 mg", "packSize": "3x10's", "tpVat": 290.42, "mrp": 330.00 },
  { "si": 48, "productId": "40400", "productName": "Klinisol Antiseptic", "genericName": "Chlorhexidine+Cetrimide", "strength": "0.3%+3%", "packSize": "1 L", "tpVat": 193.62, "mrp": 220.00 },
  { "si": 49, "productId": "40200", "productName": "Klinisol Hand Rub", "genericName": "Chlorhexidine+IPA", "strength": "0.5%+70%", "packSize": "250 ml", "tpVat": 114.42, "mrp": 130.00 },
  { "si": 50, "productId": "40201", "productName": "Klinisol Hand Rub", "genericName": "Chlorhexidine+IPA", "strength": "0.5%+70%", "packSize": "50 ml", "tpVat": 35.21, "mrp": 40.00 },
  { "si": 51, "productId": "12811", "productName": "Lequin-500 Tablet", "genericName": "Levofloxacin", "strength": "500 mg", "packSize": "5x4's", "tpVat": 176.02, "mrp": 200.00 },
  { "si": 52, "productId": "12933", "productName": "Lesal Syrup 100 ml", "genericName": "Levosalbutamol", "strength": "1 mg/5 ml", "packSize": "100 ml", "tpVat": 35.21, "mrp": 40.00 },
  { "si": 53, "productId": "12944", "productName": "Lesal Syrup 60 ml", "genericName": "Levosalbutamol", "strength": "1 mg/5 ml", "packSize": "60 ml", "tpVat": 28.16, "mrp": 32.00 },
  { "si": 54, "productId": "13133", "productName": "Luf PFS 100 ml", "genericName": "Flucloxacillin", "strength": "125 mg/5 ml", "packSize": "100 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "si": 55, "productId": "13116", "productName": "Luf-250 Capsule", "genericName": "Flucloxacillin", "strength": "250 mg", "packSize": "5x6's", "tpVat": 171.62, "mrp": 195.00 },
  { "si": 56, "productId": "13124", "productName": "Luf-500 Capsule", "genericName": "Flucloxacillin", "strength": "500 mg", "packSize": "5x6's", "tpVat": 316.82, "mrp": 360.00 },
  { "si": 57, "productId": "13212", "productName": "Maxiron Capsule", "genericName": "Iron+Folic+Vit+Zinc", "strength": "-", "packSize": "3x10's", "tpVat": 105.61, "mrp": 120.00 },
  { "si": 58, "productId": "12415", "productName": "Mirapex Syrup", "genericName": "Butamirate Citrate", "strength": "7.5 mg/5 ml", "packSize": "100 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "si": 59, "productId": "13315", "productName": "Mixit Tablet", "genericName": "Flupentixol+Melitracen", "strength": "0.5+10 mg", "packSize": "5x10's", "tpVat": 220.01, "mrp": 250.00 },
  { "si": 60, "productId": "13463", "productName": "Montelon Kidz Tablet", "genericName": "Montelukast", "strength": "4 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "si": 61, "productId": "13442", "productName": "Montelon-5 Tablet", "genericName": "Montelukast", "strength": "5 mg", "packSize": "3x10's", "tpVat": 237.62, "mrp": 270.00 },
  { "si": 62, "productId": "13426", "productName": "Montelon-10 Tablet", "genericName": "Montelukast", "strength": "10 mg", "packSize": "3x10's", "tpVat": 422.42, "mrp": 480.00 },
  { "si": 63, "productId": "29102", "productName": "Napronex-375/20", "genericName": "Naproxen+Esomeprazole", "strength": "375+20 mg", "packSize": "3x10's", "tpVat": 316.83, "mrp": 360.00 },
  { "si": 64, "productId": "29202", "productName": "Napronex-500/20", "genericName": "Naproxen+Esomeprazole", "strength": "500+20 mg", "packSize": "3x10's", "tpVat": 396.04, "mrp": 450.00 },
  { "si": 65, "productId": "13526", "productName": "Nervopex Tablet", "genericName": "Vit B1+B6+B12", "strength": "-", "packSize": "5x10's", "tpVat": 396.03, "mrp": 450.00 },
  { "si": 66, "productId": "21014", "productName": "Nexe-20 Capsule", "genericName": "Esomeprazole", "strength": "20 mg", "packSize": "6x10's", "tpVat": 343.23, "mrp": 390.01 },
  { "si": 67, "productId": "13615", "productName": "Nexe-20 Tablet", "genericName": "Esomeprazole", "strength": "20 mg", "packSize": "6x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 68, "productId": "21061", "productName": "Nexe-40 Capsule", "genericName": "Esomeprazole", "strength": "40 mg", "packSize": "6x10's", "tpVat": 475.24, "mrp": 540.00 },
  { "si": 69, "productId": "13701", "productName": "Nexe MUPS Tablet", "genericName": "Esomeprazole MUPS", "strength": "20 mg", "packSize": "3x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 70, "productId": "20013", "productName": "Onamis Tablet", "genericName": "Ondansetron", "strength": "8 mg", "packSize": "3x10's", "tpVat": 290.42, "mrp": 330.00 },
  { "si": 71, "productId": "14881", "productName": "Texit DS PFS 50 ml", "genericName": "Cefixime", "strength": "200 mg/5 ml", "packSize": "50 ml", "tpVat": 282.69, "mrp": 321.21 },
  { "si": 72, "productId": "14854", "productName": "Texit Junior PD", "genericName": "Cefixime", "strength": "25 mg/ml", "packSize": "20 ml", "tpVat": 88.01, "mrp": 100.00 },
  { "si": 73, "productId": "14841", "productName": "Texit Large PFS", "genericName": "Cefixime", "strength": "100 mg/5 ml", "packSize": "100 ml", "tpVat": 220.02, "mrp": 250.00 },
  { "si": 74, "productId": "14825", "productName": "Texit PFS 50 ml", "genericName": "Cefixime", "strength": "100 mg/5 ml", "packSize": "50 ml", "tpVat": 202.41, "mrp": 230.00 },
  { "si": 75, "productId": "14819", "productName": "Texit-200 Capsule", "genericName": "Cefixime", "strength": "200 mg", "packSize": "2x7's", "tpVat": 492.83, "mrp": 560.00 },
  { "si": 76, "productId": "14835", "productName": "Texit-400 Capsule", "genericName": "Cefixime", "strength": "400 mg", "packSize": "1x7's", "tpVat": 338.83, "mrp": 385.00 },
  { "si": 77, "productId": "12211", "productName": "Vinca 10 Tablet", "genericName": "Vonoprazan", "strength": "10 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "si": 78, "productId": "12212", "productName": "Vinca 20 Tablet", "genericName": "Vonoprazan", "strength": "20 mg", "packSize": "3x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "si": 79, "productId": "15012", "productName": "Visnor Tablet", "genericName": "Tiemonium Methylsulfate", "strength": "50 mg", "packSize": "5x10's", "tpVat": 220.01, "mrp": 250.00 },
  { "si": 80, "productId": "24011", "productName": "Xiva Syrup 100 ml", "genericName": "Doxofylline", "strength": "100 mg/5 ml", "packSize": "100 ml", "tpVat": 88.00, "mrp": 100.00 },
  { "si": 81, "productId": "24060", "productName": "Xiva Syrup 60 ml", "genericName": "Doxofylline", "strength": "100 mg/5 ml", "packSize": "60 ml", "tpVat": 52.81, "mrp": 60.00 },
  { "si": 82, "productId": "17410", "productName": "Xoricard Tablet", "genericName": "Olmesartan", "strength": "20 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "si": 83, "productId": "15452", "productName": "Zipol 20 Tablet", "genericName": "Zinc Sulfate", "strength": "20 mg", "packSize": "5x10's", "tpVat": 110.01, "mrp": 125.00 },
  { "si": 84, "productId": "15481", "productName": "Zipol B Tablet", "genericName": "Zinc+Vit. B Complex", "strength": "-", "packSize": "30's", "tpVat": 79.21, "mrp": 90.00 },
  { "si": 85, "productId": "15422", "productName": "Zipol Plus Syrup", "genericName": "Zinc+Vit. B Complex", "strength": "-", "packSize": "100 ml", "tpVat": 44.00, "mrp": 50.00 },
  { "si": 86, "productId": "15432", "productName": "Zipol Syrup 100 ml", "genericName": "Zinc Sulfate", "strength": "10 mg/5 ml", "packSize": "100 ml", "tpVat": 28.16, "mrp": 32.00 },
  { "si": 87, "productId": "15523", "productName": "Zolen-150 Capsule", "genericName": "Fluconazole", "strength": "150 mg", "packSize": "10's", "tpVat": 176.01, "mrp": 200.00 },
  { "si": 88, "productId": "15512", "productName": "Zolen-50 Capsule", "genericName": "Fluconazole", "strength": "50 mg", "packSize": "5x10's", "tpVat": 352.02, "mrp": 400.00 },
  { "si": 89, "productId": "50052", "productName": "Alchek DS Eye Drops", "genericName": "Olopatadine", "strength": "0.2%", "packSize": "5 ml", "tpVat": 158.41, "mrp": 180.00 },
  { "si": 90, "productId": "50012", "productName": "Alchek Eye Drops", "genericName": "Olopatadine", "strength": "0.1%", "packSize": "5 ml", "tpVat": 96.81, "mrp": 110.00 },
  { "si": 91, "productId": "11263", "productName": "Aztrum-i Capsule", "genericName": "Lutein+Vit+Zinc+Cu", "strength": "-", "packSize": "32's", "tpVat": 281.62, "mrp": 320.00 },
  { "si": 92, "productId": "51011", "productName": "Lequin Eye Drops", "genericName": "Levofloxacin", "strength": "0.5%", "packSize": "5 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "si": 93, "productId": "51122", "productName": "Lox Eye Drops", "genericName": "Ciprofloxacin", "strength": "0.3%", "packSize": "5 ml", "tpVat": 39.60, "mrp": 45.00 },
  { "si": 94, "productId": "51213", "productName": "Moxigram Eye Drops", "genericName": "Moxifloxacin", "strength": "0.5%", "packSize": "5 ml", "tpVat": 127.61, "mrp": 145.00 },
  { "si": 95, "productId": "51322", "productName": "Ocubac Eye Drops", "genericName": "Chloramphenicol", "strength": "0.5%", "packSize": "5 ml", "tpVat": 30.36, "mrp": 34.50 },
  { "si": 96, "productId": "51332", "productName": "Ocubac-D Eye Drops", "genericName": "Chloram+Dexa", "strength": "-", "packSize": "5 ml", "tpVat": 57.21, "mrp": 65.00 },
  { "si": 97, "productId": "51412", "productName": "Optafresh Eye Drops", "genericName": "Dextran+Hypromellose", "strength": "-", "packSize": "10 ml", "tpVat": 74.81, "mrp": 85.00 },
  { "si": 98, "productId": "51612", "productName": "Polysol Eye Drops", "genericName": "PEG+Propylene Glycol", "strength": "-", "packSize": "10 ml", "tpVat": 176.02, "mrp": 200.00 },
  { "si": 99, "productId": "15725", "productName": "Keptrix 1 g IM Inj.", "genericName": "Ceftriaxone", "strength": "1 g", "packSize": "1's", "tpVat": 132.00, "mrp": 150.00 }
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
