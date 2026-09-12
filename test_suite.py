import sys
import unittest
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from app import app

class TestPashuRakshak(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_01_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'PashuRakshak', response.data)
        print("[PASS] Index Page loaded successfully (200 OK)")

    def test_02_diagnose_lsd(self):
        payload = {
            'symptoms': ['firm_nodules', 'high_fever'],
            'image_tag': 'lsd_nodules',
            'temperature_c': 40.2,
            'rumination_min': 230,
            'species': 'Cow'
        }
        response = self.client.post('/api/diagnose', json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['status'], 'success')
        self.assertEqual(data['top_prediction']['disease_key'], 'lumpy_skin_disease')
        self.assertGreaterEqual(data['top_prediction']['confidence'], 85.0)
        print(f"[PASS] AI Diagnose verified: {data['top_prediction']['name']} ({data['top_prediction']['confidence']}%)")

    def test_03_livestock(self):
        response = self.client.get('/api/livestock')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertGreater(data['total'], 0)
        print(f"[PASS] Livestock API verified ({data['total']} animals in database)")

    def test_04_outbreaks_gis(self):
        response = self.client.get('/api/outbreaks')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertGreater(data['total'], 0)
        print(f"[PASS] Outbreak GIS API verified ({data['total']} clusters across India)")

    def test_05_seir_simulation(self):
        payload = {
            'population': 5000,
            'infected': 20,
            'beta': 0.45,
            'ring_vaccination_percent': 75,
            'days': 30
        }
        response = self.client.post('/api/simulate', json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('r0', data)
        self.assertGreater(data['animals_saved'], 0)
        print(f"[PASS] SEIR Simulation verified: R0={data['r0']}, Animals Saved={data['animals_saved']}")

    def test_06_iot_telemetry(self):
        response = self.client.get('/api/iot-telemetry?mode=fever_spike')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['anomaly'])
        print(f"[PASS] IoT Telemetry verified: {data['status_level']} anomaly caught")

    def test_07_prescription_calculator(self):
        payload = {
            'disease_key': 'lumpy_skin_disease',
            'weight_kg': 400,
            'species': 'Cow'
        }
        response = self.client.post('/api/prescription/calculate', json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        rx = data['prescription']
        self.assertIn('rx_number', rx)
        self.assertGreater(len(rx['drugs']), 0)
        print(f"[PASS] Veterinary Rx Calculator verified: {rx['rx_number']}")

if __name__ == '__main__':
    unittest.main()
