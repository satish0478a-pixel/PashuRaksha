/* static/js/app.js */
/* PashuRakshak AI - Main Client Application Logic */

// Global State
let currentRole = 'farmer';
let currentLang = 'hi';
let currentLesionTag = null;
let leafletMap = null;
let mapMarkers = [];
let mapCircles = [];
let seirChartInstance = null;
let iotChartInstance = null;
let allOutbreaksData = [];
let allCasesData = [];
let currentDiagnosticResult = null;

// Multi-Language Dictionary
const TRANSLATIONS = {
    en: {
        nav_farmer: "Farmer Portal",
        nav_vet: "Veterinary Triage",
        nav_surveillance: "Outbreak Radar (GIS)",
        nav_iot: "IoT Smart Collar",
        nav_library: "Disease Wiki",
        hero_badge: "AI-Powered Early Symptom & Lesion Scanner",
        hero_title: "Livestock Health Guardian - Early Disease Detection & Triage",
        hero_desc: "Upload cattle photos or select symptoms. Our AI model detects Lumpy Skin Disease (LSD), Foot & Mouth (FMD), and Mastitis with 95%+ precision, providing immediate first-aid guidance.",
        scan_now_btn: "Scan Animal Symptoms",
        voice_assist_btn: "Voice Assistant (Speak)",
        step1_title: "Select Symptoms or Upload Photo",
        run_diagnostic_btn: "Run AI Diagnostic Analysis",
        livestock_title: "e-Pashu Aadhaar - Registered Livestock",
        sos_btn: "Pashu SOS"
    },
    hi: {
        nav_farmer: "किसान पोर्टल",
        nav_vet: "पशु चिकित्सक कक्ष",
        nav_surveillance: "महामारी रडार (GIS)",
        nav_iot: "स्मार्ट कॉलर सेंसर",
        nav_library: "रोग ज्ञानकोश",
        hero_badge: "AI द्वारा संचालित प्रारंभिक रोग पहचान प्रणाली",
        hero_title: "पशु स्वास्थ्य रक्षक - तुरंत रोग पहचान और प्राथमिक उपचार",
        hero_desc: "अपने पशु की फोटो खींचें या लक्षण चुनें। हमारा AI मॉडल लम्पी स्किन (LSD), खुरपका-मुंहपका (FMD), और थनैला जैसे संक्रामक रोगों का 95%+ सटीकता से तुरंत पता लगाकर प्राथमिक उपचार की सलाह देता है।",
        scan_now_btn: "पशु के लक्षण जांचें",
        voice_assist_btn: "आवाज से बोलें (Voice Assistant)",
        step1_title: "लक्षण चुनें या फोटो अपलोड करें",
        run_diagnostic_btn: "रोग का AI विश्लेषण करें",
        livestock_title: "ई-पशु आधार - पंजीकृत पशु",
        sos_btn: "आपातकालीन SOS"
    },
    pa: {
        nav_farmer: "ਕਿਸਾਨ ਪੋਰਟਲ",
        nav_vet: "ਪਸ਼ੂ ਡਾਕਟਰ",
        nav_surveillance: "ਮਹਾਂਮਾਰੀ ਨਿਗਰਾਨੀ",
        nav_iot: "ਸਮਾਰਟ ਕਾਲਰ ਸੈਂਸਰ",
        nav_library: "ਬਿਮਾਰੀ ਗਾਈਡ",
        hero_badge: "AI ਪਸ਼ੂ ਬਿਮਾਰੀ ਜਾਂਚ",
        hero_title: "ਪਸ਼ੂ ਰੱਖਿਅਕ - ਬਿਮਾਰੀ ਦੀ ਤੁਰੰਤ ਪਛਾਣ ਅਤੇ ਇਲਾਜ",
        hero_desc: "ਆਪਣੇ ਪਸ਼ੂ ਦੇ ਲੱਛਣ ਚੁਣੋ ਜਾਂ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ। AI ਰਾਹੀਂ ਤੁਰੰਤ ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲਗਾਓ ਅਤੇ ਪਹਿਲੀ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ।",
        scan_now_btn: "ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ ਕਰੋ",
        voice_assist_btn: "ਬੋਲ ਕੇ ਦੱਸੋ",
        step1_title: "ਲੱਛਣ ਚੁਣੋ",
        run_diagnostic_btn: "AI ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ",
        livestock_title: "ਰਜਿਸਟਰਡ ਪਸ਼ੂ",
        sos_btn: "ਐਮਰਜੈਂਸੀ SOS"
    },
    mr: {
        nav_farmer: "शेतकरी पोर्टल",
        nav_vet: "पशुवैद्यकीय कक्ष",
        nav_surveillance: "साथरोग नियंत्रण (GIS)",
        nav_iot: "स्मार्ट कॉलर सेन्सर",
        nav_library: "रोग माहिती",
        hero_badge: "AI पशु आरोग्य तपासणी",
        hero_title: "पशु रक्षक - तात्काळ रोग निदान व प्रथमोपचार",
        hero_desc: "पशूंचे फोटो किंवा लक्षणे निवडा. लम्पी स्किन, लाळ खुरकूत आणि स्तनदाह रोगांचे अचूक निदान व प्रथमोपचार मिळवा.",
        scan_now_btn: "लक्षणे तपासा",
        voice_assist_btn: "आवाजाने सांगा",
        step1_title: "लक्षणे निवडा किंवा फोटो जोडा",
        run_diagnostic_btn: "AI द्वारे रोग तपासा",
        livestock_title: "ई-पशु आधार - नोंदणीकृत जनावरे",
        sos_btn: "तातडीची मदत SOS"
    },
    ta: {
        nav_farmer: "விவசாயி தளம்",
        nav_vet: "கால்நடை மருத்துவர்",
        nav_surveillance: "நோய் கண்காணிப்பு",
        nav_iot: "சென்சார் கண்காணிப்பு",
        nav_library: "நோய் விபரம்",
        hero_badge: "AI கால்நடை நோய் கண்டறிதல்",
        hero_title: "பசு ரக்ஷக் - ஆரம்ப நோய் கண்டறிதல் மற்றும் முதலுதவி",
        hero_desc: "கால்நடை அறிகுறிகளைத் தேர்ந்தெடுக்கவும் அல்லது புகைப்படம் பதிவேற்றவும். உடனடி முதலுதவி வழிகாட்டுதல் பெறுங்கள்.",
        scan_now_btn: "அறிகுறிகளைச் சரிபார்க்கவும்",
        voice_assist_btn: "குரல் வழி உதவி",
        step1_title: "அறிகுறிகளைத் தேர்வு செய்க",
        run_diagnostic_btn: "AI பரிசோதனை செய்க",
        livestock_title: "பதிவு செய்யப்பட்ட கால்நடைகள்",
        sos_btn: "அவசர உதவி SOS"
    }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadLivestockList();
    loadCasesList();
    loadVaccinesList();
    loadDiseasesWiki();
    initLeafletMap();
    initSeirChart();
    runSeirSimulation();
    initIotChart();
    loadIotScenario('fever_spike');
});

