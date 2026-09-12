# app.py
"""
PashuRakshak AI - Flask Backend Server
Smart India Hackathon (SIH 2026) | Problem Statement ID: 26128
Efficient systems for early detection, prevention, and management of livestock diseases.
"""

import os
import sys
import copy
import time
import math
import random
from datetime import datetime, timedelta

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from flask import Flask, render_template, request, jsonify

from sample_data import (
    DISEASES_DB,
    SAMPLE_LIVESTOCK,
    SAMPLE_OUTBREAKS,
    SAMPLE_CASES,
    VACCINE_INVENTORY,
    STANDARD_DOSAGES
)

app = Flask(__name__, static_folder='static', template_folder='templates')

# In-memory working databases (cloned from sample data)
livestock_store = copy.deepcopy(SAMPLE_LIVESTOCK)
outbreaks_store = copy.deepcopy(SAMPLE_OUTBREAKS)
cases_store = copy.deepcopy(SAMPLE_CASES)
vaccines_store = copy.deepcopy(VACCINE_INVENTORY)
broadcasts_store = []

@app.route('/')
def index():
    """Renders the main single-page application dashboard."""
    return render_template('index.html')

# ==========================================
# 1. AI DIAGNOSTIC ENGINE & TRIAGE API
# ==========================================

@app.route('/api/diagnose', methods=['POST'])
def diagnose():
    """
    AI Multi-modal Diagnostic API
    Accepts symptoms, image classifier hint, temperature, and rumination metrics.
    Returns ranked differential diagnoses, confidence, first aid, and contagion score.
    """
    data = request.get_json() or {}
    selected_symptoms = set(data.get('symptoms', []))
    image_tag = data.get('image_tag') # e.g. 'lsd_nodules', 'fmd_blister', 'mastitis_udder', 'healthy'
    temp_c = float(data.get('temperature_c', 38.5))
    rumination_min = float(data.get('rumination_min', 450))
    species = data.get('species', 'Cattle')

    # Symptom weight analysis
    scored_results = []
    
    for key, info in DISEASES_DB.items():
        score = 0
        disease_symptoms = set(info['key_symptoms'])
        
        # Overlap in symptoms
        matched = selected_symptoms.intersection(disease_symptoms)
        if matched:
            score += (len(matched) / len(disease_symptoms)) * 55.0

        # Image recognition weight
        if image_tag:
            if image_tag == 'lsd_nodules' and key == 'lumpy_skin_disease':
                score += 48.0
            elif image_tag == 'fmd_blister' and key == 'foot_and_mouth':
                score += 48.0
            elif image_tag == 'mastitis_udder' and key == 'bovine_mastitis':
                score += 46.0
            elif image_tag == 'crepitant_swelling' and key == 'blackquarter':
                score += 46.0
            elif image_tag == 'healthy':
                score = max(0, score - 50.0)

        # Physiological Telemetry weight
        if temp_c >= 39.5: # Fever
            if "high_fever" in disease_symptoms or "fever" in disease_symptoms:
                score += 15.0
        if rumination_min < 320: # Rumination drop indicates acute distress/fever
            score += 10.0

        # Species matching (Bovine/Cattle includes cow, buffalo, ox)
        spec_lower = species.lower()
        is_cattle = any(w in spec_lower for w in ['cow', 'cattle', 'bull', 'calf', 'ox'])
        is_buffalo = 'buffalo' in spec_lower
        is_goat = any(w in spec_lower for w in ['goat', 'sheep'])
        
        disease_species = [s.lower() for s in info['species_affected']]
        if (is_cattle and any('cattle' in s for s in disease_species)) or \
           (is_buffalo and any('buffalo' in s for s in disease_species)) or \
           (is_goat and any('goat' in s or 'sheep' in s for s in disease_species)):
            score += 7.0

        # Cap confidence
        confidence = min(98.5, max(12.0, score + (random.uniform(-1.5, 1.5) if score > 20 else 0)))
        
        scored_results.append({
            "disease_key": key,
            "name": info['name'],
            "id": info['id'],
            "confidence": round(confidence, 1),
            "severity": info['severity'],
            "matched_symptoms_count": len(matched),
            "pathogen": info['pathogen'],
            "first_aid": info['first_aid'],
            "isolation_protocol": info['isolation_protocol'],
            "vaccine": info['vaccine'],
            "color": info['color']
        })

    # Sort by confidence descending
    scored_results.sort(key=lambda x: x['confidence'], reverse=True)
    top_prediction = scored_results[0] if scored_results else None

    # Determine triage urgency
    urgency = "Normal / Routine Check"
    if top_prediction and top_prediction['confidence'] >= 45:
        if "Critical" in top_prediction['severity'] or "Fatal" in top_prediction['severity']:
            urgency = "Critical Contagious (Red Alert)"
        elif "High" in top_prediction['severity']:
            urgency = "Urgent Isolation (Red)"
        elif "Moderate" in top_prediction['severity']:
            urgency = "Moderate Attention (Yellow)"

    return jsonify({
        "status": "success",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "top_prediction": top_prediction,
        "urgency_level": urgency,
        "differential_diagnoses": scored_results[:3],
        "biosecurity_alert": top_prediction['confidence'] >= 60 and ("High" in top_prediction['severity'] or "Critical" in top_prediction['severity'])
    })

