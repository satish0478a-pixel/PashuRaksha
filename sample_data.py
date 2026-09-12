# sample_data.py
"""
PashuRakshak AI - Realistic Seed Data
Aligned with National Animal Disease Control Programme (NADCP)
and Department of Animal Husbandry & Dairying (DAHD), Government of India.
"""

DISEASES_DB = {
    "lumpy_skin_disease": {
        "id": "LSD-01",
        "name": "Lumpy Skin Disease (गांठदार त्वचा रोग)",
        "pathogen": "Capripoxvirus (Poxviridae)",
        "species_affected": ["Cattle", "Water Buffalo"],
        "severity": "High (Highly Contagious)",
        "incubation_days": "4 - 14 days",
        "key_symptoms": [
            "firm_nodules", "high_fever", "enlarged_lymph_nodes", 
            "nasal_discharge", "drop_in_milk", "edema_in_legs"
        ],
        "first_aid": [
            "Immediately isolate the infected animal in a dry, disinfected shed.",
            "Apply 2% potassium permanganate or neem oil & turmeric paste on ruptured skin nodules.",
            "Provide soft, palatable green fodder with jaggery and electrolytes.",
            "Prevent fly and mosquito vectors using smoke or herbal insect repellents (neem leaves)."
        ],
        "isolation_protocol": "Strict quarantine within 3 km core zone. Restrict movement of cattle for 28 days.",
        "vaccine": "Lumpi-ProVacInd / Goat Pox Vaccine (Heterologous)",
        "mortality_rate": "5 - 15% (Morbidity up to 60%)",
        "color": "#ef4444"
    },
    "foot_and_mouth": {
        "id": "FMD-02",
        "name": "Foot and Mouth Disease (खुरपका और मुंहपका - FMD)",
        "pathogen": "Aphthovirus (Picornaviridae - O, A, Asia-1)",
        "species_affected": ["Cattle", "Buffalo", "Sheep", "Goat", "Pig"],
        "severity": "Critical (Epidemic Potential)",
        "incubation_days": "2 - 8 days",
        "key_symptoms": [
            "excessive_salivation", "mouth_blisters", "hoof_lesions", 
            "lameness", "high_fever", "loss_of_appetite"
        ],
        "first_aid": [
            "Wash oral lesions gently with 1% potassium permanganate or 2% sodium bicarbonate solution.",
            "Apply boro-glycerine paste inside the mouth for blister relief.",
            "Keep hooves clean and treat foot ulcers with copper sulfate (1%) or neem oil.",
            "Do not allow the animal to walk on hard, stony surfaces; provide clean soft bedding."
        ],
        "isolation_protocol": "Immediate containment within 5 km radius. Stop all cattle markets and milk transport from affected farm.",
        "vaccine": "FMD Inactivated Trivalent Oil Adjuvant Vaccine",
        "mortality_rate": "2 - 5% in adults, >20% in young calves (due to myocarditis)",
        "color": "#dc2626"
    },
    "bovine_mastitis": {
        "id": "MST-03",
        "name": "Bovine Mastitis (स्तनदाह / थनैला रोग)",
        "pathogen": "Staphylococcus aureus / Streptococcus agalactiae / E. coli",
        "species_affected": ["Cattle", "Buffalo", "Goat"],
        "severity": "Moderate (Severe Economic Loss)",
        "incubation_days": "1 - 3 days",
        "key_symptoms": [
            "udder_swelling", "discolored_milk", "blood_in_milk", 
            "fever", "drop_in_milk", "pain_on_touch"
        ],
        "first_aid": [
            "Strip out all infected milk carefully and bury or disinfect it safely—never discard on barn floor.",
            "Apply cold compresses in acute inflammatory phase followed by warm fomentation.",
            "Use post-milking teat dipping with 0.5% povidone-iodine solution.",
            "Disinfect milking machines and milkers' hands thoroughly before touching other cows."
        ],
        "isolation_protocol": "Milk infected cows last. Sanitize barn bedding daily with lime powder.",
        "vaccine": "Polyvalent Bovine Mastitis Bacterin (Preventive management primary)",
        "mortality_rate": "<2% (Permanent quarter damage up to 40%)",
        "color": "#f59e0b"
    },
    "blackquarter": {
        "id": "BQ-04",
        "name": "Blackquarter / Blackleg (लंगड़ा बुखार - BQ)",
        "pathogen": "Clostridium chauvoei (Spore-forming Anaerobe)",
        "species_affected": ["Cattle", "Sheep", "Buffalo"],
        "severity": "Fatal (Acute Emergency)",
        "incubation_days": "1 - 3 days",
        "key_symptoms": [
            "crepitant_swelling", "high_fever", "severe_lameness", 
            "rapid_breathing", "dark_red_urine", "depression"
        ],
        "first_aid": [
            "Emergency veterinary injection of crystalline penicillin required within hours.",
            "Isolate animal and do not open carcass if death occurs (spores contaminate pasture for decades).",
            "Burn or bury carcass deep (at least 6 feet) with quicklime powder.",
            "Vaccinate all in-contact healthy cattle immediately."
        ],
        "isolation_protocol": "Pasture closure. Avoid grazing on recently flooded or turned pastures.",
        "vaccine": "Blackquarter (BQ) Inactivated Vaccine",
        "mortality_rate": "80 - 95% if untreated",
        "color": "#7f1d1d"
    },
    "haemorrhagic_septicaemia": {
        "id": "HS-05",
        "name": "Haemorrhagic Septicaemia (गलघोंटू - HS)",
        "pathogen": "Pasteurella multocida (Serotype B:2)",
        "species_affected": ["Buffalo", "Cattle"],
        "severity": "Critical (Rapid Mortality)",
        "incubation_days": "1 - 2 days",
        "key_symptoms": [
            "throat_swelling", "respiratory_distress", "high_fever", 
            "frothy_salivation", "tongue_protrusion", "grunting"
        ],
        "first_aid": [
            "Urgent injectable antibiotics (Oxytetracycline or Sulphadimidine) needed immediately.",
            "Keep the head elevated and airway unobstructed.",
            "Keep the animal in a well-ventilated dry area shielded from rain or chilly winds."
        ],
        "isolation_protocol": "Emergency ring-vaccination within 10 km radius during monsoon onset.",
        "vaccine": "Alum Precipitated or Oil Adjuvant HS Vaccine",
        "mortality_rate": "70 - 90% without rapid antibiotic therapy",
        "color": "#b91c1c"
    },
    "bovine_brucellosis": {
        "id": "BRU-06",
        "name": "Brucellosis (संक्रामक गर्भपात - Zoonotic)",
        "pathogen": "Brucella abortus (Gram-negative bacterium)",
        "species_affected": ["Cattle", "Buffalo", "Humans (Zoonosis)"],
        "severity": "High (Public Health Risk)",
        "incubation_days": "2 - 4 weeks",
        "key_symptoms": [
            "late_abortion", "retained_placenta", "hygroma_in_joints", 
            "reduced_milk", "orchitis_in_bulls"
        ],
        "first_aid": [
            "Handle aborted foetus and discharge with rubber gloves; disinfect area with 2% sodium hypochlorite.",
            "Do not consume raw unpasteurized milk from infected animals (risk of human Undulant fever).",
            "Burn or bury aborted membranes with quicklime."
        ],
        "isolation_protocol": "Separate aborted cows for at least 30 days until vaginal discharge ceases.",
        "vaccine": "Brucella abortus Strain 19 or RB51 Vaccine (Calfhood 4-8 months)",
        "mortality_rate": "Low mortality, but causes permanent infertility and sterility",
        "color": "#9333ea"
    }
}

