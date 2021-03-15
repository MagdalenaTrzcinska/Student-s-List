const btnAdd = document.querySelector("button");
const table = document.querySelector('tbody');

const firebaseConfig = {
    apiKey: "AIzaSyCIthAq7OP5fwoAZbgam594PB1KMnRGXjo",
    authDomain: "student-85a0e.firebaseapp.com",
    projectId: "student-85a0e",
    storageBucket: "student-85a0e.appspot.com",
    messagingSenderId: "232860863602",
    appId: "1:232860863602:web:9e521ec9a2e3bc896146eb"
};

firebase.initializeApp(firebaseConfig);

let students = [];
let delay = 0.1;
let index = 0;

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();

    if (checkInputs()) {
        setTimeout(addingToBase, 400);

    }
});
function addingToBase() {
    firebase.database().ref('student/' + index).set({
        name: name.value,
        surname: surname.value,
        email: email.value
    });
    const data = {
        email: email.value,
        name: name.value,
        surname: surname.value,
        id: index
    };

    index++;
    resetForm();
    students.push(data);
    addingToTable(data);
}

function resetForm() {
    document.getElementById('form').reset();
    formControl.forEach((event) => {
        event.classList.remove('success');
        event.classList.remove('error');
    })
}

function readingFromBase() {
    students = [];
    firebase.database().ref('student').once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val();
            let key = Object.keys(snapshot.val());
            let id = parseInt(key[index]);

            data.id = id;
            index++;
            students.push(data);
            console.log(students);
            addingToTable(data);
        });
    });
}

function addingToTable(data) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td style="animation-delay:${delay}s">${data.name}</td>
    <td style="animation-delay:${delay}s">${data.surname}</td>
    <td style="animation-delay:${delay}s">${data.email}</td>`;
    table.appendChild(tr);
    delay += 0.1;

    tr.addEventListener('click', () => {
        deletingSingle(data.id);
    });
}

readingFromBase();


function deletingSingle(id) {
    //students.splice(data.id, 0);
    table.innerHTML = '';
    readingFromBase();
    firebase.database().ref('student/' + id).remove();

}