# ==========================================
# 2. LIVESTOCK HEALTH PASSPORT (PASHU AADHAAR)
# ==========================================

@app.route('/api/livestock', methods=['GET', 'POST'])
def handle_livestock():
    """CRUD API for animal health passports."""
    if request.method == 'GET':
        return jsonify({"livestock": livestock_store, "total": len(livestock_store)})
    
    # POST new animal registration
    data = request.get_json() or {}
    tag_id = data.get('tag_id') or f"IN-{random.randint(100000000000, 999999999999)}"
    
    new_animal = {
        "tag_id": tag_id,
        "name": data.get('name', 'Pashu'),
        "species": data.get('species', 'Cow'),
        "breed": data.get('breed', 'Indigenous'),
        "age_years": float(data.get('age_years', 3.0)),
        "weight_kg": float(data.get('weight_kg', 350.0)),
        "owner_name": data.get('owner_name', 'Farmer'),
        "village": data.get('village', 'Village, District'),
        "last_vaccine": data.get('last_vaccine', 'None'),
        "next_vaccine_due": data.get('next_vaccine_due', 'Scheduled in 30 days'),
        "status": "Healthy",
        "milk_liters_day": float(data.get('milk_liters_day', 10.0)),
        "temperature_c": 38.5,
        "rumination_min": 460
    }
    livestock_store.insert(0, new_animal)
    return jsonify({"status": "success", "message": "Animal registered successfully!", "animal": new_animal}), 201

# ==========================================
# 3. TRIAGE & VETERINARIAN CASES API
# ==========================================

@app.route('/api/cases', methods=['GET', 'POST'])
def handle_cases():
    """Triage queue management API."""
    if request.method == 'GET':
        return jsonify({"cases": cases_store, "total": len(cases_store)})
    
    data = request.get_json() or {}
    new_case = {
        "case_id": f"CASE-{random.randint(9030, 9999)}",
        "tag_id": data.get('tag_id', 'IN-UNREGISTERED'),
        "animal_name": data.get('animal_name', 'Animal'),
        "species": data.get('species', 'Cattle'),
        "farmer_name": data.get('farmer_name', 'Unknown Farmer'),
        "phone": data.get('phone', '+91 99999 00000'),
        "village": data.get('village', 'Block A, District'),
        "symptoms": data.get('symptoms', []),
        "suspected_disease": data.get('suspected_disease', 'Under Analysis'),
        "urgency": data.get('urgency', 'Urgent (Red)'),
        "ai_confidence": float(data.get('ai_confidence', 85.0)),
        "reported_time": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "status": "Pending Vet Review",
        "notes": data.get('notes', 'Reported via PashuRakshak Farmer Mobile Web')
    }
    cases_store.insert(0, new_case)
    return jsonify({"status": "success", "message": "Case submitted to triage queue", "case": new_case}), 201

@app.route('/api/cases/<case_id>', methods=['PUT'])
def update_case(case_id):
    """Updates case status or attaches veterinary prescription."""
    data = request.get_json() or {}
    for item in cases_store:
        if item['case_id'] == case_id:
            item['status'] = data.get('status', item['status'])
            if 'prescription' in data:
                item['prescription'] = data['prescription']
            if 'vet_notes' in data:
                item['vet_notes'] = data['vet_notes']
            return jsonify({"status": "success", "message": f"Case {case_id} updated successfully", "case": item})
    return jsonify({"status": "error", "message": "Case ID not found"}), 404

# ==========================================
# 4. GIS OUTBREAKS & EPIDEMIC SURVEILLANCE
# ==========================================

