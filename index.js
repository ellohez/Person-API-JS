'use strict'; // Stop any JS shenanigans

// anonymous function to contain our variables 
(async function() {
    // Variables
    const OUTPUT = document.querySelector("#output");
    const ADDRESS = "http://localhost:8080"; 
    let currentPerson = {};

    // Methods
    async function getPeople() {
        try {
            output.innerHTML = "";
            const res = await axios.get(`${ADDRESS}/getAll`);
            //console.log(res); // Testing
            res.data.forEach(person => renderPerson(person));
        } catch (e) {
            console.error(e);
        }
    }

    function renderPerson(person) {
        const newPerson = document.createElement("div");
        console.log(person); // Testing 
        // newPerson.innerText = `Person Name: ${person.fullName},
        //                  ${person.oldNess}, ${person.occupation}`;
        // DOC_ROW.appendChild(newPerson);
        newPerson.classList.add("col");
        const personCard = document.createElement("div");
        personCard.classList.add("card");
        
        const pCardBody = document.createElement("div");
        pCardBody.classList.add("card-body");

        const pName = document.createElement("p");
        pName.innerText = `Name: ${person.fullName}`;
        pName.classList.add("card-text");
        pCardBody.appendChild(pName);

        const pAge = document.createElement("p");
        pAge.innerText = `Age: ${person.oldNess}`;
        pAge.classList.add("card-text");
        pCardBody.appendChild(pAge);

        const pJob = document.createElement("p");
        pJob.innerText = `Job: ${person.occupation}`;
        pJob.classList.add("card-text");
        pCardBody.appendChild(pJob);

        // const pNum = document.createElement("p");
        // pNum.innerText = `Num: ${person.NotNiNumber}`;
        // pNum.classList.add("card-text");
        // pCardBody.appendChild(pNum);

        const updateBtn = document.createElement("button");
        updateBtn.innerText = 'Update';
        updateBtn.classList.add("btn", "btn-primary");
        updateBtn.setAttribute("data-bs-toggle", "modal");
        updateBtn.setAttribute("data-bs-target", "#myModal");
        updateBtn.addEventListener('click', () => {
            currentPerson = person;    
            modalUpdate();
        });
        pCardBody.appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener('click', () => deletePerson(person.id));
        pCardBody.appendChild(deleteBtn);

        personCard.appendChild(pCardBody);
        newPerson.appendChild(personCard);

        OUTPUT.appendChild(newPerson);
    }

    async function deletePerson(id) {
        try {
            const res = await axios.delete(`${ADDRESS}/remove/${id}`);
            getPeople();
        } catch(error) {
            console.error(error);
        }
    }
        
    async function getPerson(id) {
        try {
            // output.innerHTML = "";
            const res = await axios.get(`${ADDRESS}/get/${id}`);
            //console.log(res); // Testing
           return res.data[0];
        } catch (error) {
            console.error(error);
        }
    }

    async function updatePerson(person) {
        // TODO: complete this
        debugger; // Testing
        try {
            const res = await axios.patch(`${ADDRESS}/update/${currentPerson.id}?age=${person.age}&name=${person.name}&job=${person.job}`);
        } catch(error) {
            console.error(error);
        }
    }

    function modalUpdate() {
        const modal = document.querySelector("#myModal");
        // Testing
        console.log(`Current person -> ID: ${currentPerson.id}, 
                            Name: ${currentPerson.fullName}, Age: ${currentPerson.age}`);

        const nameText = document.querySelector("#mFullName");
        // TODO - shorten these!
        nameText.value = currentPerson.fullName;
        const ageText = document.querySelector("#mAge");
        ageText.value = currentPerson.oldNess;
        const jobText = document.querySelector("#mJob");
        jobText.value = currentPerson.occupation;
    }

    document.getElementById("pplForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const {fName, age, job} = this;
        
        const newPerson = {
            fullName: fName.value,
            oldNess: age.value,
            occupation: job.value,
            // NotNiNumber: IdNumber.value
        }
        this.reset();
        fName.focus();
        // TODO: Split this out into createPerson() function?
        try {
            const res = await axios.post(`${ADDRESS}/create`, newPerson);
            getPeople();
        } catch(error) {
            console.error(error);
        }
    });

    document.getElementById("myModal").addEventListener("submit", async function(e) {
        e.preventDefault();

        debugger;
        // TODO: Shorten these
        const mFName = document.getElementById("mFullName");
        const mAge = document.getElementById("mAge");
        const mJob = document.getElementById("mJob");
        // const {mFName, mAge, mJob} = this;
        const updatedPerson = {
            name: mFName.value,
            age: mAge.value,
            job: mJob.value,
        }

        debugger;
        updatePerson(updatedPerson);
        // TODO: close the modal?
        document.getElementById("myModal").hide();
        // Refresh info
        getPeople();
    });

    getPeople();

}) ();