// Role Switcher
function switchRole(role) {
    currentRole = role;
    
    // Update nav tab highlights
    document.querySelectorAll('.role-nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${role}`);
    if (activeTab) activeTab.classList.add('active');

    // Toggle views
    document.querySelectorAll('.role-view').forEach(view => view.classList.add('hidden'));
    const targetView = document.getElementById(`view-${role}`);
    if (targetView) {
        targetView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Refresh Leaflet map on tab switch to avoid tile rendering glitches
    if (role === 'surveillance' && leafletMap) {
        setTimeout(() => {
            leafletMap.invalidateSize();
        }, 200);
    }
}

function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('hidden');
}

// Change Language
function changeLanguage(lang) {
    currentLang = lang;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
    showToast(`Language switched to ${lang.toUpperCase()}`, 'info');
}

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const colors = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white',
        warning: 'bg-amber-600 text-white'
    };

    toast.className = `${colors[type] || colors.info} px-4 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 animate-fade-in`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-bell'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        setTimeout(() => toast.remove(), 250);
    }, 3500);
}

// ==========================================
// 1. AI DIAGNOSTIC ENGINE & SAMPLES
// ==========================================

function clearSymptoms() {
    document.querySelectorAll('input[name="symptom"]').forEach(cb => cb.checked = false);
    currentLesionTag = null;
    document.getElementById('image-preview-container').classList.add('hidden');
    document.getElementById('drop-zone-content').classList.remove('hidden');
}

// Load Clickable Demo Presets
function loadSamplePreset(type) {
    clearSymptoms();
    const tempInput = document.getElementById('scan-temp');
    const rumInput = document.getElementById('scan-rumination');
    const speciesInput = document.getElementById('scan-species');
    const previewContainer = document.getElementById('image-preview-container');
    const dropContent = document.getElementById('drop-zone-content');
    const previewImg = document.getElementById('image-preview');
    const imageName = document.getElementById('image-name');
    const imageBadge = document.getElementById('image-badge');

    dropContent.classList.add('hidden');
    previewContainer.classList.remove('hidden');

    if (type === 'lsd') {
        currentLesionTag = 'lsd_nodules';
        checkSymptom('firm_nodules');
        checkSymptom('high_fever');
        checkSymptom('drop_in_milk');
        tempInput.value = '40.3';
        rumInput.value = '230';
        speciesInput.value = 'Cow';
        previewImg.src = 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=200&auto=format&fit=crop&q=60';
        imageName.textContent = 'lsd_nodules_sample.jpg';
        imageBadge.textContent = 'LSD Skin Nodules Detected';
    } else if (type === 'fmd') {
        currentLesionTag = 'fmd_blister';
        checkSymptom('excessive_salivation');
        checkSymptom('mouth_blisters');
        checkSymptom('lameness');
        checkSymptom('high_fever');
        tempInput.value = '40.5';
        rumInput.value = '190';
        speciesInput.value = 'Buffalo';
        previewImg.src = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=200&auto=format&fit=crop&q=60';
        imageName.textContent = 'fmd_oral_lesion.jpg';
        imageBadge.textContent = 'Oral Vesicles & Blisters';
    } else if (type === 'mastitis') {
        currentLesionTag = 'mastitis_udder';
        checkSymptom('udder_swelling');
        checkSymptom('discolored_milk');
        checkSymptom('drop_in_milk');
        tempInput.value = '39.4';
        rumInput.value = '310';
        speciesInput.value = 'Cow';
        previewImg.src = 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=200&auto=format&fit=crop&q=60';
        imageName.textContent = 'mastitis_udder_swelling.jpg';
        imageBadge.textContent = 'Acute Mastitis Inflammation';
    } else if (type === 'healthy') {
        currentLesionTag = 'healthy';
        tempInput.value = '38.5';
        rumInput.value = '480';
        speciesInput.value = 'Cow';
        previewImg.src = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&auto=format&fit=crop&q=60';
        imageName.textContent = 'healthy_gir_cow.jpg';
        imageBadge.textContent = 'Normal Healthy Bovine';
    }

    // Trigger AI Diagnosis automatically for snappy interactive demo!
    runAiDiagnosis();
}

function checkSymptom(val) {
    const cb = document.querySelector(`input[name="symptom"][value="${val}"]`);
    if (cb) cb.checked = true;
}

function handlePhotoSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('drop-zone-content').classList.add('hidden');
        const container = document.getElementById('image-preview-container');
        container.classList.remove('hidden');
        document.getElementById('image-preview').src = e.target.result;
        document.getElementById('image-name').textContent = file.name;
        document.getElementById('image-badge').textContent = 'Custom Photo Uploaded';
        currentLesionTag = 'lsd_nodules'; // default heuristic fallback for photo
        showToast('Photo uploaded successfully! Running AI analysis...', 'info');
        runAiDiagnosis();
    };
    reader.readAsDataURL(file);
}

// ==========================================
// VERNACULAR VOICE ASSISTANT & AUDIO
// ==========================================

let voiceRecognition = null;
let isVoiceListening = false;

function openVoiceModal() {
    const modal = document.getElementById('modal-voice');
    if (modal) modal.classList.remove('hidden');
    // Clear previous transcript
    const input = document.getElementById('voice-transcript-input');
    if (input) input.value = '';
    startListeningInModal();
}

function closeVoiceModal() {
    const modal = document.getElementById('modal-voice');
    if (modal) modal.classList.add('hidden');
    stopListeningInModal();
}

function startVoiceDiagnostic() {
    openVoiceModal();
}

function toggleVoiceListening() {
    if (isVoiceListening) {
        stopListeningInModal();
    } else {
        startListeningInModal();
    }
}

function startListeningInModal() {
    const micCircle = document.getElementById('voice-mic-circle');
    const micIcon = document.getElementById('voice-mic-icon');
    const statusBadge = document.getElementById('voice-status-badge');
    const helpText = document.getElementById('voice-help-text');

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        statusBadge.textContent = 'Voice recognition not supported in browser';
        statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800';
        helpText.textContent = 'Please choose one of the sample spoken queries below or type directly.';
        return;
    }

    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (voiceRecognition) {
            try { voiceRecognition.abort(); } catch (e) {}
        }
        voiceRecognition = new SpeechRecognition();
        voiceRecognition.lang = currentLang === 'hi' ? 'hi-IN' : currentLang === 'pa' ? 'pa-IN' : currentLang === 'mr' ? 'mr-IN' : 'en-IN';
        voiceRecognition.continuous = false;
        voiceRecognition.interimResults = true;

        statusBadge.textContent = 'Listening... बोलिए';
        statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 animate-pulse';
        micCircle.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl cursor-pointer transition-all bg-red-600 text-white shadow-lg shadow-red-500/40 animate-pulse';
        micIcon.className = 'fa-solid fa-microphone-lines';
        isVoiceListening = true;

        voiceRecognition.onresult = (event) => {
            let fullTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                fullTranscript += event.results[i][0].transcript;
            }
            const input = document.getElementById('voice-transcript-input');
            if (input) input.value = fullTranscript;
        };

        voiceRecognition.onerror = (event) => {
            isVoiceListening = false;
            micCircle.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl cursor-pointer transition-all bg-amber-500 text-white shadow-lg shadow-amber-500/30';
            micIcon.className = 'fa-solid fa-microphone';
            
            if (event.error === 'not-allowed') {
                statusBadge.textContent = 'Microphone permission blocked';
                statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800';
                helpText.innerHTML = 'Allow mic access in browser URL bar (🔒 icon), or tap any sample spoken query below.';
            } else if (event.error === 'network') {
                statusBadge.textContent = 'Speech network service busy';
                statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800';
                helpText.textContent = 'Speech service unreachable. Tap any sample spoken query below to analyze instantly.';
            } else if (event.error === 'no-speech') {
                statusBadge.textContent = 'No voice detected';
                statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800';
                helpText.textContent = 'Tap the mic again to speak, or choose a spoken query below.';
            } else {
                statusBadge.textContent = `Mic status: ${event.error}`;
                statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800';
                helpText.textContent = 'Tap any sample spoken query below to test instantly.';
            }
        };

        voiceRecognition.onend = () => {
            isVoiceListening = false;
            micCircle.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl cursor-pointer transition-all bg-brand-500 text-white shadow-lg shadow-brand-500/30';
            micIcon.className = 'fa-solid fa-microphone';
            if (statusBadge.textContent.includes('Listening')) {
                statusBadge.textContent = 'Audio Captured (सुना गया)';
                statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
            }
        };

        voiceRecognition.start();
    } catch (e) {
        console.warn('SpeechRecognition start error:', e);
        isVoiceListening = false;
        statusBadge.textContent = 'Ready to transcribe';
        statusBadge.className = 'inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800';
    }
}

function stopListeningInModal() {
    if (voiceRecognition && isVoiceListening) {
        try { voiceRecognition.stop(); } catch (e) {}
    }
    isVoiceListening = false;
    const micCircle = document.getElementById('voice-mic-circle');
    const micIcon = document.getElementById('voice-mic-icon');
    if (micCircle) micCircle.className = 'w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl cursor-pointer transition-all bg-brand-500 text-white shadow-lg shadow-brand-500/30';
    if (micIcon) micIcon.className = 'fa-solid fa-microphone';
}

function selectVoicePrompt(text) {
    const input = document.getElementById('voice-transcript-input');
    if (input) input.value = text;
    showToast('Spoken query selected. Tap "Analyze" or hit Enter.', 'info');
}

