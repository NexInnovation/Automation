// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBr5JzHhz0Lt-Wk-L-pH_kPz8lBuJfRUyA",
    authDomain: "office-automation-9fc59.firebaseapp.com",
    databaseURL: "https://office-automation-9fc59-default-rtdb.firebaseio.com",
    projectId: "office-automation-9fc59",
    storageBucket: "office-automation-9fc59.appspot.com",
    messagingSenderId: "969334655990",
    appId: "1:969334655990:web:e94c37a726f558823d15d7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Auto-login using device credentials
const email = "esp32.nexinnovation@gmail.com";
const password = "ESP32.NexInnovation.Automation";

auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        // console.log("✅ Firebase authenticated");
        initializeSwitches();
    })
    .catch((error) => {
        alert("Firebase login failed: " + error.message);
    });

function initializeSwitches() {
    const relays = ["r1", "r2", "r3", "r4", "r5", "r6"];
    const buttonIds = ["button1", "button2", "button3", "button4", "button5", "button6"];

    relays.forEach((relay, index) => {
        const checkbox = document.getElementById(buttonIds[index]);
        const relayRef = database.ref(`main_office/${relay}`);

        // Reflect real-time changes from Firebase
        relayRef.on("value", (snapshot) => {
            checkbox.checked = snapshot.val() === true;
        });

        // Update Firebase when toggle is clicked
        checkbox.addEventListener("change", () => {
            relayRef.set(checkbox.checked);
        });
    });
}