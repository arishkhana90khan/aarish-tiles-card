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

// Admin Login Credentials (यही आपका लॉक है)
const ADMIN_CREDENTIALS = {
    username: "arishadmin",
    password: "aarish@123",
    ownerId: "ARK001",
    ownerKey: "arish@tiles#2024"
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
    if (typeof firebase !== 'undefined') {
        console.log('✅ Firebase SDK loaded');
        
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
        
        db.enablePersistence({
            synchronizeTabs: true
        })
        .then(() => console.log('✅ Offline mode enabled'))
        .catch(err => console.warn('⚠️ Offline mode error:', err));
        
        console.log('✅ Firebase Ready!');
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
window.ADMIN_CREDENTIALS = ADMIN_CREDENTIALS;

// ==================== Utility Functions ====================

// Test Firebase Connection
window.testFirebaseConnection = async function() {
    try {
        if (!db) throw new Error('Firestore not initialized');
        
        const testRef = await db.collection('_connection_tests').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: 'Connection test',
            userAgent: navigator.userAgent
        });
        
        await testRef.delete();
        return { success: true, message: '✅ Firebase is working perfectly!' };
    } catch (error) {
        return { success: false, message: '❌ Firebase error: ' + error.message };
    }
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

// Admin Login Function
window.adminLogin = function(username, password, ownerId, ownerKey) {
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password &&
        ownerId === ADMIN_CREDENTIALS.ownerId &&
        ownerKey === ADMIN_CREDENTIALS.ownerKey) {
        
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminName', 'Arish Khan');
        return { success: true, message: 'लॉगिन सफल!' };
    } else {
        return { success: false, message: '❌ गलत क्रेडेंशियल्स!' };
    }
};

// Check if admin is logged in
window.isAdminLoggedIn = function() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
};

// Admin Logout
window.adminLogout = function() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminName');
    window.location.href = 'admin-login.html';
};

// ==================== Firestore References ====================
window.COLLECTIONS = {
    MASONS: 'masons',
    TILES: 'tiles',
    REVIEWS: 'reviews',
    ORDERS: 'orders',
    USERS: 'users',
    SETTINGS: 'settings'
};

console.log('📦 Firebase module loaded with all utilities');
console.log('🔐 Admin Lock Credentials are set');