function processVoiceQuery() {
    const text = (document.getElementById('voice-transcript-input').value || '').trim();
    if (!text) {
        showToast('Please speak or select a spoken query first.', 'warning');
        return;
    }

    closeVoiceModal();
    clearSymptoms();

    const lower = text.toLowerCase();
    
    // Check species
    if (lower.includes('भैंस') || lower.includes('buffalo') || lower.includes('bhains')) {
        document.getElementById('scan-species').value = 'Buffalo';
    } else if (lower.includes('बकरी') || lower.includes('goat') || lower.includes('sheep') || lower.includes('भेड़')) {
        document.getElementById('scan-species').value = 'Goat';
    } else {
        document.getElementById('scan-species').value = 'Cow';
    }

    // Keyword matching for symptoms
    let matchedAny = false;

    // LSD
    if (lower.includes('गांठ') || lower.includes('लम्पी') || lower.includes('nodule') || lower.includes('lump') || lower.includes('फोड़े')) {
        checkSymptom('firm_nodules');
        currentLesionTag = 'lsd_nodules';
        matchedAny = true;
    }

    // FMD
    if (lower.includes('लार') || lower.includes('झाग') || lower.includes('drool') || lower.includes('saliv')) {
        checkSymptom('excessive_salivation');
        matchedAny = true;
    }
    if (lower.includes('छाले') || lower.includes('मुंह') || lower.includes('खुर') || lower.includes('blister') || lower.includes('ulcer') || lower.includes('fmd')) {
        checkSymptom('mouth_blisters');
        currentLesionTag = 'fmd_blister';
        matchedAny = true;
    }

    // Mastitis
    if (lower.includes('थन') || lower.includes('udder') || lower.includes('aayan')) {
        checkSymptom('udder_swelling');
        currentLesionTag = 'mastitis_udder';
        matchedAny = true;
    }
    if (lower.includes('खून') || lower.includes('थक्के') || lower.includes('clot') || lower.includes('blood') || lower.includes('छीछड़े')) {
        checkSymptom('discolored_milk');
        matchedAny = true;
    }
    if (lower.includes('दूध') || lower.includes('milk')) {
        checkSymptom('drop_in_milk');
        matchedAny = true;
    }

    // Fever
    if (lower.includes('बुखार') || lower.includes('fever') || lower.includes('गरम') || lower.includes('ताप')) {
        checkSymptom('high_fever');
        document.getElementById('scan-temp').value = '40.2';
        document.getElementById('scan-rumination').value = '230';
        matchedAny = true;
    }

    // Lameness / Limp
    if (lower.includes('लंगड़ा') || lower.includes('limp') || lower.includes('चरचराहट') || lower.includes('टांग')) {
        checkSymptom('lameness');
        currentLesionTag = 'crepitant_swelling';
        matchedAny = true;
    }

    // Throat
    if (lower.includes('गला') || lower.includes('गले') || lower.includes('throat') || lower.includes('घोंटू')) {
        checkSymptom('throat_swelling');
        matchedAny = true;
    }

    // Healthy
    if (lower.includes('स्वस्थ') || lower.includes('healthy') || lower.includes('सामान्य')) {
        currentLesionTag = 'healthy';
        document.getElementById('scan-temp').value = '38.5';
        document.getElementById('scan-rumination').value = '480';
        matchedAny = true;
    }

    if (!matchedAny) {
        checkSymptom('high_fever');
    }

    showToast(`Voice Query Processed: "${text.substring(0, 35)}..."`, 'success');
    runAiDiagnosis();
}

// Run AI Diagnosis API Call
async function runAiDiagnosis() {
    const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(cb => cb.value);
    const temp = parseFloat(document.getElementById('scan-temp').value) || 38.5;
    const rumination = parseFloat(document.getElementById('scan-rumination').value) || 450;
    const species = document.getElementById('scan-species').value;

    const submitBtn = document.getElementById('diagnose-submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing with AI Neural Triage...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/diagnose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                symptoms: selectedSymptoms,
                image_tag: currentLesionTag,
                temperature_c: temp,
                rumination_min: rumination,
                species: species
            })
        });

        const data = await response.json();
        currentDiagnosticResult = data;

        // Display results
        document.getElementById('result-placeholder').classList.add('hidden');
        const card = document.getElementById('result-card');
        card.classList.remove('hidden');

        const top = data.top_prediction;
        if (top) {
            document.getElementById('res-disease-name').textContent = top.name;
            document.getElementById('res-pathogen').textContent = `Pathogen: ${top.pathogen}`;
            document.getElementById('res-confidence').textContent = `${top.confidence}%`;
            
            // Urgency badge
            const badge = document.getElementById('res-urgency-badge');
            badge.textContent = data.urgency_level;
            badge.className = `inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${
                data.urgency_level.includes('Red') ? 'bg-red-100 text-red-700 border-red-200' :
                data.urgency_level.includes('Yellow') ? 'bg-amber-100 text-amber-700 border-amber-200' :
                'bg-emerald-100 text-emerald-700 border-emerald-200'
            }`;

            // First-aid list
            const faList = document.getElementById('res-first-aid-list');
            faList.innerHTML = top.first_aid.map(step => `
                <li class="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <i class="fa-solid fa-circle-check text-brand-600 mt-0.5"></i>
                    <span>${step}</span>
                </li>
            `).join('');

            // Quarantine Protocol
            document.getElementById('res-isolation').textContent = top.isolation_protocol;
            document.getElementById('res-vaccine').textContent = top.vaccine;

            showToast(`Diagnosis Complete: ${top.name} (${top.confidence}%)`, 'success');
        }

    } catch (err) {
        console.error('Diagnosis error:', err);
        showToast('Failed to complete AI diagnosis', 'error');
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Text-to-Speech audio readout of treatment plan
function speakTreatmentPlan() {
    if (!('speechSynthesis' in window)) {
        showToast('Text-to-speech not supported in this browser.', 'warning');
        return;
    }
    if (!currentDiagnosticResult || !currentDiagnosticResult.top_prediction) {
        showToast('No diagnosis to speak.', 'warning');
        return;
    }

    const top = currentDiagnosticResult.top_prediction;
    const textToSpeak = `पशु स्वास्थ्य अलर्ट: ${top.name}. प्राथमिकता स्तर: ${currentDiagnosticResult.urgency_level}. प्राथमिक उपचार: ${top.first_aid[0]}. पशु को तुरंत अलग रखें और 1962 डायल करें।`;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showToast('Playing treatment audio...', 'info');
}

// Submit to Vet Triage
async function submitToVetTriage() {
    if (!currentDiagnosticResult || !currentDiagnosticResult.top_prediction) return;
    
    const top = currentDiagnosticResult.top_prediction;
    try {
        const response = await fetch('/api/cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tag_id: 'IN-443218765409',
                animal_name: 'Sundari',
                species: document.getElementById('scan-species').value,
                farmer_name: 'Farmer (Self-Reported)',
                village: 'Bikaner District Cluster',
                symptoms: Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(cb => cb.value),
                suspected_disease: top.name,
                urgency: currentDiagnosticResult.urgency_level,
                ai_confidence: top.confidence,
                notes: 'Farmer submitted case via PashuRakshak AI Scanner.'
            })
        });
        const res = await response.json();
        showToast('Case submitted to Veterinary Triage Queue!', 'success');
        loadCasesList();
    } catch (err) {
        showToast('Error submitting case', 'error');
    }
}