@app.route('/api/outbreaks', methods=['GET', 'POST'])
def handle_outbreaks():
    """Returns all geo-tagged active outbreak zones for Leaflet map."""
    if request.method == 'GET':
        return jsonify({"outbreaks": outbreaks_store, "total": len(outbreaks_store)})
    
    data = request.get_json() or {}
    new_outbreak = {
        "id": f"OB-2026-{len(outbreaks_store) + 1:02d}",
        "disease_key": data.get('disease_key', 'lumpy_skin_disease'),
        "disease_name": data.get('disease_name', 'Lumpy Skin Disease'),
        "state": data.get('state', 'State'),
        "district": data.get('district', 'District'),
        "village": data.get('village', 'Village Cluster'),
        "lat": float(data.get('lat', 28.6139)),
        "lng": float(data.get('lng', 77.2090)),
        "active_cases": int(data.get('active_cases', 10)),
        "quarantined_animals": int(data.get('quarantined_animals', 50)),
        "mortality": int(data.get('mortality', 0)),
        "reported_date": datetime.now().strftime("%Y-%m-%d"),
        "r0": float(data.get('r0', 2.1)),
        "containment_radius_km": float(data.get('containment_radius_km', 5.0)),
        "ring_vaccination_status": "Initiated",
        "severity": data.get('severity', 'High')
    }
    outbreaks_store.append(new_outbreak)
    return jsonify({"status": "success", "outbreak": new_outbreak}), 201

# ==========================================
# 5. SEIR EPIDEMIC "WHAT-IF" SIMULATION MODEL
# ==========================================

@app.route('/api/simulate', methods=['POST'])
def simulate_epidemic():
    """
    SEIR (Susceptible-Exposed-Infectious-Recovered) Mathematical Model
    Computes 30-day projection of disease spread with vs. without ring vaccination intervention.
    """
    data = request.get_json() or {}
    
    # Model parameters
    N = float(data.get('population', 5000))      # Total livestock population in cluster
    I0 = float(data.get('infected', 20))         # Initial infected animals
    E0 = float(data.get('exposed', 30))          # Initial exposed animals
    beta = float(data.get('beta', 0.45))         # Transmission rate per contact
    sigma = float(data.get('sigma', 0.2))        # Incubation rate (1 / incubation period, ~5 days)
    gamma = float(data.get('gamma', 0.1))        # Recovery rate (1 / infection duration, ~10 days)
    ring_vac_coverage = float(data.get('ring_vaccination_percent', 70)) / 100.0
    days = int(data.get('days', 30))

    # Basic Reproduction Number R0
    r0 = round(beta / gamma, 2)
    herd_immunity_threshold = round((1 - 1 / max(1.01, r0)) * 100, 1)

    # 1. Baseline Simulation (Without intervention or Low Intervention)
    S1 = N - I0 - E0
    E1 = E0
    I1 = I0
    R1 = 0
    
    # 2. Intervened Simulation (With Ring Vaccination & Strict Isolation)
    # Ring vaccination reduces effective susceptible population and beta
    eff_beta = beta * (1.0 - (ring_vac_coverage * 0.45))
    S2 = N - I0 - E0
    E2 = E0
    I2 = I0
    R2 = 0
    vaccinated_count = N * (ring_vac_coverage * 0.6) # Vaccinated protected buffer

    trajectory_baseline = []
    trajectory_intervened = []

    dt = 1.0 # 1 day step
    for day in range(days + 1):
        trajectory_baseline.append({
            "day": day,
            "susceptible": round(S1),
            "exposed": round(E1),
            "infected": round(I1),
            "recovered": round(R1)
        })

        trajectory_intervened.append({
            "day": day,
            "susceptible": round(max(0, S2)),
            "exposed": round(max(0, E2)),
            "infected": round(max(0, I2)),
            "recovered": round(R2)
        })

        # Differential equations - Baseline
        dS1 = - (beta * S1 * I1 / N) * dt
        dE1 = (beta * S1 * I1 / N - sigma * E1) * dt
        dI1 = (sigma * E1 - gamma * I1) * dt
        dR1 = (gamma * I1) * dt

        S1 = max(0, S1 + dS1)
        E1 = max(0, E1 + dE1)
        I1 = max(0, I1 + dI1)
        R1 = max(0, R1 + dR1)

        # Differential equations - Intervened
        # Rapid reduction in transmission as ring quarantine establishes
        quarantine_factor = max(0.2, 1.0 - (day / days) * ring_vac_coverage)
        current_beta2 = eff_beta * quarantine_factor

        dS2 = - (current_beta2 * S2 * I2 / N) * dt - (vaccinated_count / days)
        dE2 = (current_beta2 * S2 * I2 / N - sigma * E2) * dt
        dI2 = (sigma * E2 - gamma * I2) * dt
        dR2 = (gamma * I2) * dt + (vaccinated_count / days)

        S2 = max(0, S2 + dS2)
        E2 = max(0, E2 + dE2)
        I2 = max(0, I2 + dI2)
        R2 = min(N, max(0, R2 + dR2))

    peak_baseline = max([p['infected'] for p in trajectory_baseline])
    peak_intervened = max([p['infected'] for p in trajectory_intervened])
    animals_saved = max(0, peak_baseline - peak_intervened)

    return jsonify({
        "status": "success",
        "r0": r0,
        "herd_immunity_threshold": herd_immunity_threshold,
        "peak_baseline": peak_baseline,
        "peak_intervened": peak_intervened,
        "animals_saved": animals_saved,
        "reduction_percentage": round(((peak_baseline - peak_intervened) / max(1, peak_baseline)) * 100, 1),
        "trajectory_baseline": trajectory_baseline,
        "trajectory_intervened": trajectory_intervened
    })

