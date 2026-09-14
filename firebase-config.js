// ============================================================
// CONFIGURAÇÃO DO FIREBASE — projeto: camera-geolocalizacao
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBPNculsiJiz20IW3IReG7D_2_xD4JZdek",
  authDomain: "camera-geolocalizacao-f231f.firebaseapp.com",
  projectId: "camera-geolocalizacao-f231f",
  messagingSenderId: "338980626940",
  appId: "1:338980626940:web:fe443c30b032d67c419279"
};

// URL pública onde o verify.html está hospedado
const VERIFY_BASE_URL = "https://carbankapp1-dev.github.io/foto-carro-geo-localizacao/verify.html";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Tamanho máximo (em caracteres base64) que a foto pode ter para
// caber com folga no limite de 1 MB por documento do Firestore
const MAX_FOTO_BASE64_LEN = 700000;

// Login anônimo — necessário para as regras de segurança do Firestore
// exigirem "request.auth != null" sem precisar de tela de login para o usuário
function ensureAuth() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        auth.signInAnonymously().catch(reject);
      }
    });
  });
}