// ==========================================
// 2. LIVESTOCK HEALTH PASSPORT (PASHU AADHAAR)
// ==========================================

async function loadLivestockList() {
    try {
        const res = await fetch('/api/livestock');
        const data = await res.json();
        const grid = document.getElementById('livestock-cards-grid');
        if (!grid) return;

        grid.innerHTML = data.livestock.map(animal => `
            <div class="bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-500 transition shadow-sm hover:shadow-md space-y-3">
                <div class="flex items-start justify-between">
                    <div>
                        <span class="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                            ${animal.tag_id}
                        </span>
                        <h4 class="text-base font-black text-slate-900 mt-1">${animal.name}</h4>
                        <p class="text-xs text-slate-500">${animal.species} • ${animal.breed} (${animal.age_years} yrs, ${animal.weight_kg} kg)</p>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        animal.status.includes('Healthy') ? 'bg-emerald-100 text-emerald-800' :
                        animal.status.includes('Monitoring') ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                    }">
                        ${animal.status}
                    </span>
                </div>

                <div class="text-xs space-y-1.5 pt-2 border-t border-slate-200 text-slate-600">
                    <p class="flex justify-between"><span>Owner / Village:</span> <strong class="text-slate-800">${animal.owner_name}</strong></p>
                    <p class="flex justify-between"><span>Last Vaccine:</span> <strong class="text-slate-800">${animal.last_vaccine}</strong></p>
                    <p class="flex justify-between"><span>Next Due:</span> <strong class="text-brand-700">${animal.next_vaccine_due}</strong></p>
                </div>

                <div class="bg-white p-2.5 rounded-xl border border-slate-200 flex justify-between text-xs text-slate-700 font-semibold">
                    <span>Temp: <strong class="text-slate-900">${animal.temperature_c}°C</strong></span>
                    <span>Milk: <strong class="text-slate-900">${animal.milk_liters_day} L/d</strong></span>
                    <span>Rumination: <strong class="text-slate-900">${animal.rumination_min} min</strong></span>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error loading livestock:', err);
    }
}

function openRegisterAnimalModal() {
    document.getElementById('modal-register-animal').classList.remove('hidden');
}
function closeRegisterAnimalModal() {
    document.getElementById('modal-register-animal').classList.add('hidden');
}

async function submitNewAnimal(e) {
    e.preventDefault();
    const payload = {
        tag_id: document.getElementById('reg-tag').value,
        name: document.getElementById('reg-name').value,
        species: document.getElementById('reg-species').value,
        breed: document.getElementById('reg-breed').value,
        weight_kg: parseFloat(document.getElementById('reg-weight').value),
        owner_name: document.getElementById('reg-owner').value
    };

    try {
        const res = await fetch('/api/livestock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        showToast('Cattle registered with e-Pashu Aadhaar!', 'success');
        closeRegisterAnimalModal();
        loadLivestockList();
    } catch (err) {
        showToast('Failed to register animal', 'error');
    }
}

// ==========================================
// 3. VETERINARIAN TRIAGE & DOSAGE CALCULATOR
// ==========================================

async function loadCasesList() {
    try {
        const res = await fetch('/api/cases');
        const data = await res.json();
        allCasesData = data.cases;
        renderCases(allCasesData);
    } catch (err) {
        console.error('Cases load error:', err);
    }
}

function renderCases(cases) {
    const container = document.getElementById('cases-list-container');
    const countBadge = document.getElementById('cases-count-badge');
    if (!container) return;

    countBadge.textContent = `${cases.length} Cases`;
    container.innerHTML = cases.map(c => `
        <div class="p-4 rounded-2xl border ${
            c.urgency.includes('Critical') || c.urgency.includes('Urgent') ? 'border-red-300 bg-red-50/40' :
            c.status.includes('Resolved') ? 'border-emerald-200 bg-emerald-50/40' :
            'border-slate-200 bg-white'
        } space-y-3">
            <div class="flex items-start justify-between">
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-sm text-slate-900">${c.case_id}</span>
                        <span class="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border">${c.tag_id}</span>
                    </div>
                    <p class="text-xs font-bold text-slate-800 mt-1">${c.animal_name} (${c.species})</p>
                    <p class="text-[11px] text-slate-500">Farmer: ${c.farmer_name} • ${c.village} (${c.phone})</p>
                </div>
                <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    c.urgency.includes('Red') ? 'bg-red-100 text-red-800 border border-red-300' :
                    c.urgency.includes('Yellow') ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                }">
                    ${c.urgency}
                </span>
            </div>

            <div class="text-xs bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                <p><strong>Suspected Disease:</strong> <span class="text-slate-900 font-bold">${c.suspected_disease}</span> (AI Conf: ${c.ai_confidence}%)</p>
                <p class="text-slate-600"><strong>Symptoms:</strong> ${c.symptoms.join(', ') || 'Reported distress'}</p>
                <p class="text-slate-500 italic text-[11px]">${c.notes}</p>
            </div>

            <div class="flex items-center justify-between pt-1">
                <span class="text-[11px] font-semibold text-slate-500">Status: <strong class="text-slate-800">${c.status}</strong></span>
                <div class="flex gap-2">
                    <button onclick="reviewAndPrescribe('${c.suspected_disease}', '${c.species}')" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5">
                        <i class="fa-solid fa-stethoscope"></i> Prescribe
                    </button>
                    ${!c.status.includes('Resolved') ? `
                        <button onclick="resolveCase('${c.case_id}')" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition">
                            Resolve
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function filterCases(type) {
    document.querySelectorAll('.case-filter-btn').forEach(btn => btn.classList.remove('active', 'bg-slate-200'));
    if (type === 'all') {
        renderCases(allCasesData);
    } else if (type === 'Urgent') {
        renderCases(allCasesData.filter(c => c.urgency.includes('Red') || c.urgency.includes('Urgent') || c.urgency.includes('Critical')));
    } else if (type === 'Resolved') {
        renderCases(allCasesData.filter(c => c.status.includes('Resolved')));
    }
}

async function resolveCase(caseId) {
    try {
        await fetch(`/api/cases/${caseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Resolved / Recovered' })
        });
        showToast(`Case ${caseId} marked as Resolved`, 'success');
        loadCasesList();
    } catch (err) {
        showToast('Failed to resolve case', 'error');
    }
}