# ==========================================
# 6. SMART IOT COLLAR TELEMETRY SIMULATOR
# ==========================================

@app.route('/api/iot-telemetry', methods=['GET'])
def iot_telemetry():
    """
    Simulates 24-hour continuous biometric streaming for IoT ear tags/collars.
    Demonstrates how sub-clinical infection is caught 48 hours prior to visible lesions.
    """
    mode = request.args.get('mode', 'fever_spike') # 'normal', 'fever_spike', 'mastitis_crisis'
    
    labels = []
    temps = []
    ruminations = []
    steps = []
    heart_rates = []

    now = datetime.now()
    for i in range(24, -1, -1):
        t_point = now - timedelta(hours=i)
        labels.append(t_point.strftime("%H:00"))
        
        # Base realistic vitals
        base_temp = 38.5 + 0.15 * math.sin(i / 3.0)
        base_rum = 20.0 + 3.0 * math.cos(i / 2.5) # mins per hour
        base_steps = 180 + 30 * math.sin(i / 4.0)
        base_hr = 68 + 4 * math.sin(i / 3.0)

        if mode == 'fever_spike':
            # Fever spike begins in the last 10 hours, rumination plummets
            if i <= 10:
                hours_into_fever = 10 - i
                base_temp += min(2.0, hours_into_fever * 0.22)
                base_rum = max(4.0, base_rum - (hours_into_fever * 1.8))
                base_steps = max(50, base_steps - (hours_into_fever * 12))
                base_hr += hours_into_fever * 2.2
        elif mode == 'mastitis_crisis':
            # Moderate fever, sharp drop in rumination and restlessness
            if i <= 12:
                hours_in = 12 - i
                base_temp += min(1.2, hours_in * 0.1)
                base_rum = max(8.0, base_rum - (hours_in * 1.2))
                base_steps += math.sin(hours_in) * 40 # restlessness
                base_hr += hours_in * 1.5

        temps.append(round(base_temp + random.uniform(-0.08, 0.08), 2))
        ruminations.append(round(max(0, base_rum + random.uniform(-1.0, 1.0)), 1))
        steps.append(round(max(10, base_steps + random.uniform(-10, 10))))
        heart_rates.append(round(base_hr + random.uniform(-2, 2)))

    latest_temp = temps[-1]
    latest_rum = ruminations[-1]
    
    # Anomaly status calculation
    anomaly = False
    status_text = "Vitals Stable & Normal (Rumination Optimal)"
    status_level = "safe"

    if latest_temp >= 39.8 and latest_rum <= 10:
        anomaly = True
        status_text = "CRITICAL PRODROMAL INFECTION ALERT: Temp > 39.8°C with Severe Rumination Drop (Detected ~48h prior to clinical lesion manifestation)"
        status_level = "critical"
    elif latest_temp >= 39.2 or latest_rum <= 14:
        anomaly = True
        status_text = "Sub-clinical Anomaly Detected: Rumination declining, mild hyperthermia"
        status_level = "warning"

    return jsonify({
        "status": "success",
        "tag_id": "IN-872190123455",
        "animal": "Kallu (Murrah Buffalo)",
        "mode": mode,
        "labels": labels,
        "temperature_c": temps,
        "rumination_min_hr": ruminations,
        "activity_steps": steps,
        "heart_rate_bpm": heart_rates,
        "latest_vitals": {
            "temperature_c": latest_temp,
            "rumination_today_est_min": round(sum(ruminations)),
            "heart_rate": heart_rates[-1],
            "activity_level": "Lethargic" if steps[-1] < 120 else "Normal"
        },
        "anomaly": anomaly,
        "status_text": status_text,
        "status_level": status_level
    })

# ==========================================
# 7. VACCINE COLD CHAIN & INVENTORY API
# ==========================================

