// ==================== Aarish Tiles Network - Firebase Configuration ====================
// यह file हर HTML page में include होगी

// Firebase Configuration (आपकी दी हुई)
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
    // Check if Firebase is loaded
    if (typeof firebase !== 'undefined') {
        // Initialize Firebase
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        
        // Enable offline persistence for mobile
        db.enablePersistence()
            .then(() => console.log('✅ Offline mode enabled'))
            .catch(err => console.warn('⚠️ Offline mode error:', err));
        
        console.log('✅ Firebase Connected Successfully!');
        console.log('📁 Project:', firebaseConfig.projectId);
    } else {
        console.error('❌ Firebase SDK not loaded!');
    }
} catch (error) {
    console.error('❌ Firebase Initialization Error:', error);
}

// Export for global use
window.db = db;
window.auth = auth;

// Test Function
window.testFirebaseConnection = async function() {
    try {
        if (!db) throw new Error('Firestore not initialized');
        
        const testRef = await db.collection('connection_tests').add({
            message: 'Connection Test',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await testRef.delete();
        return { success: true, message: '✅ Firebase is working!' };
    } catch (error) {
        return { success: false, message: '❌ Firebase Error: ' + error.message };
    }
};