function reviewAndPrescribe(diseaseName, species) {
    const diseaseSelect = document.getElementById('calc-disease');
    if (diseaseName.includes('Lumpy')) diseaseSelect.value = 'lumpy_skin_disease';
    else if (diseaseName.includes('Foot') || diseaseName.includes('FMD')) diseaseSelect.value = 'foot_and_mouth';
    else if (diseaseName.includes('Mastitis')) diseaseSelect.value = 'bovine_mastitis';
    else if (diseaseName.includes('Haemorrhagic') || diseaseName.includes('HS')) diseaseSelect.value = 'haemorrhagic_septicaemia';
    else if (diseaseName.includes('Black')) diseaseSelect.value = 'blackquarter';

    document.getElementById('calc-species').value = species.includes('Buffalo') ? 'Buffalo' : 'Cow';
    generatePrescription();
}

async function generatePrescription() {
    const diseaseKey = document.getElementById('calc-disease').value;
    const weight = parseFloat(document.getElementById('calc-weight').value) || 380;
    const species = document.getElementById('calc-species').value;

    try {
        const res = await fetch('/api/prescription/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                disease_key: diseaseKey,
                weight_kg: weight,
                species: species
            })
        });
        const data = await res.json();
        const rx = data.prescription;

        document.getElementById('rx-num').textContent = `${rx.rx_number} • ${rx.date}`;
        document.getElementById('rx-drugs-list').innerHTML = rx.drugs.map(d => `
            <div class="bg-white p-2 rounded-xl border border-slate-200">
                <p class="font-extrabold text-slate-900">${d.drug}</p>
                <p class="text-brand-700 font-semibold text-[11px]">${d.calibrated_dose}</p>
                <p class="text-slate-400 text-[10px]">${d.frequency}</p>
            </div>
        `).join('');
        document.getElementById('rx-dietary').textContent = `Dietary & Management: ${rx.dietary_advice}`;
        showToast('Prescription calibrated and ready for print!', 'success');
    } catch (err) {
        showToast('Error calculating prescription', 'error');
    }
}

function printPrescription() {
    window.print();
}

// ==========================================
// 4. GIS OUTBREAK HEATMAP (LEAFLET.JS)
// ==========================================

async function initLeafletMap() {
    const mapEl = document.getElementById('gis-map');
    if (!mapEl) return;

    // Centered over Central India
    leafletMap = L.map('gis-map').setView([23.5, 78.5], 5);

    // OpenStreetMap Tiles with nice clean styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | DAHD NADCP'
    }).addTo(leafletMap);

    await loadOutbreaksOnMap();
}

