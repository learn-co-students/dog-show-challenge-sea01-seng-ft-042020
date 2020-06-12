const DOGS_URL = "http://localhost:3000/dogs";

document.addEventListener("DOMContentLoaded", () => {
const table = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')

  function fetchDogs() {
    fetch(DOGS_URL)
      .then(response => response.json())
      .then(json => {
        json.forEach(dog => {
          buildDogCard(dog);
        });
      });
  }

function buildDogCard(dog) {

let newDog = document.createElement('tr')
  newDog.className = `${dog.id}`

let name = document.createElement('td')
  name.innerText = dog.name
  name.id = `${dog.id}_name`

let breed = document.createElement('td')
  breed.innerText = dog.breed
  breed.id = `${dog.id}_breed`

let sex = document.createElement('id')
  sex.innerText = dog.sex
  sex.id = `${dog.id}_sex`

let editDog = document.createElement('td')

let editBtn = document.createElement('button')
editBtn.innerText = 'edit'
editBtn.id = `editId_${dog.id}`
editBtn.addEventListener('click', () => {
  changeFormValues(dog)
})

editDog.appendChild(editBtn)

newDog.appendChild(name)
newDog.appendChild(breed)
newDog.appendChild(sex)
newDog.appendChild(editDog)

table.appendChild(newDog)

}

function changeFormValues(dog) {
  // let dogElement = document.getElementsByClassName(`${editClass}`)
  dogForm.name.value = dog.name
  dogForm.breed.value = dog.breed
  dogForm.sex.value = dog.sex

  let hiddenId = document.createElement('input')
  hiddenId.type = 'hidden'
  hiddenId.name = 'id'
  hiddenId.value = dog.id
  
  dogForm.appendChild(hiddenId)


}

  dogForm.addEventListener('submit', function(event) {
    event.preventDefault()
    // debugger 

    let name = event.target.name.value
    event.target.name.value = ''
    // console.log(name)
  
    let breed = event.target.breed.value
    event.target.breed.value = ''
    // console.log(breed)  

    let sex = event.target.sex.value
    event.target.sex.value = ''
    // console.log(sex)

    let id = parseInt(event.target.id.value)
    // console.log(id)

    const editedDog = document.getElementsByClassName(`${id}`)

    const editName  = document.getElementById(`${id}_name`)
    // console.log(editName)
    // debugger

    const editBreed = document.getElementById(`${id}_breed`)
    // console.log(editName)
    // debugger

    const editSex = document.getElementById(`${id}_sex`)
    // console.log(editSex)
    // debugger


    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"name":name, "breed":breed, "sex":sex})
    }
    fetch(`${DOGS_URL}/${id}`,configObject)

      .then(response => response.json())
      .then(json => (editName.innerText = json.name, editBreed.innerText = json.breed, editSex.innerText = json.sex))
      // .then(json => (editName.innerText = json.name))
  
  })
  
  


fetchDogs();





});

// const DOGS_URL = "http://localhost:3000/dogs";

// document.addEventListener("DOMContentLoaded", () => {
//   // constant for table body to append found dogs from API to
//   const tableBody = document.querySelector("#table-body");
//   // constant to find dog form so we use it to edit
//   const dogForm = document.querySelector('#dog-form')
//   // On page load, render a list of already registered dogs in the table
//   function fetchDogs() {
//     fetch(DOGS_URL)
//       .then((response) => response.json())

//       // Shows that all dogs are collected
//       // .then(json => console.log(json))

//       // iterate over the json object
//       // build a dog card for each dog that you iterate over
//       .then((json) => {
//         json.forEach((dog) => {
//           // add the dog card for each of the dogs in our API
//           buildDogCard(dog);
//         });
//       });
//   }

//   // create a dog card
//   function buildDogCard(dog) {
//     // creates table header
//     let newDog = document.createElement("tr");
//     // gives each new dog a table header
//     newDog.className = dog["id"];

//     // creates table dimension
//     let name = document.createElement("td");
//     // gives table dimension the name of the dog
//     name.textContent = dog["name"];

//     let breed = document.createElement("td");
//     breed.textContent = dog["breed"];

//     let sex = document.createElement("td");
//     sex.textContent = dog["sex"];

//     // creates dimension for button
//     let dogEditor = document.createElement("td");

//     // creates button
//     btn = document.createElement("button");
//     btn.innerText = "edit";
//     btn.className = "edit-btn";
//     btn.id = dog.id

//     // appending the button to the table dimension
//     dogEditor.appendChild(btn);
//     // appending all the elements to the new dog row
//     newDog.appendChild(name);
//     newDog.appendChild(breed);
//     newDog.appendChild(sex);
//     newDog.appendChild(dogEditor);
//     // appending the entire newDog row to the tableBody
//     tableBody.appendChild(newDog);
//   }
//   // Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
//   // add event listner for click. Handle the event with editHandler function
//   document.addEventListener('click', editHandler)

//   function editHandler(event) {
//     // prevents page from having to reload to show change
//     event.preventDefault()
//     // if the click event is for an edit button run the following logic
//     if(event.target.className === "edit-btn") {
//     // create editDog function to populate the dogs info in the dog-form that actually edits the dog
//         editDog(event.target.id)
//     }
//   }

//   // function fetches the url of the identied dog and puts the values in the fields associated with the dog
//   function editDog(id) {
//     fetch(`${DOGS_URL}/${id}`)
//     .then(response => response.json())
//     .then((dog) => {
//         dogForm.name.value = dog.name,
//         dogForm.breed.value = dog.breed,
//         dogForm.sex.value = dog.sex,
//         dogForm.dataset.id = dog.id
//         });
//       }

//     const updateDog = (dog) => {
//         fetch(`${DOGS_URL}/${dog.id}`, {
//             method: "Patch",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//             body: JSON.stringify(dog),
//         })
//         .then(response) => res.json());
//         .then(json) => {

//         })
//     }

//     dogForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//         const newName = event.target.name.value
//         const newBreed = event.target.breed.value
//         const newSex = event.target.sex.value
//         const newId = event.target.id.value
//         const newImprovedDog = { newName, newBreed, newSex, newId};
//         updateDog(newImprovedDog);
//     })

//   fetchDogs();
// });
