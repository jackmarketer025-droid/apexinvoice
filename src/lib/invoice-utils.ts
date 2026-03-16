
import { ProductLine } from "@/types/invoice";

export const PREDEFINED_PRODUCTS = [
  { "pid": "10023", "name": "Acorex Syp 100 ml", "generic": "Ambroxol HCl", "strength": "15 mg/5 ml", "packSize": "100 ml", "tpVat": 40.48, "mrp": 46.00 },
  { "pid": "11111", "name": "Adnor-3 Tab", "generic": "Doxepin", "strength": "3 mg", "packSize": "3x10's", "tpVat": 132.08, "mrp": 150.00 },
  { "pid": "19031", "name": "Alafree Susp", "generic": "Fexofenadine HCl", "strength": "30 mg/5 ml", "packSize": "50 ml", "tpVat": 45.76, "mrp": 52.00 },
  { "pid": "19013", "name": "Alafree-120 Tab", "generic": "Fexofenadine HCl", "strength": "120 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "pid": "16514", "name": "Angical-50 Tab", "generic": "Amlodipine Besilate+Atenolol", "strength": "5 mg + 50 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "pid": "14513", "name": "A-One Plus Tab", "generic": "Paracetamol+Caffeine", "strength": "500 mg+65 mg", "packSize": "10x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "pid": "14525", "name": "A-One Susp 60 ml", "generic": "Paracetamol", "strength": "120 mg /5 ml", "packSize": "60 ml", "tpVat": 30.80, "mrp": 35.00 },
  { "pid": "14612", "name": "A-One XR Tab", "generic": "Paracetamol", "strength": "665 mg", "packSize": "10x10's", "tpVat": 176.01, "mrp": 200.00 },
  { "pid": "10323", "name": "Apeclo SR Tab", "generic": "Aceclofenac", "strength": "200 mg", "packSize": "5x10's", "tpVat": 220.01, "mrp": 250.00 },
  { "pid": "10316", "name": "Apeclo Tab", "generic": "Aceclofenac", "strength": "100 mg", "packSize": "10x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "10414", "name": "Aphrin-500 Cap", "generic": "Cephradine", "strength": "500 mg", "packSize": "3x7's", "tpVat": 258.74, "mrp": 294.00 },
  { "pid": "10729", "name": "Apocal-D Tab", "generic": "Calcium+Vit. D3", "strength": "500 mg + 200 IU", "packSize": "15's", "tpVat": 66.04, "mrp": 75.00 },
  { "pid": "10715", "name": "Apocal-D Tab", "generic": "Calcium+Vit. D3", "strength": "500 mg + 200 IU", "packSize": "30's", "tpVat": 132.08, "mrp": 150.00 },
  { "pid": "10614", "name": "Apocal-DM Tab", "generic": "Calcium+Vit. D3+Multimineral", "strength": "-", "packSize": "15's", "tpVat": 66.04, "mrp": 75.00 },
  { "pid": "10624", "name": "Apocal-DM Tab", "generic": "Calcium+Vit. D3+Multimineral", "strength": "-", "packSize": "30's", "tpVat": 132.08, "mrp": 150.00 },
  { "pid": "10833", "name": "Apoxy PFS 100 ml", "generic": "Amoxicillin Trihydrate", "strength": "125 mg/5 ml", "packSize": "100 ml", "tpVat": 61.61, "mrp": 70.00 },
  { "pid": "10826", "name": "Apoxy-500 Cap", "generic": "Amoxicillin Trihydrate", "strength": "500 mg", "packSize": "5x10's", "tpVat": 330.02, "mrp": 375.00 },
  { "pid": "11025", "name": "Aspra-20 Cap", "generic": "Omeprazole", "strength": "20 mg", "packSize": "6x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "11015", "name": "Aspra-40 Cap", "generic": "Omeprazole", "strength": "40 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "pid": "11172", "name": "Azinil PFS 20 ml", "generic": "Azithromycin Dihydrate", "strength": "200 mg/5 ml", "packSize": "20 ml", "tpVat": 79.21, "mrp": 90.00 },
  { "pid": "11142", "name": "Azinil PFS 35 ml", "generic": "Azithromycin Dihydrate", "strength": "200 mg/5 ml", "packSize": "35 ml", "tpVat": 123.21, "mrp": 140.00 },
  { "pid": "11182", "name": "Azinil PFS 50 ml", "generic": "Azithromycin Dihydrate", "strength": "200 mg/5 ml", "packSize": "50 ml", "tpVat": 176.01, "mrp": 200.00 },
  { "pid": "11154", "name": "Azinil-250 Tab", "generic": "Azithromycin Dihydrate", "strength": "250 mg", "packSize": "3x4's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "11167", "name": "Azinil-500 Tab", "generic": "Azithromycin Dihydrate", "strength": "500 mg", "packSize": "3x4's", "tpVat": 422.43, "mrp": 480.00 },
  { "pid": "11213", "name": "Aztrum Gold Tab", "generic": "Multi Vit.+Multimineral", "strength": "-", "packSize": "15's", "tpVat": 118.81, "mrp": 135.00 },
  { "pid": "11225", "name": "Aztrum Gold Tab", "generic": "Multi Vit.+Multimineral", "strength": "-", "packSize": "30's", "tpVat": 237.62, "mrp": 270.00 },
  { "pid": "11315", "name": "Bacspa-10 Tab", "generic": "Baclofen", "strength": "10 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "pid": "34001", "name": "Bilaxe Tab", "generic": "Bilastine", "strength": "20 mg", "packSize": "2x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "11413", "name": "Cepoxid PFS 50 ml", "generic": "Cefpodoxime Proxetil", "strength": "40 mg/5 ml", "packSize": "50 ml", "tpVat": 88.01, "mrp": 100.00 },
  { "pid": "27011", "name": "Clavutil PFS 70 ml", "generic": "Cefuroxime+Clavulanic Acid", "strength": "(125 mg+31.25 mg)/5 ml", "packSize": "70 ml", "tpVat": 250.81, "mrp": 285.00 },
  { "pid": "26014", "name": "Clavutil-250 Tab", "generic": "Cefuroxime+Clavulanic Acid", "strength": "250 mg+62.5 mg", "packSize": "2x7's", "tpVat": 431.23, "mrp": 490.00 },
  { "pid": "26053", "name": "Clavutil-500 Tab", "generic": "Cefuroxime+Clavulanic Acid", "strength": "500 mg+125 mg", "packSize": "1x7's", "tpVat": 338.83, "mrp": 385.00 },
  { "pid": "11511", "name": "Cod Plus Syp 100 ml", "generic": "Multi Vit.+Cod Liver Oil", "strength": "-", "packSize": "100 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "pid": "11521", "name": "Cod Plus Syp 200 ml", "generic": "Multi Vit.+Cod Liver Oil", "strength": "-", "packSize": "200 ml", "tpVat": 127.61, "mrp": 145.00 },
  { "pid": "11611", "name": "Delot Syp", "generic": "Desloratadine", "strength": "2.5 mg/5 ml", "packSize": "60 ml", "tpVat": 22.00, "mrp": 25.00 },
  { "pid": "11621", "name": "Delot Tab", "generic": "Desloratadine", "strength": "5 mg", "packSize": "5x10's", "tpVat": 88.01, "mrp": 100.00 },
  { "pid": "11931", "name": "Eflam-120 Tab", "generic": "Etoricoxib", "strength": "120 mg", "packSize": "2x10's", "tpVat": 246.42, "mrp": 280.00 },
  { "pid": "11912", "name": "Eflam-60 Tab", "generic": "Etoricoxib", "strength": "60 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "pid": "11923", "name": "Eflam-90 Tab", "generic": "Etoricoxib", "strength": "90 mg", "packSize": "3x10's", "tpVat": 316.82, "mrp": 360.00 },
  { "pid": "14142", "name": "Fixgut Susp 60 ml", "generic": "Domperidone Maleate", "strength": "5 mg/5 ml", "packSize": "60 ml", "tpVat": 31.68, "mrp": 36.00 },
  { "pid": "14135", "name": "Fixgut Tab", "generic": "Domperidone Maleate", "strength": "10 mg", "packSize": "10x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "12113", "name": "Flunarin-10 Tab", "generic": "Flunarizine", "strength": "10 mg", "packSize": "3x10's", "tpVat": 132.01, "mrp": 150.00 },
  { "pid": "12123", "name": "Flunarin-5 Tab", "generic": "Flunarizine", "strength": "5 mg", "packSize": "5x10's", "tpVat": 154.01, "mrp": 175.00 },
  { "pid": "13901", "name": "Gavipex Susp 200 ml", "generic": "Na-Alginate+Na-Bicarbonate+Ca-Carbonate", "strength": "(500+267+160)mg/10 ml", "packSize": "200 ml", "tpVat": 220.02, "mrp": 250.00 },
  { "pid": "12314", "name": "Hemostop Cap", "generic": "Tranexamic Acid", "strength": "500 mg", "packSize": "3x10's", "tpVat": 528.04, "mrp": 600.00 },
  { "pid": "10901", "name": "Itrapex 100", "generic": "Itraconazole", "strength": "100 mg", "packSize": "5x4's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "12716", "name": "Kflam Tab", "generic": "Ketorolac Tromethamine", "strength": "10 mg", "packSize": "3x10's", "tpVat": 290.42, "mrp": 330.00 },
  { "pid": "40400", "name": "Klin Antiseptic Sol", "generic": "Chlorhexidine Gluconate+Cetrimide", "strength": "0.3% + 3%", "packSize": "1 L", "tpVat": 193.62, "mrp": 220.00 },
  { "pid": "40401", "name": "Klin Antiseptic Sol", "generic": "Chlorhexidine Gluconate+Cetrimide", "strength": "0.3% + 3%", "packSize": "5 L", "tpVat": 624.85, "mrp": 710.00 },
  { "pid": "40200", "name": "Klinisol Hand Rub 250 ml", "generic": "Chlorhexidine Gluconate+IPA", "strength": "0.5% + 70%", "packSize": "250 ml", "tpVat": 114.42, "mrp": 130.00 },
  { "pid": "40201", "name": "Klinisol Hand Rub 50 ml", "generic": "Chlorhexidine Gluconate+IPA", "strength": "0.5% + 70%", "packSize": "50 ml", "tpVat": 35.21, "mrp": 40.00 },
  { "pid": "12811", "name": "Lequin-500 Tab", "generic": "Levofloxacin Hemihydrate", "strength": "500 mg", "packSize": "5x4's", "tpVat": 176.02, "mrp": 200.00 },
  { "pid": "12933", "name": "Lesal Syp 100 ml", "generic": "Levosalbutamol", "strength": "1 mg/5 ml", "packSize": "100 ml", "tpVat": 35.21, "mrp": 40.00 },
  { "pid": "12944", "name": "Lesal Syp 60 ml", "generic": "Levosalbutamol", "strength": "1 mg/5 ml", "packSize": "60 ml", "tpVat": 28.16, "mrp": 32.00 },
  { "pid": "13133", "name": "Luf PFS 100 ml", "generic": "Flucloxacillin Sodium", "strength": "125 mg/5 ml", "packSize": "100 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "pid": "13116", "name": "Luf-250 Cap", "generic": "Flucloxacillin Sodium", "strength": "250 mg", "packSize": "5x6's", "tpVat": 171.62, "mrp": 195.00 },
  { "pid": "13124", "name": "Luf-500 Cap", "generic": "Flucloxacillin Sodium", "strength": "500 mg", "packSize": "5x6's", "tpVat": 316.82, "mrp": 360.00 },
  { "pid": "13212", "name": "Maxiron Cap", "generic": "Carbonyl Iron+Folic Acid+Vit.B Comp.+Vit.C+Zinc Sulfate", "strength": "-", "packSize": "3x10's", "tpVat": 105.61, "mrp": 120.00 },
  { "pid": "12415", "name": "Mirapex Syp 100 ml", "generic": "Butamirate Citrate", "strength": "7.5 mg/5 ml", "packSize": "100 ml", "tpVat": 70.40, "mrp": 80.00 },
  { "pid": "13315", "name": "Mixit Tab", "generic": "Flupentixol+Melitracen", "strength": "0.5 mg+10 mg", "packSize": "5x10's", "tpVat": 220.01, "mrp": 250.00 },
  { "pid": "13463", "name": "Montelon Kidz Tab", "generic": "Montelukast Sodium", "strength": "4 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "pid": "13442", "name": "Montelon-5 Tab", "generic": "Montelukast Sodium", "strength": "5 mg", "packSize": "3x10's", "tpVat": 237.62, "mrp": 270.00 },
  { "pid": "13426", "name": "Montelon-10 Tab", "generic": "Montelukast Sodium", "strength": "10 mg", "packSize": "3x10's", "tpVat": 422.42, "mrp": 480.00 },
  { "pid": "29102", "name": "Napronex-375/20 Tab", "generic": "Naproxen Sodium+Esomeprazole", "strength": "375 mg + 20 mg", "packSize": "3x10's", "tpVat": 316.83, "mrp": 360.00 },
  { "pid": "29202", "name": "Napronex-500/20 Tab", "generic": "Naproxen Sodium+Esomeprazole", "strength": "500 mg + 20 mg", "packSize": "3x10's", "tpVat": 396.04, "mrp": 450.00 },
  { "pid": "13526", "name": "Nervopex Tab", "generic": "Vit B1 + Vit B6 + Vit B12", "strength": "100mg+200mg+200mcg", "packSize": "5x10's", "tpVat": 396.03, "mrp": 450.00 },
  { "pid": "21014", "name": "Nexe-20 Cap", "generic": "Esomeprazole", "strength": "20 mg", "packSize": "6x10's", "tpVat": 343.23, "mrp": 390.01 },
  { "pid": "13615", "name": "Nexe-20 Tab", "generic": "Esomeprazole", "strength": "20 mg", "packSize": "6x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "21061", "name": "Nexe-40 Cap", "generic": "Esomeprazole", "strength": "40 mg", "packSize": "6x10's", "tpVat": 475.24, "mrp": 540.00 },
  { "pid": "13701", "name": "Nexe MUPS Tab", "generic": "Esomeprazole MUPS", "strength": "20 mg", "packSize": "3x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "20013", "name": "Onamis Tab", "generic": "Ondansetron", "strength": "8 mg", "packSize": "3x10's", "tpVat": 290.42, "mrp": 330.00 },
  { "pid": "14881", "name": "Texit DS PFS 50 ml", "generic": "Cefixime Trihydrate", "strength": "200 mg/5 ml", "packSize": "50 ml", "tpVat": 282.69, "mrp": 321.21 },
  { "pid": "14854", "name": "Texit Junior PD 20 ml", "generic": "Cefixime Trihydrate", "strength": "25 mg/ml", "packSize": "20 ml", "tpVat": 88.01, "mrp": 100.00 },
  { "pid": "14841", "name": "Texit Large PFS 100 ml", "generic": "Cefixime Trihydrate", "strength": "100 mg/5 ml", "packSize": "100 ml", "tpVat": 220.02, "mrp": 250.00 },
  { "pid": "14825", "name": "Texit PFS 50 ml", "generic": "Cefixime Trihydrate", "strength": "100 mg/5 ml", "packSize": "50 ml", "tpVat": 202.41, "mrp": 230.00 },
  { "pid": "14819", "name": "Texit-200 Cap", "generic": "Cefixime Trihydrate", "strength": "200 mg", "packSize": "2x7's", "tpVat": 492.83, "mrp": 560.00 },
  { "pid": "14835", "name": "Texit-400 Cap", "generic": "Cefixime Trihydrate", "strength": "400 mg", "packSize": "1x7's", "tpVat": 338.83, "mrp": 385.00 },
  { "pid": "12211", "name": "Vinca 10 Tab", "generic": "Vonoprazan", "strength": "10 mg", "packSize": "3x10's", "tpVat": 184.81, "mrp": 210.00 },
  { "pid": "12212", "name": "Vinca 20 Tab", "generic": "Vonoprazan", "strength": "20 mg", "packSize": "3x10's", "tpVat": 264.02, "mrp": 300.00 },
  { "pid": "15012", "name": "Visnor Tab", "generic": "Tiemonium Methylsulphate", "strength": "50 mg", "packSize": "5x10's", "tpVat": 220.01, "mrp": 250.00 },
  { "pid": "24011", "name": "Xiva Syp 100 ml", "generic": "Doxofylline", "strength": "100 mg/5 ml", "packSize": "100 ml", "tpVat": 88.00, "mrp": 100.00 },
  { "pid": "24060", "name": "Xiva Syp 60 ml", "generic": "Doxofylline", "strength": "100 mg/5 ml", "packSize": "60 ml", "tpVat": 52.81, "mrp": 60.00 },
  { "pid": "17410", "name": "Xoricard Tab", "generic": "Olmesartan Medoxomil", "strength": "20 mg", "packSize": "3x10's", "tpVat": 211.21, "mrp": 240.00 },
  { "pid": "15452", "name": "Zipol 20 Tab", "generic": "Zinc Sulfate Monohydrate", "strength": "20 mg", "packSize": "5x10's", "tpVat": 110.01, "mrp": 125.00 },
  { "pid": "15481", "name": "Zipol B Tab", "generic": "Zinc Sulfate Monohydrate+Vit.B Complex", "strength": "-", "packSize": "30's", "tpVat": 79.21, "mrp": 90.00 },
  { "pid": "15422", "name": "Zipol Plus Syp 100 ml", "generic": "Zinc Sulfate Monohydrate+Vit.B Complex", "strength": "-", "packSize": "100 ml", "tpVat": 44.00, "mrp": 50.00 },
  { "pid": "15432", "name": "Zipol Syp 100 ml", "generic": "Zinc Sulfate Monohydrate", "strength": "10 mg/5 ml", "packSize": "100 ml", "tpVat": 28.16, "mrp": 32.00 },
  { "pid": "15523", "name": "Zolen-150 Cap", "generic": "Fluconazole", "strength": "150 mg", "packSize": "10's", "tpVat": 176.01, "mrp": 200.00 },
  { "pid": "15512", "name": "Zolen-50 Cap", "generic": "Fluconazole", "strength": "50 mg", "packSize": "5x10's", "tpVat": 352.02, "mrp": 400.00 },
  { "pid": "50052", "name": "Aichek DS Eye Drops", "generic": "Olopatadine HCl 0.2%", "strength": "5 ml", "packSize": "1's", "tpVat": 158.41, "mrp": 180.00 },
  { "pid": "50012", "name": "Alchek Eye Drops", "generic": "Olopatadine HCl 0.1%", "strength": "5 ml", "packSize": "1's", "tpVat": 96.81, "mrp": 110.00 },
  { "pid": "11263", "name": "Aztrum-i Cap", "generic": "Lutein+Vit.C+Vit.E+Zinc+Copper", "strength": "-", "packSize": "32's", "tpVat": 281.62, "mrp": 320.00 },
  { "pid": "51011", "name": "Lequin Eye Drops", "generic": "Levofloxacin HCl 0.5%", "strength": "5 ml", "packSize": "1's", "tpVat": 70.40, "mrp": 80.00 },
  { "pid": "51122", "name": "Lox Eye Drops", "generic": "Ciprofloxacin HCl 0.3%", "strength": "5 ml", "packSize": "1's", "tpVat": 39.60, "mrp": 45.00 },
  { "pid": "51213", "name": "Moxigram Eye Drops", "generic": "Moxifloxacin HCl 0.5%", "strength": "5 ml", "packSize": "1's", "tpVat": 127.61, "mrp": 145.00 },
  { "pid": "51322", "name": "Ocubac Eye Drops", "generic": "Chloramphenicol 0.5%", "strength": "10 ml", "packSize": "1's", "tpVat": 30.36, "mrp": 34.50 },
  { "pid": "51332", "name": "Ocubac-D Eye Drops", "generic": "Chloramphenicol 0.5% + Dexamethasone 0.1%", "strength": "5 ml", "packSize": "1's", "tpVat": 57.21, "mrp": 65.00 },
  { "pid": "51412", "name": "Optafresh Eye Drops", "generic": "Dextran (0.1%) + Hypromellose (0.3%)", "strength": "10 ml", "packSize": "1's", "tpVat": 74.81, "mrp": 85.00 },
  { "pid": "51612", "name": "Polysol Eye Drops", "generic": "Polyethylene Glycol (0.4%) + Propylene Glycol (0.3%)", "strength": "10 ml", "packSize": "1's", "tpVat": 176.02, "mrp": 200.00 },
  { "pid": "11831", "name": "Dix Plus Inj.", "generic": "Diclofenac Sodium+Lidocaine HCl", "strength": "(75 mg + 20 mg)/2 ml", "packSize": "2x5's", "tpVat": 83.61, "mrp": 95.00 },
  { "pid": "15725", "name": "Keptrix 1 g IM Inj.", "generic": "Ceftriaxone Sodium", "strength": "1 g", "packSize": "1's", "tpVat": 132.00, "mrp": 150.00 },
  { "pid": "15715", "name": "Keptrix 1 g IV Inj.", "generic": "Ceftriaxone Sodium", "strength": "1 g", "packSize": "1's", "tpVat": 132.00, "mrp": 150.00 },
  { "pid": "15754", "name": "Keptrix 2 g IV Inj.", "generic": "Ceftriaxone Sodium", "strength": "2 g", "packSize": "1's", "tpVat": 220.02, "mrp": 250.00 },
  { "pid": "15763", "name": "Keptrix 500 mg IM Inj.", "generic": "Ceftriaxone Sodium", "strength": "500 mg", "packSize": "1's", "tpVat": 88.00, "mrp": 100.00 },
  { "pid": "12722", "name": "Kflam-30 IV/IM Inj.", "generic": "Ketorolac Tromethamine", "strength": "30 mg/ml", "packSize": "5x1's", "tpVat": 242.02, "mrp": 275.00 },
  { "pid": "12723", "name": "Kflam-60 IV/IM Inj.", "generic": "Ketorolac Tromethamine", "strength": "60 mg/2 ml", "packSize": "3x1's", "tpVat": 251.82, "mrp": 286.14 },
  { "pid": "15910", "name": "Meropex 500 mg IV Inj.", "generic": "Meropenem Trihydrate", "strength": "500 mg", "packSize": "1's", "tpVat": 616.04, "mrp": 700.00 },
  { "pid": "15900", "name": "Meropex 1 g IV Inj.", "generic": "Meropenem Trihydrate", "strength": "1 g", "packSize": "1's", "tpVat": 1056.08, "mrp": 1200.00 },
  { "pid": "32100", "name": "Nexe 40 IV Inj.", "generic": "Esomeprazole", "strength": "40 mg", "packSize": "1's", "tpVat": 79.21, "mrp": 90.00 },
  { "pid": "15021", "name": "Visnor IV/IM Inj.", "generic": "Tiemonium Methylsulphate", "strength": "5 mg/2 ml", "packSize": "2x5's", "tpVat": 132.02, "mrp": 150.00 },
  { "pid": "15611", "name": "Venopex IV Inj.", "generic": "Iron Sucrose", "strength": "100 mg/5 ml", "packSize": "1's", "tpVat": 286.02, "mrp": 325.00 },
  { "pid": "51251", "name": "Moxigram-D Eye Drops", "generic": "Moxifloxacin+Dexamethasone", "strength": "5 ml", "packSize": "1's", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "22114", "name": "Clonapex 0.5 Tab", "generic": "Clonazepam", "strength": "0.5 mg", "packSize": "Empty", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "23601", "name": "Clonapex-1 Tab", "generic": "Clonazepam", "strength": "1 mg", "packSize": "Empty", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "23113", "name": "Clonapex-2 Tab", "generic": "Clonazepam", "strength": "2 mg", "packSize": "Empty", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "11252", "name": "Aztrum A-Z Tab", "generic": "Multi Vit.+Multimineral", "strength": "-", "packSize": "30's", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "17111", "name": "Coralgen-D Tab", "generic": "Calcium+Vit. D3", "strength": "-", "packSize": "Empty", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "30202", "name": "Legaba-25 Cap", "generic": "Pregabalin", "strength": "25 mg", "packSize": "Empty", "tpVat": 0.00, "mrp": 0.00 },
  { "pid": "30102", "name": "Legaba-50 Cap", "generic": "Pregabalin", "strength": "50 mg", "packSize": "Empty", "tpVat": 0.00, "mrp": 0.00 }
];

export function calculateLineTotals(line: ProductLine) {
  const unitTp = line.unitTp || 0;
  const vatRate = line.vatRate || 17.4;
  const unitDis = line.unitDis || 0;
  const quantity = line.quantity || 0;
  const specialDis = line.specialDis || 0;

  const unitVat = (unitTp * vatRate) / 100;
  const totalTp = unitTp * quantity;
  const totalVat = unitVat * quantity;
  const totalPrice = (quantity * (unitTp + unitVat - unitDis)) - specialDis;

  return {
    unitVat,
    totalTp,
    totalVat,
    totalPrice
  };
}

export function formatCurrency(amount: number): string {
  return (amount || 0).toFixed(2);
}

export function numberToWords(amount: number): string {
  if (amount === 0) return "ZERO TAKA ONLY";
  
  const singleDigits = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
  const teens = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
  const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

  function convert(n: number): string {
    if (n < 10) return singleDigits[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + singleDigits[n % 10] : "");
    if (n < 1000) return singleDigits[Math.floor(n / 100)] + " HUNDRED" + (n % 100 !== 0 ? " AND " + convert(n % 100) : "");
    return "";
  }

  const integerPart = Math.floor(amount);
  const decimalPart = Math.round((amount - integerPart) * 100);

  let result = "";

  if (integerPart >= 10000000) {
    const crore = Math.floor(integerPart / 10000000);
    result += convert(crore) + " CRORE ";
    result += convertPart(integerPart % 10000000);
  } else {
    result += convertPart(integerPart);
  }

  function convertPart(n: number): string {
    let str = "";
    if (n >= 100000) {
      str += convert(Math.floor(n / 100000)) + " LAKH ";
      n %= 100000;
    }
    if (n >= 1000) {
      str += convert(Math.floor(n / 1000)) + " THOUSAND ";
      n %= 1000;
    }
    if (n > 0) {
      str += convert(n);
    }
    return str;
  }

  result = result.trim() + " TAKA";

  if (decimalPart > 0) {
    result += " AND " + convert(decimalPart) + " PAISA";
  }

  return result + " ONLY";
}