async function loadOutbreaksOnMap(filter = 'all') {
    if (!leafletMap) return;

    // Clear existing markers & circles
    mapMarkers.forEach(m => leafletMap.removeLayer(m));
    mapCircles.forEach(c => leafletMap.removeLayer(c));
    mapMarkers = [];
    mapCircles = [];

    try {
        const res = await fetch('/api/outbreaks');
        const data = await res.json();
        allOutbreaksData = data.outbreaks;

        const filtered = filter === 'all' ? allOutbreaksData : allOutbreaksData.filter(o => o.disease_key === filter);

        filtered.forEach(outbreak => {
            const isHigh = outbreak.severity === 'High' || outbreak.severity === 'Critical';
            const markerColor = isHigh ? '#dc2626' : '#f59e0b';

            // Outbreak Center Marker
            const marker = L.circleMarker([outbreak.lat, outbreak.lng], {
                radius: 9,
                fillColor: markerColor,
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).addTo(leafletMap);

            // Containment Zone Circle (Core 3km)
            const coreCircle = L.circle([outbreak.lat, outbreak.lng], {
                radius: 3000,
                color: '#dc2626',
                fillColor: '#ef4444',
                fillOpacity: 0.15,
                weight: 2
            }).addTo(leafletMap);

            // Buffer Surveillance Circle (10km)
            const bufferCircle = L.circle([outbreak.lat, outbreak.lng], {
                radius: 10000,
                color: '#9333ea',
                fillColor: '#a855f7',
                fillOpacity: 0.05,
                weight: 1,
                dashArray: '4, 6'
            }).addTo(leafletMap);

            const popupContent = `
                <div class="p-1 space-y-2 text-xs font-['Plus_Jakarta_Sans']">
                    <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white" style="background-color:${markerColor}">
                        ${outbreak.severity} Outbreak (${outbreak.id})
                    </span>
                    <h4 class="font-extrabold text-sm text-slate-900">${outbreak.disease_name}</h4>
                    <p class="text-slate-600">${outbreak.village}, ${outbreak.district}, ${outbreak.state}</p>
                    <div class="bg-slate-100 p-2 rounded-lg grid grid-cols-2 gap-1 text-[11px]">
                        <div>Active Cases: <strong>${outbreak.active_cases}</strong></div>
                        <div>Quarantine: <strong>${outbreak.quarantined_animals}</strong></div>
                        <div>Est R0: <strong>${outbreak.r0}</strong></div>
                        <div>Mortality: <strong>${outbreak.mortality}</strong></div>
                    </div>
                    <p class="text-[10px] text-purple-700 font-semibold">${outbreak.ring_vaccination_status}</p>
                </div>
            `;
            marker.bindPopup(popupContent);

            mapMarkers.push(marker);
            mapCircles.push(coreCircle, bufferCircle);
        });

    } catch (err) {
        console.error('Error loading outbreaks map:', err);
    }
}

function filterMapOutbreaks(val) {
    loadOutbreaksOnMap(val);
}

// ==========================================
// 5. SEIR "WHAT-IF" SIMULATION ENGINE
// ==========================================

function initSeirChart() {
    const ctx = document.getElementById('seir-chart');
    if (!ctx) return;

    seirChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 31 }, (_, i) => `Day ${i}`),
            datasets: [
                {
                    label: 'Infected (Without Ring Vaccination)',
                    data: [],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Infected (With Ring Vac & Containment)',
                    data: [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { font: { family: 'Plus Jakarta Sans', size: 11, weight: 'bold' } } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Active Infected Cattle', font: { size: 11, weight: 'bold' } }
                },
                x: {
                    title: { display: true, text: 'Timeline (Days)', font: { size: 11, weight: 'bold' } }
                }
            }
        }
    });
}

async function runSeirSimulation() {
    const pop = parseInt(document.getElementById('sim-pop').value);
    const infected = parseInt(document.getElementById('sim-infected').value);
    const beta = parseFloat(document.getElementById('sim-beta').value);
    const vac = parseInt(document.getElementById('sim-vac').value);

    // Update slider label indicators
    document.getElementById('val-pop').textContent = pop.toLocaleString();
    document.getElementById('val-infected').textContent = infected;
    document.getElementById('val-beta').textContent = beta.toFixed(2);
    document.getElementById('val-vac').textContent = `${vac}%`;

    try {
        const res = await fetch('/api/simulate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                population: pop,
                infected: infected,
                beta: beta,
                ring_vaccination_percent: vac,
                days: 30
            })
        });
        const data = await res.json();

        // Update KPIs
        document.getElementById('kpi-r0').textContent = data.r0;
        document.getElementById('kpi-saved').textContent = data.animals_saved.toLocaleString();

        // Update Chart
        if (seirChartInstance) {
            const baselineInfected = data.trajectory_baseline.map(d => d.infected);
            const intervenedInfected = data.trajectory_intervened.map(d => d.infected);

            seirChartInstance.data.datasets[0].data = baselineInfected;
            seirChartInstance.data.datasets[1].data = intervenedInfected;
            seirChartInstance.update();
        }
    } catch (err) {
        console.error('Simulation error:', err);
    }
}

// ==========================================
// 6. SMART IOT COLLAR TELEMETRY
// ==========================================

function initIotChart() {
    const ctx = document.getElementById('iot-dual-chart');
    if (!ctx) return;

    iotChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Internal Body Temp (°C)',
                    data: [],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    yAxisID: 'yTemp',
                    borderWidth: 2.5,
                    tension: 0.3
                },
                {
                    label: 'Rumination (Mins / Hour)',
                    data: [],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.05)',
                    yAxisID: 'yRum',
                    borderWidth: 2.5,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                yTemp: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 37.5,
                    max: 42.0,
                    title: { display: true, text: 'Temperature (°C)', color: '#ef4444' }
                },
                yRum: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 40,
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'Rumination (Min/Hr)', color: '#f59e0b' }
                }
            }
        }
    });
}

