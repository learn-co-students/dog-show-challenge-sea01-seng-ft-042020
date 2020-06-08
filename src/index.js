document.addEventListener('DOMContentLoaded', () => {
    const dogURL = 'http://localhost:3000/dogs'
    const dog_form = document.getElementById("dog-form")
    const hidden_id = document.createElement("input")
    hidden_id.type = 'hidden'
    hidden_id.name = 'dog_id'
    dog_form.appendChild(hidden_id)
    dog_form.parentNode.hidden = true

    function addDog(dog){
        const table = document.querySelector("table")

        const tableRow = document.createElement("tr")

        const name = document.createElement("td")
        name.className = 'padding center name'
        name.innerText = dog.name

        const breed = document.createElement("td")
        breed.className = 'padding center breed'
        breed.innerText = dog.breed

        const sex = document.createElement("td")
        sex.className = 'padding center sex'
        sex.innerText = dog.sex

        const editbutton = document.createElement("td")
        editbutton.className = 'padding center'
        editbutton.innerHTML = dog.editbutton
        editbutton.innerText = ""

        const button = document.createElement("button")
        button.innerText = "Edit"
        button.id = dog.id
        editbutton.appendChild(button)

        addEditButton(button)

        tableRow.appendChild(name)
        tableRow.appendChild(breed)
        tableRow.appendChild(sex)
        tableRow.appendChild(editbutton)

        table.appendChild(tableRow)
    }

    function addEditButton(button) {
        button.addEventListener("click", function(event){
            dog_form.parentNode.hidden = false
            
            console.log(event.target.id)
            dog_form.name.value = event.target.parentNode.parentNode.querySelector(".name").innerText
            dog_form.breed.value = event.target.parentNode.parentNode.querySelector(".breed").innerText
            dog_form.sex.value = event.target.parentNode.parentNode.querySelector(".sex").innerText
            dog_form.dog_id.value = event.target.id

            console.log(dog_form)
        })
    }

    function addEditSubmit(dog_form) {
        dog_form.addEventListener("submit", function(event) {
            event.preventDefault()

            const configObj = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "name": event.target.name.value,
                    "breed": event.target.breed.value,
                    "sex": event.target.sex.value
                })
            }

            fetch(dogURL + `/${event.target.dog_id.value}`, configObj)
            .then(resp => resp.json())
            .then(json => {
                const parent = document.getElementById(json.id).parentNode.parentNode
                parent.querySelector(".name").innerText = json.name
                parent.querySelector(".breed").innerText = json.breed
                parent.querySelector(".sex").innerText = json.sex
            })

            event.target.name.value = ''
            event.target.breed.value = ''
            event.target.sex.value = ''
            event.target.dog_id.value = ''

            event.target.parentNode.hidden = true
        })
    }
    
    function fetchDogs() {
        fetch(dogURL)
        .then(resp => resp.json())
        .then(json => {
            json.forEach(dog => addDog(dog))
        })
    }

    fetchDogs()
    addEditSubmit(dog_form)
})