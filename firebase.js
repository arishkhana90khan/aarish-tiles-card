// ==================== Aarish Tiles Network – Firebase Config ====================
const firebaseConfig = {
  apiKey: "AIzaSyB-_sy4cKvvDjz0R4CNj84kejcjqsyBVsM",
  authDomain: "aarish-tiles-network.firebaseapp.com",
  projectId: "aarish-tiles-network",
  storageBucket: "aarish-tiles-network.firebasestorage.app",
  messagingSenderId: "1097113885546",
  appId: "1:1097113885546:web:1b6bcdf8f3cfe20d9e2313",
  measurementId: "G-G2N8FYWV63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Enable offline persistence (mobile friendly)
db.enablePersistence().catch(err => console.warn("Offline error:", err));

// ==================== Owner Contact Info ====================
const OWNER_INFO = {
  name: "Arish Khan",
  phone1: "8755687268",
  phone2: "9528340961",
  email: "arishkhana90@gmail.com",
  instagram: "arishkhan3992__",
  instagramUrl: "https://www.instagram.com/arishkhan3992__"
};

const ADMIN_CREDENTIALS = {
  username: "arishadmin",
  password: "aarish@123",
  ownerId: "ARK001",
  ownerKey: "arish@tiles#2024"
};

// ==================== Global Functions ====================
window.db = db;
window.auth = auth;
window.storage = storage;
window.OWNER_INFO = OWNER_INFO;
window.ADMIN_CREDENTIALS = ADMIN_CREDENTIALS;

// Test connection
window.testFirebaseConnection = async function() {
  try {
    const testRef = await db.collection("_test").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      msg: "Connection OK"
    });
    await testRef.delete();
    return { success: true, message: "✅ Firebase ठीक काम कर रहा है!" };
  } catch (e) {
    return { success: false, message: "❌ त्रुटि: " + e.message };
  }
};

// Contact functions (FIXED)
window.callOwner = function(phone) {
  window.location.href = `tel:${phone}`;
};

window.emailOwner = function() {
  window.location.href = `mailto:${OWNER_INFO.email}`;
};

window.openInstagram = function() {
  window.open(OWNER_INFO.instagramUrl, '_blank');
};

window.whatsappOwner = function(message = '') {
  const defaultMsg = encodeURIComponent("नमस्ते, Aarish Tiles Network के बारे में पूछताछ करनी है।");
  const text = message ? encodeURIComponent(message) : defaultMsg;
  window.open(`https://wa.me/${OWNER_INFO.phone1}?text=${text}`, '_blank');
};

// Admin login functions
window.isAdminLoggedIn = () => sessionStorage.getItem("adminLoggedIn") === "true";

window.adminLogin = (username, password, ownerId, ownerKey) => {
  if (username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password &&
      ownerId === ADMIN_CREDENTIALS.ownerId &&
      ownerKey === ADMIN_CREDENTIALS.ownerKey) {
    sessionStorage.setItem("adminLoggedIn", "true");
    sessionStorage.setItem("adminName", "Arish Khan");
    return { success: true };
  }
  return { success: false, message: "❌ गलत क्रेडेंशियल्स!" };
};

window.adminLogout = () => {
  sessionStorage.removeItem("adminLoggedIn");
  sessionStorage.removeItem("adminName");
  window.location.href = "admin-login.html";
};

console.log("✅ Firebase Ready!");