SAMPLE_LIVESTOCK = [
    {
        "tag_id": "IN-984210345120",
        "name": "Gauri (गौरी)",
        "species": "Cow",
        "breed": "Gir (गिर)",
        "age_years": 4.5,
        "weight_kg": 380,
        "owner_name": "Ramesh Patel",
        "village": "Anand, Gujarat",
        "last_vaccine": "FMD Trivalent (14 Mar 2026)",
        "next_vaccine_due": "Lumpi-ProVacInd (20 Oct 2026)",
        "status": "Healthy",
        "milk_liters_day": 14.5,
        "temperature_c": 38.6,
        "rumination_min": 480
    },
    {
        "tag_id": "IN-872190123455",
        "name": "Kallu (कालू)",
        "species": "Buffalo",
        "breed": "Murrah (मुर्राह)",
        "age_years": 5.0,
        "weight_kg": 540,
        "owner_name": "Sukhvinder Singh",
        "village": "Karnal, Haryana",
        "last_vaccine": "HS Alum Precipitated (10 Jan 2026)",
        "next_vaccine_due": "BQ Vaccine (15 Nov 2026)",
        "status": "Monitoring (Elevated Temp)",
        "milk_liters_day": 17.2,
        "temperature_c": 39.8,
        "rumination_min": 310
    },
    {
        "tag_id": "IN-651239871102",
        "name": "Lakshmi (लक्ष्मी)",
        "species": "Cow",
        "breed": "Sahiwal (साहीवाल)",
        "age_years": 3.2,
        "weight_kg": 350,
        "owner_name": "Devendra Yadav",
        "village": "Varanasi, Uttar Pradesh",
        "last_vaccine": "Brucella S19 (05 Aug 2025)",
        "next_vaccine_due": "FMD Booster (25 Sep 2026)",
        "status": "Healthy",
        "milk_liters_day": 12.0,
        "temperature_c": 38.5,
        "rumination_min": 465
    },
    {
        "tag_id": "IN-443218765409",
        "name": "Sundari (सुंदरी)",
        "species": "Cow",
        "breed": "Rathi (राठी)",
        "age_years": 4.0,
        "weight_kg": 365,
        "owner_name": "Bhairav Lal",
        "village": "Bikaner, Rajasthan",
        "last_vaccine": "Lumpi-ProVacInd (12 Dec 2025)",
        "next_vaccine_due": "FMD Trivalent (02 Nov 2026)",
        "status": "Under Treatment (LSD Nodules)",
        "milk_liters_day": 8.5,
        "temperature_c": 40.2,
        "rumination_min": 240
    },
    {
        "tag_id": "IN-552190834211",
        "name": "Bheema (भीमा)",
        "species": "Buffalo",
        "breed": "Jaffarabadi (जाफराबादी)",
        "age_years": 6.0,
        "weight_kg": 620,
        "owner_name": "Govind Mahajan",
        "village": "Pune, Maharashtra",
        "last_vaccine": "FMD Oil Adjuvant (18 Feb 2026)",
        "next_vaccine_due": "HS-BQ Combined (10 Dec 2026)",
        "status": "Healthy",
        "milk_liters_day": 19.0,
        "temperature_c": 38.4,
        "rumination_min": 510
    }
]

