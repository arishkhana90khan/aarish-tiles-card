// ==================== Aarish Tiles Network - Complete Firebase Setup ====================
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

// ==================== Firebase Initialization ====================
let app, db, auth, storage;

try {
    // Check if Firebase SDK is loaded
    if (typeof firebase !== 'undefined') {
        console.log('✅ Firebase SDK loaded');
        
        // Initialize Firebase App
        app = firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase App initialized');
        
        // Initialize Firestore
        db = firebase.firestore();
        console.log('✅ Firestore initialized');
        
        // Initialize Auth (for future use)
        auth = firebase.auth();
        console.log('✅ Firebase Auth initialized');
        
        // Initialize Storage (for future use)
        storage = firebase.storage();
        console.log('✅ Firebase Storage initialized');
        
        // Enable offline persistence for mobile
        db.enablePersistence({
            synchronizeTabs: true
        })
        .then(() => {
            console.log('✅ Offline persistence enabled');
        })
        .catch((err) => {
            if (err.code === 'failed-precondition') {
                console.warn('⚠️ Multiple tabs open - offline in one tab only');
            } else if (err.code === 'unimplemented') {
                console.warn('⚠️ Browser doesn\'t support offline');
            }
        });
        
        console.log('🚀 Firebase Ready!');
        console.log('👤 Owner:', OWNER_INFO.name);
        
    } else {
        console.error('❌ Firebase SDK not loaded!');
    }
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// ==================== Export for Global Use ====================
window.db = db;
window.auth = auth;
window.storage = storage;
window.OWNER_INFO = OWNER_INFO;

// ==================== Utility Functions ====================

// Test Firebase Connection
window.testFirebaseConnection = async function() {
    try {
        if (!db) {
            throw new Error('Firestore not initialized');
        }
        
        // Try to write a test document
        const testRef = await db.collection('_connection_tests').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: 'Connection test',
            userAgent: navigator.userAgent
        });
        
        // Read it back
        const testDoc = await testRef.get();
        
        if (testDoc.exists) {
            console.log('✅ Test document written and read successfully');
            
            // Delete test document (cleanup)
            await testRef.delete();
            console.log('✅ Test document cleaned up');
            
            return {
                success: true,
                message: '✅ Firebase is working perfectly!'
            };
        } else {
            throw new Error('Test document not found');
        }
        
    } catch (error) {
        console.error('❌ Firebase connection test failed:', error);
        return {
            success: false,
            message: '❌ Firebase error: ' + error.message
        };
    }
};

// Get Server Timestamp
window.getServerTimestamp = function() {
    return firebase.firestore.FieldValue.serverTimestamp();
};

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
    const msg = message ? encodeURIComponent(message) : defaultMsg;
    window.open(`https://wa.me/${OWNER_INFO.phone1}?text=${msg}`, '_blank');
};

// ==================== Firestore References ====================
// Collections
window.COLLECTIONS = {
    MASONS: 'masons',
    TILES: 'tiles',
    REVIEWS: 'reviews',
    ORDERS: 'orders',
    USERS: 'users',
    SETTINGS: 'settings'
};

// Helper function to get collection reference
window.getCollection = function(collectionName) {
    if (!db) {
        console.error('Firestore not initialized');
        return null;
    }
    return db.collection(collectionName);
};

// Helper function to get document reference
window.getDocument = function(collectionName, docId) {
    if (!db) {
        console.error('Firestore not initialized');
        return null;
    }
    return db.collection(collectionName).doc(docId);
};

console.log('📦 Firebase module loaded with all utilities');
