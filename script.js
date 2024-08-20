document.addEventListener("DOMContentLoaded", function () {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyD81ldbbftUZFBUycPcI7J9Ev9aIi0Zw-g",
        authDomain: "office-automation-ed735.firebaseapp.com",
        databaseURL: "https://office-automation-ed735-default-rtdb.firebaseio.com",
        projectId: "office-automation-ed735",
        storageBucket: "office-automation-ed735.appspot.com",
        messagingSenderId: "1022647187546",
        appId: "1:1022647187546:web:13be0a1c558153ead88063",
        measurementId: "G-YVZN9S30CZ"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to the Firebase database
    const database = firebase.database();
    const ref = database.ref('data');

    // // Retrieve data from Firebase when page is initialized
    // ref.once('value', function (snapshot) {
    //     var buttonStatesString = snapshot.val();
    //     // console.log('Data retrieved from Firebase:', buttonStatesString);
    //     if (buttonStatesString.length === 6) {
    //         setButtonStates(buttonStatesString);
    //     } else {
    //         console.log('Invalid button states string:', buttonStatesString);
    //         buttonStatesString = '000000'; // Reset button states to default
    //         // console.log('Button states reset', buttonStatesString);
    //         sendDataToFirebase(buttonStatesString);
    //         // console.log('Button states reset');
    //         setButtonStates(buttonStatesString);
    //     }
    // }, function (error) {
    //     console.error('Error retrieving data from Firebase:', error);
    // });

    // Set up listener for changes in button states
    ref.on('value', function (snapshot) {
        var buttonStatesString = snapshot.val();
        console.log('Button states changed in Firebase:', buttonStatesString);
        if (buttonStatesString && buttonStatesString.length === 10) {
            setButtonStates(buttonStatesString);
        } else {
            console.log('Invalid button states string:', buttonStatesString);

            buttonStatesString = '000000'; // Reset button states to default
            // console.log('Button states reset', buttonStatesString);
            sendDataToFirebase(buttonStatesString);
            // console.log('Button states reset');

            // const buttons = document.querySelectorAll('.switch-toggle input[type="checkbox"]');

            // buttons.forEach((button, index) => {
            //     button.addEventListener('change', function () {
            //         const buttonStatesString = Array.from(buttons).map(button => button.checked ? '1' : '0').join('');
            //         sendDataToFirebase(buttonStatesString);
            //     });

            // });

            setButtonStates(buttonStatesString);
        }
    }, function (error) {
        console.error('Error listening for changes in Firebase:', error);
    });

    function setButtonStates(buttonStatesString) {
        // console.log(buttonStatesString);
        // console.log(buttonStatesString.length);
        // buttonStatesString.substring(1, 8);
        // console.log( buttonStatesString.substring(2, 8));
        const buttons = document.querySelectorAll('.switch-toggle input[type="checkbox"]');
        for (let i = 0; i < buttons.length; i++) {
            const buttonState = buttonStatesString.substring(2, 8).charAt(i);
            // console.log(buttonState);
            // console.log(i-2);
            buttons[i].checked = (buttonState === '1');
        }
    }

    const buttons = document.querySelectorAll('.switch-toggle input[type="checkbox"]');

    buttons.forEach((button, index) => {
        button.addEventListener('change', function () {
            const buttonStatesString = Array.from(buttons).map(button => button.checked ? '1' : '0').join('');
            sendDataToFirebase(buttonStatesString);
        });
    });

    function sendDataToFirebase(data) {

        const database = firebase.database();
        const verifierString = '"*' + data + '*"';
        const ref = database.ref('data');

        ref.set(verifierString, function (error) {
            if (error) {
                console.error('Error updating Firebase database:', error);
            } else {
                console.log('Data successfully sent to Firebase:', data);
            }
        });
    }
});