SAMPLE_OUTBREAKS = [
    {
        "id": "OB-2026-01",
        "disease_key": "lumpy_skin_disease",
        "disease_name": "Lumpy Skin Disease",
        "state": "Rajasthan",
        "district": "Bikaner",
        "village": "Nokha Block",
        "lat": 27.6015,
        "lng": 73.4241,
        "active_cases": 47,
        "quarantined_animals": 182,
        "mortality": 3,
        "reported_date": "2026-09-06",
        "r0": 2.4,
        "containment_radius_km": 5.0,
        "ring_vaccination_status": "Active (68% complete)",
        "severity": "High"
    },
    {
        "id": "OB-2026-02",
        "disease_key": "foot_and_mouth",
        "disease_name": "Foot and Mouth Disease (FMD)",
        "state": "Haryana",
        "district": "Karnal",
        "village": "Gharaunda Sub-District",
        "lat": 29.5393,
        "lng": 76.9725,
        "active_cases": 29,
        "quarantined_animals": 115,
        "mortality": 1,
        "reported_date": "2026-09-08",
        "r0": 3.1,
        "containment_radius_km": 7.0,
        "ring_vaccination_status": "Initiated (42% complete)",
        "severity": "Critical"
    },
    {
        "id": "OB-2026-03",
        "disease_key": "bovine_mastitis",
        "disease_name": "Sub-clinical & Clinical Mastitis",
        "state": "Gujarat",
        "district": "Anand",
        "village": "Petlad Cooperative Cluster",
        "lat": 22.4735,
        "lng": 72.8028,
        "active_cases": 34,
        "quarantined_animals": 60,
        "mortality": 0,
        "reported_date": "2026-09-04",
        "r0": 1.2,
        "containment_radius_km": 3.0,
        "ring_vaccination_status": "Hygiene & Teat Dip Drive",
        "severity": "Moderate"
    },
    {
        "id": "OB-2026-04",
        "disease_key": "haemorrhagic_septicaemia",
        "disease_name": "Haemorrhagic Septicaemia (HS)",
        "state": "Uttar Pradesh",
        "district": "Varanasi",
        "village": "Pindra Tahsil",
        "lat": 25.4856,
        "lng": 82.8592,
        "active_cases": 18,
        "quarantined_animals": 92,
        "mortality": 4,
        "reported_date": "2026-09-09",
        "r0": 2.2,
        "containment_radius_km": 5.0,
        "ring_vaccination_status": "Emergency Ring Vaccination Active (80%)",
        "severity": "High"
    },
    {
        "id": "OB-2026-05",
        "disease_key": "lumpy_skin_disease",
        "disease_name": "Lumpy Skin Disease",
        "state": "Maharashtra",
        "district": "Pune",
        "village": "Baramati Dairy Belt",
        "lat": 18.1517,
        "lng": 74.5772,
        "active_cases": 23,
        "quarantined_animals": 140,
        "mortality": 2,
        "reported_date": "2026-09-07",
        "r0": 1.9,
        "containment_radius_km": 4.0,
        "ring_vaccination_status": "Ring Vaccination (75% complete)",
        "severity": "Moderate"
    },
    {
        "id": "OB-2026-06",
        "disease_key": "blackquarter",
        "disease_name": "Blackquarter (BQ)",
        "state": "Punjab",
        "district": "Ludhiana",
        "village": "Samrala Block",
        "lat": 30.8354,
        "lng": 76.1912,
        "active_cases": 9,
        "quarantined_animals": 45,
        "mortality": 3,
        "reported_date": "2026-09-10",
        "r0": 1.5,
        "containment_radius_km": 3.0,
        "ring_vaccination_status": "Carcase Disposal Protocol Active",
        "severity": "High"
    }
]