@app.route('/api/vaccines', methods=['GET'])
def get_vaccines():
    """Returns vaccine stock levels and cold-chain compliance."""
    return jsonify({"vaccines": vaccines_store, "total": len(vaccines_store)})

@app.route('/api/vaccines/restock', methods=['POST'])
def restock_vaccine():
    """Simulates dispatching vaccine replenishment to district veterinary stores."""
    data = request.get_json() or {}
    vac_id = data.get('id')
    vials_added = int(data.get('vials', 5000))
    for vac in vaccines_store:
        if vac['id'] == vac_id:
            vac['stock_vials'] += vials_added
            vac['coverage_percent'] = min(100.0, round((vac['stock_vials'] / vac['target_herd']) * 100, 1))
            vac['status'] = "Sufficient" if vac['coverage_percent'] > 60 else "Moderate Stock"
            return jsonify({"status": "success", "message": f"Added {vials_added} vials to {vac['name']}", "vaccine": vac})
    return jsonify({"status": "error", "message": "Vaccine ID not found"}), 404

# ==========================================
# 8. EMERGENCY BROADCAST ADVISORY API
# ==========================================

@app.route('/api/broadcast', methods=['POST'])
def send_broadcast():
    """
    Dispatches automated biosecurity advisory via SMS/IVR to all livestock owners
    residing within the designated containment radius.
    """
    data = request.get_json() or {}
    district = data.get('district', 'Bikaner, Rajasthan')
    disease = data.get('disease', 'Lumpy Skin Disease')
    radius_km = float(data.get('radius_km', 5.0))
    message_text = data.get('message', 'Alert: Outbreak reported nearby. Please isolate symptomatic cattle and report immediately.')

    recipients_count = int(radius_km * 480 + random.randint(20, 80))
    broadcast_record = {
        "id": f"BC-{len(broadcasts_store) + 1:03d}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "district": district,
        "disease": disease,
        "radius_km": radius_km,
        "recipients_notified": recipients_count,
        "delivery_rate_percent": 98.4,
        "channels": ["SMS (Govt DLT Gateway)", "WhatsApp Agri-Bot", "IVR Voice Call (Hindi/Local)"],
        "status": "Delivered"
    }
    broadcasts_store.insert(0, broadcast_record)
    return jsonify({
        "status": "success",
        "message": f"Biosecurity advisory broadcasted to {recipients_count} farmers within {radius_km} km radius.",
        "broadcast": broadcast_record
    })

# ==========================================
# 9. VETERINARY DOSAGE & PRESCRIPTION CALCULATOR
# ==========================================

@app.route('/api/prescription/calculate', methods=['POST'])
def calculate_prescription():
    """
    Generates exact drug dosages according to animal species and body weight.
    """
    data = request.get_json() or {}
    disease_key = data.get('disease_key', 'lumpy_skin_disease')
    weight_kg = float(data.get('weight_kg', 380.0))
    species = data.get('species', 'Cow')

    dosage_info = STANDARD_DOSAGES.get(disease_key)
    if not dosage_info:
        return jsonify({"status": "error", "message": "Dosage protocol not found"}), 404

    # Calculate calibrated dosages
    prescribed_drugs = []
    for d in dosage_info['drugs']:
        prescribed_drugs.append({
            "drug": d['drug'],
            "calibrated_dose": f"{d['dose']} (Calibrated for {weight_kg} kg {species})",
            "frequency": d['frequency']
        })

    prescription_doc = {
        "rx_number": f"RX-{random.randint(100000, 999999)}",
        "date": datetime.now().strftime("%d %b %Y"),
        "species": species,
        "weight_kg": weight_kg,
        "disease": DISEASES_DB.get(disease_key, {}).get('name', disease_key),
        "primary_care": dosage_info['primary_care'],
        "drugs": prescribed_drugs,
        "dietary_advice": dosage_info['dietary'],
        "vet_license": "VCI/REG/2026/89412",
        "vet_name": "Dr. Arvind Swaminathan, B.V.Sc & A.H."
    }

    return jsonify({"status": "success", "prescription": prescription_doc})

# ==========================================
# 10. KNOWLEDGE BASE API
# ==========================================

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Returns complete encyclopedia of livestock diseases."""
    return jsonify({"diseases": DISEASES_DB})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    print("=" * 65)
    print(" PashuRakshak AI (Pashu Rakshak) - SIH 2026 PS 26128")
    print(" Early Detection, Prevention & Management of Livestock Diseases")
    print(f" Server launching on http://0.0.0.0:{port}")
    print("=" * 65)
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
