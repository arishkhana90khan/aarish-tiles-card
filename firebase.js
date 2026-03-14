// ==================== Aarish Tiles Network - Firebase Configuration ====================
// Owner Contact Information
const OWNER_INFO = {
    name: "Arish Khan",
    phone1: "8755687268",
    phone2: "9528340961",
    email: "arishkhana90@gmail.com",
    instagram: "arishkhan3992__",
    instagramUrl: "https://instagram.com/arishkhan3992__"
};

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-_sy4cKvvDjz0R4CNj84kejcjqsyBVsM",
    authDomain: "aarish-tiles-network.firebaseapp.com",
    projectId: "aarish-tiles-network",
    storageBucket: "aarish-tiles-network.firebasestorage.app",
    messagingSenderId: "1097113885546",
    appId: "1:1097113885546:web:1b6bcdf8f3cfe20d9e2313",
    measurementId: "G-G2N8FYWV63"
};

// Firebase Initialize
let app, db, auth;

try {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        
        db.enablePersistence()
            .then(() => console.log('✅ Offline mode enabled'))
            .catch(err => console.warn('⚠️ Offline mode error:', err));
        
        console.log('✅ Firebase Connected Successfully!');
        console.log('👤 Owner:', OWNER_INFO.name);
    } else {
        console.error('❌ Firebase SDK not loaded!');
    }
} catch (error) {
    console.error('❌ Firebase Initialization Error:', error);
}

// Export for global use
window.db = db;
window.auth = auth;
window.OWNER_INFO = OWNER_INFO;

// Contact Functions
window.callOwner = function(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
};

window.emailOwner = function() {
    window.location.href = `mailto:${OWNER_INFO.email}`;
};

window.openInstagram = function() {
    window.open(OWNER_INFO.instagramUrl, '_blank');
};

window.whatsappOwner = function(message = '') {
    const defaultMsg = encodeURIComponent('नमस्ते, Aarish Tiles Network के बारे में पूछताछ करनी है।');
    window.open(`https://wa.me/${OWNER_INFO.phone1}?text=${defaultMsg}`, '_blank');
};

// Test Function
window.testFirebaseConnection = async function() {
    try {
        if (!db) throw new Error('Firestore not initialized');
        
        const testRef = await db.collection('connection_tests').add({
            message: 'Connection Test',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            owner: OWNER_INFO.name
        });
        
        await testRef.delete();
        return { success: true, message: '✅ Firebase is working!' };
    } catch (error) {
        return { success: false, message: '❌ Firebase Error: ' + error.message };
    }
};