SAMPLE_CASES = [
    {
        "case_id": "CASE-9021",
        "tag_id": "IN-443218765409",
        "animal_name": "Sundari",
        "species": "Cow (Rathi)",
        "farmer_name": "Bhairav Lal",
        "phone": "+91 98290 11234",
        "village": "Nokha, Bikaner, RJ",
        "symptoms": ["firm_nodules", "high_fever", "edema_in_legs"],
        "suspected_disease": "Lumpy Skin Disease",
        "urgency": "Urgent (Red)",
        "ai_confidence": 94.2,
        "reported_time": "2026-09-11 08:30",
        "status": "Pending Vet Review",
        "notes": "Farmer reports skin lumps expanding rapidly across neck and flanks."
    },
    {
        "case_id": "CASE-9022",
        "tag_id": "IN-872190123455",
        "animal_name": "Kallu",
        "species": "Buffalo (Murrah)",
        "farmer_name": "Sukhvinder Singh",
        "phone": "+91 94160 88712",
        "village": "Gharaunda, Karnal, HR",
        "symptoms": ["excessive_salivation", "mouth_blisters", "lameness"],
        "suspected_disease": "Foot and Mouth Disease (FMD)",
        "urgency": "Critical (Red)",
        "ai_confidence": 91.8,
        "reported_time": "2026-09-11 09:15",
        "status": "Prescription Issued",
        "notes": "Oral vesicle ruptured. Animal is limping and unable to graze."
    },
    {
        "case_id": "CASE-9023",
        "tag_id": "IN-984210345120",
        "animal_name": "Gauri",
        "species": "Cow (Gir)",
        "farmer_name": "Ramesh Patel",
        "phone": "+91 98795 33410",
        "village": "Petlad, Anand, GJ",
        "symptoms": ["udder_swelling", "discolored_milk"],
        "suspected_disease": "Bovine Mastitis",
        "urgency": "Moderate (Yellow)",
        "ai_confidence": 88.5,
        "reported_time": "2026-09-10 16:40",
        "status": "Resolved / Recovered",
        "notes": "Right rear quarter swollen with clots in milk strip cup."
    }
]

VACCINE_INVENTORY = [
    {
        "id": "VAC-01",
        "name": "Lumpi-ProVacInd (LSD Vaccine)",
        "allocated_district": "Bikaner, Rajasthan",
        "stock_vials": 14200,
        "target_herd": 20000,
        "coverage_percent": 71.0,
        "cold_chain_temp_c": 4.2,
        "cold_chain_status": "Optimal (2°C - 8°C)",
        "status": "Sufficient"
    },
    {
        "id": "VAC-02",
        "name": "FMD Trivalent Oil Adjuvant (Raksha-Ovac)",
        "allocated_district": "Karnal, Haryana",
        "stock_vials": 5400,
        "target_herd": 18000,
        "coverage_percent": 30.0,
        "cold_chain_temp_c": 5.1,
        "cold_chain_status": "Optimal",
        "status": "Critical - Restock Required"
    },
    {
        "id": "VAC-03",
        "name": "HS & BQ Combined Adjuvant Vaccine",
        "allocated_district": "Varanasi, Uttar Pradesh",
        "stock_vials": 9800,
        "target_herd": 12000,
        "coverage_percent": 81.6,
        "cold_chain_temp_c": 3.8,
        "cold_chain_status": "Optimal",
        "status": "Sufficient"
    },
    {
        "id": "VAC-04",
        "name": "Bruvax (Brucella abortus S19)",
        "allocated_district": "Pune, Maharashtra",
        "stock_vials": 3200,
        "target_herd": 6000,
        "coverage_percent": 53.3,
        "cold_chain_temp_c": 4.0,
        "cold_chain_status": "Optimal",
        "status": "Moderate Stock"
    }
]