async function loadIotScenario(mode) {
    document.querySelectorAll('.iot-mode-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-amber-500', 'text-slate-950');
        btn.classList.add('text-slate-300');
    });
    const activeBtn = document.getElementById(`iot-btn-${mode === 'normal' ? 'normal' : mode === 'fever_spike' ? 'fever' : 'mastitis'}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-amber-500', 'text-slate-950');
        activeBtn.classList.remove('text-slate-300');
    }

    try {
        const res = await fetch(`/api/iot-telemetry?mode=${mode}`);
        const data = await res.json();

        // Update Status Banner
        const banner = document.getElementById('iot-status-banner');
        const icon = document.getElementById('iot-status-icon');
        const text = document.getElementById('iot-status-text');

        text.textContent = data.status_text;

        if (data.status_level === 'critical') {
            banner.className = 'p-4 rounded-2xl border-2 border-red-500 bg-red-50/80 flex items-center justify-between gap-4 transition-all';
            icon.className = 'w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl font-bold animate-pulse';
            icon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        } else if (data.status_level === 'warning') {
            banner.className = 'p-4 rounded-2xl border-2 border-amber-500 bg-amber-50/80 flex items-center justify-between gap-4 transition-all';
            icon.className = 'w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold';
            icon.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>';
        } else {
            banner.className = 'p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 flex items-center justify-between gap-4 transition-all';
            icon.className = 'w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl font-bold';
            icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        }

        // Update Live Gauges
        document.getElementById('metric-temp').textContent = `${data.latest_vitals.temperature_c} °C`;
        document.getElementById('metric-rum').textContent = `${data.latest_vitals.rumination_today_est_min} min`;
        document.getElementById('metric-hr').textContent = `${data.latest_vitals.heart_rate} bpm`;

        // Update Chart
        if (iotChartInstance) {
            iotChartInstance.data.labels = data.labels;
            iotChartInstance.data.datasets[0].data = data.temperature_c;
            iotChartInstance.data.datasets[1].data = data.rumination_min_hr;
            iotChartInstance.update();
        }

    } catch (err) {
        console.error('IoT telemetry error:', err);
    }
}

// ==========================================
// 7. VACCINE COLD-CHAIN & INVENTORY
// ==========================================

async function loadVaccinesList() {
    try {
        const res = await fetch('/api/vaccines');
        const data = await res.json();
        const grid = document.getElementById('vaccines-inventory-grid');
        if (!grid) return;

        grid.innerHTML = data.vaccines.map(vac => `
            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div class="flex items-start justify-between">
                    <h4 class="font-extrabold text-xs text-slate-900 leading-snug">${vac.name}</h4>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                        vac.status.includes('Critical') ? 'bg-red-100 text-red-700' :
                        vac.status.includes('Moderate') ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                    }">${vac.status}</span>
                </div>
                <p class="text-[11px] text-slate-500">${vac.allocated_district}</p>
                <div class="space-y-1">
                    <div class="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Stock: ${vac.stock_vials.toLocaleString()} vials</span>
                        <span>${vac.coverage_percent}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2">
                        <div class="h-2 rounded-full ${vac.coverage_percent < 40 ? 'bg-red-500' : 'bg-brand-500'}" style="width: ${vac.coverage_percent}%"></div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                    <span class="flex items-center gap-1 text-emerald-700 font-bold">
                        <i class="fa-solid fa-temperature-half"></i> ${vac.cold_chain_temp_c}°C Optimal
                    </span>
                    <button onclick="restockVaccine('${vac.id}')" class="text-blue-600 hover:underline font-bold">
                        + Restock
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Vaccines load error:', err);
    }
}

async function restockVaccine(id) {
    try {
        await fetch('/api/vaccines/restock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, vials: 5000 })
        });
        showToast('5,000 vaccine vials replenished via cold-chain!', 'success');
        loadVaccinesList();
    } catch (err) {
        showToast('Restock failed', 'error');
    }
}

// ==========================================
// 8. MASS ADVISORY BROADCAST & SOS
// ==========================================

function openBroadcastModal() {
    document.getElementById('modal-broadcast').classList.remove('hidden');
}
function closeBroadcastModal() {
    document.getElementById('modal-broadcast').classList.add('hidden');
}

async function submitBroadcast(e) {
    e.preventDefault();
    const district = document.getElementById('bc-district').value;
    const radius = parseFloat(document.getElementById('bc-radius').value);
    const message = document.getElementById('bc-message').value;

    try {
        const res = await fetch('/api/broadcast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                district: district,
                radius_km: radius,
                message: message
            })
        });
        const data = await res.json();
        closeBroadcastModal();
        showToast(data.message, 'success');
    } catch (err) {
        showToast('Broadcast dispatch failed', 'error');
    }
}

function openSosModal() {
    document.getElementById('modal-sos').classList.remove('hidden');
}
function closeSosModal() {
    document.getElementById('modal-sos').classList.add('hidden');
}

// ==========================================
// 9. DISEASE KNOWLEDGE BASE & WIKI
// ==========================================

async function loadDiseasesWiki() {
    try {
        const res = await fetch('/api/diseases');
        const data = await res.json();
        const grid = document.getElementById('disease-wiki-grid');
        if (!grid) return;

        grid.innerHTML = Object.values(data.diseases).map(d => `
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-brand-500 transition shadow-sm hover:shadow-md space-y-4">
                <div class="flex items-start justify-between">
                    <div>
                        <span class="text-[10px] font-bold text-white px-2 py-0.5 rounded" style="background-color: ${d.color}">
                            ${d.id}
                        </span>
                        <h4 class="text-base font-black text-slate-900 mt-2">${d.name}</h4>
                        <p class="text-xs text-slate-500">${d.pathogen}</p>
                    </div>
                </div>

                <div class="text-xs space-y-1.5 text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                    <p><strong>Affected Species:</strong> ${d.species_affected.join(', ')}</p>
                    <p><strong>Incubation Period:</strong> ${d.incubation_days}</p>
                    <p><strong>Mortality / Morbidity:</strong> ${d.mortality_rate}</p>
                    <p><strong>Official Vaccine:</strong> ${d.vaccine}</p>
                </div>

                <div>
                    <p class="text-xs font-bold text-slate-800 mb-1">Standard Quarantine SOP:</p>
                    <p class="text-xs text-slate-600 leading-relaxed">${d.isolation_protocol}</p>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Wiki load error:', err);
    }
}
