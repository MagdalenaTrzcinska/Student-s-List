const btnAdd = document.querySelector("button");


const firebaseConfig = {
    apiKey: "AIzaSyCIthAq7OP5fwoAZbgam594PB1KMnRGXjo",
    authDomain: "student-85a0e.firebaseapp.com",
    projectId: "student-85a0e",
    storageBucket: "student-85a0e.appspot.com",
    messagingSenderId: "232860863602",
    appId: "1:232860863602:web:9e521ec9a2e3bc896146eb"
};

const table = document.querySelector('tbody');
const tr = document.createElement("tr");

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let ref = database.ref("student");
let index = 0;

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    if (checkInputs()) {
        addingToBase();
    }
});


ref.once("value", (snapshot) => {
    let delay = 0;

    snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        const tr = document.createElement("tr");
        tr.className = 'person';
        let key = Object.keys(snapshot.val());
        let id = parseInt(key[index]) + 1;

        tr.innerHTML = `<td style="animation-delay:${delay}s">${id}</td>
    <td style="animation-delay:${delay}s">${data.name}</td>
    <td style="animation-delay:${delay}s">${data.surname}</td>
    <td style="animation-delay:${delay}s">${data.email}</td>`;
        table.appendChild(tr);

        delay += 0.1;
        index++;
    });

});



function addingToBase() {
    firebase.database().ref('student/' + index).set({
        name: name.value,
        surname: surname.value,
        email: email.value
    });

    const tr = document.createElement("tr");

    tr.innerHTML = `<th scope="row">${index}</th>
        <td>${name.value}</td>
        <td>${surname.value}</td>
        <td>${email.value}</td>`;

    table.appendChild(tr);
    index++;
}
