document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(json => {
        json.forEach( dog => renderDogs(dog) )
    
    })
}

function renderDogs(dog){

    // const getDiv = document.querySelector(".margin flex")
    const getTable = document.getElementById("dogs-table")
    const createTable = document.createElement("TABLE")


        createTable.innerText = dog.breed
        createTable.innerText = dog.name
        createTable.innerText = dog.sex
        getTable.appendChild(createTable)


    

}