STANDARD_DOSAGES = {
    "lumpy_skin_disease": {
        "primary_care": "Supportive Therapy & Secondary Bacterial Infection Prevention",
        "drugs": [
            {"drug": "Meloxicam + Paracetamol (Intramuscular)", "dose": "0.5 mg/kg body weight", "frequency": "Once daily for 3 days"},
            {"drug": "Enrofloxacin 10% Injection", "dose": "5 mg/kg body weight", "frequency": "IM for 3-5 days"},
            {"drug": "Chlorpheniramine Maleate (Antihistaminic)", "dose": "0.5 mg/kg", "frequency": "IM once daily"},
            {"drug": "Topical Iodoform / Zinc Oxide Ointment", "dose": "Apply liberally", "frequency": "Twice daily on lesions"}
        ],
        "dietary": "Oral electral powder with jaggery (50g) and mineral mixture (30g/day)."
    },
    "foot_and_mouth": {
        "primary_care": "Antiseptic Washes & Oral Vesicle Relief",
        "drugs": [
            {"drug": "Potassium Permanganate (1:1000) or 2% Soda Bicarb", "dose": "Oral wash", "frequency": "Thrice daily"},
            {"drug": "Boro-Glycerine solution", "dose": "Topical mouth paint", "frequency": "3 times daily"},
            {"drug": "Flunixin Meglumine (Anti-inflammatory)", "dose": "2.2 mg/kg body weight", "frequency": "IM once daily for 3 days"},
            {"drug": "Long-Acting Oxytetracycline (200 mg/ml)", "dose": "20 mg/kg deep IM", "frequency": "Single dose to prevent secondary wound sepsis"}
        ],
        "dietary": "Soft boiled rice porridge with molasses and soft freshly chopped grass."
    },
    "bovine_mastitis": {
        "primary_care": "Intramammary Infusion & Systemic Anti-infective",
        "drugs": [
            {"drug": "Ceftiofur Sodium or Amoxicillin-Clavulanate", "dose": "Intramammary tube per affected quarter", "frequency": "After complete stripping, twice daily for 3 days"},
            {"drug": "Ketoprofen (NSAID)", "dose": "3 mg/kg body weight", "frequency": "IM once daily for 2 days"},
            {"drug": "Trisodium Citrate oral powder", "dose": "30 g daily", "frequency": "For 5 days to restore udder pH"}
        ],
        "dietary": "Ensure clean, dry bedding with lime dust. Stop wet-hand milking."
    },
    "blackquarter": {
        "primary_care": "High-dose Immediate Antibiotic Intervention",
        "drugs": [
            {"drug": "Procaine Penicillin + Crystalline Penicillin", "dose": "10,000 to 20,000 IU/kg body weight", "frequency": "IM/IV twice daily for 5 days"},
            {"drug": "Oxytetracycline", "dose": "10 mg/kg body weight", "frequency": "IV/IM"},
            {"drug": "Meloxicam", "dose": "0.5 mg/kg", "frequency": "IM daily"}
        ],
        "dietary": "Absolute rest in shade; do not force animal to stand or walk."
    },
    "haemorrhagic_septicaemia": {
        "primary_care": "Emergency Bronchodilator & Antibiotic Therapy",
        "drugs": [
            {"drug": "Sulphadimidine 33.3% Solution", "dose": "100 ml per 100 kg body weight initially", "frequency": "Slow IV, followed by half dose daily"},
            {"drug": "Dexamethasone or Isoflupredone", "dose": "10-20 mg", "frequency": "IM stat for throat edema and respiratory distress"},
            {"drug": "Oxytetracycline Injection", "dose": "10 mg/kg", "frequency": "IM daily"}
        ],
        "dietary": "Keep head elevated; clear nasal froth and keep airways patent."
    }
}
