const dogUrl = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {

    // Fetch all dogs on page load
    buildDogTable()

    // Edit Dog
    document.querySelector("input[type=submit]").addEventListener("click", function(event) {
        event.preventDefault()
        let dog = {}
        dog.id = event.target.name
        dog.name = event.target.parentElement.children[0].value
        dog.breed = event.target.parentElement.children[1].value
        dog.sex = event.target.parentElement.children[2].value
        console.log(dog)
        updateDog(dog)
    })

})

function buildDogRow(dog){
    let dogRow = document.createElement("tr")

    let dogName = document.createElement("td")
    dogName.innerText = dog.name

    let dogBreed = document.createElement("td")
    dogBreed.innerText = dog.breed

    let dogSex = document.createElement("td")
    dogSex.innerText = dog.sex

    let editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.name = dog.id
    editButton.addEventListener("click", event => fillEditForm(event.target))
    
    dogRow.append(dogName)
    dogRow.append(dogBreed)
    dogRow.append(dogSex)
    dogRow.append(editButton)
    document.getElementById("table-body").append(dogRow)
}

function buildDogTable() {
    // Clear existing table
    document.getElementById("table-body").innerHTML = ""
    // Pull dog data
    fetch(dogUrl).then(response => response.json()).then(json => json.forEach(dog => buildDogRow(dog)))
}

function fillEditForm(editTarget) {
    document.querySelector("input[name = name]").value = editTarget.parentElement.children[0].innerText
    document.querySelector("input[name = breed]").value = editTarget.parentElement.children[1].innerText
    document.querySelector("input[name = sex]").value = editTarget.parentElement.children[2].innerText
    document.querySelector("input[type=submit]").name = editTarget.name   
}

function updateDog(dog) {
    let fetchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    }
    fetch(dogUrl + "/" + dog.id, fetchOptions).then(response => response.json()).then(function(json) {
        if (json.id) {
            buildDogTable()
        }
    })

}