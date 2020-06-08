document.addEventListener('DOMContentLoaded', () => {
    const DOG_URL = 'http://localhost:3000/dogs'
    const tbodyboy = document.getElementById('table-body');
    const adoption_form = document.getElementById('dog-form')
    const dog_tags = document.createElement('input')
    dog_tags.name = 'dog_tags'
    dog_tags.setAttribute('type', 'hidden');
    adoption_form.appendChild(dog_tags);
    adoption_form.parentNode.hidden = true

    function putDogInKennel(dog){
        const dog_cage = document.createElement('tr')
        const name = document.createElement('td')
        name.className = `name padding`
        name.innerText = dog.name
        const breed = document.createElement('td')
        breed.className = `breed padding`
        breed.innerText = dog.breed
        const sex = document.createElement('td')
        sex.className = 'sex padding'
        sex.innerText = dog.sex
        const ah_ts_push_it = document.createElement('button')
        ah_ts_push_it.innerText = "Edit"
        ah_ts_push_it.className = 'padding'
        ah_ts_push_it.id = dog.id
        listenToYourDog(ah_ts_push_it)
        const john = document.createElement('td')
        john.appendChild(ah_ts_push_it);
        dog_cage.appendChild(name);
        dog_cage.appendChild(breed)
        dog_cage.appendChild(sex)
        dog_cage.appendChild(john)
        tbodyboy.appendChild(dog_cage)

    }
    
    function listenToYourDog(button){
        button.addEventListener('click', function(e){
            adoption_form.parentNode.hidden = false
            const dog_info = e.target.parentNode.parentNode
            adoption_form.name.value = dog_info.querySelector('.name').innerHTML
            adoption_form.breed.value = dog_info.querySelector('.breed').innerHTML
            adoption_form.sex.value = dog_info.querySelector('.sex').innerHTML
            adoption_form.dog_tags.value = e.target.id
        })
    }

    adoption_form.addEventListener("submit", function(e){
        adoption_form.parentNode.hidden = true
        e.preventDefault();
        whoLetTheDogsOut(e)
        e.target.name.value = ""
        e.target.breed.value = ""
        e.target.sex.value = ""
        e.target.dog_tags.value = null
        // e.target.submit.disabled = true
    })

    function whoLetTheDogsOut(e){
        const myDog = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }
        const configObj = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(myDog)
        }
        fetch(`http://localhost:3000/dogs/${e.target.dog_tags.value}`, configObj)
        .then(resp => resp.json())
        .then(json => {
            const good_boy = document.getElementById(json.id)
            const dog_info = good_boy.parentNode.parentNode
            dog_info.querySelector(".name").innerHTML = json.name
            dog_info.querySelector(".breed").innerHTML = json.breed
            dog_info.querySelector(".sex").innerHTML = json.sex
        })
    }

    function letsPlayFetch(){
        fetch(DOG_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(dog => putDogInKennel(dog)))
    }
    letsPlayFetch()
})