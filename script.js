const requiredInputs = document.getElementsByClassName("required")

for (const element of requiredInputs) {
    const star = element.lastChild;
    star.setAttribute("style", "color:#d93025;")
}

const nextBtn = document.getElementById("next")
const backBtn = document.getElementById("back")
const submitBtn = document.getElementById("submit")
const clearBtn = document.getElementById("clear")

submitBtn.hidden = true;
backBtn.hidden = true;

const templateForm = document.getElementById("student-1-details")
const mainForm = document.getElementById("main-form");
let formElements = mainForm.children;
formElements = [...formElements];
console.log(formElements);

const Next = () => {

    const currentElement = formElements.find(element => !(element.hidden))
    const currentElementID = currentElement.getAttribute("id")

    console.log(currentElement);
    console.log(currentElementID);

    if (currentElementID == "personal-details") {
        let totalStudents = document.getElementById("total-students").value;
        console.log(`Total Students : ${totalStudents}`);
        console.log(`formElements.length : ${formElements.length}`);
        if (totalStudents != formElements.length - 1) {
            updateStudentForms(totalStudents);
        }
        goto(1);
    } else {
        let i = Number(currentElementID.split("-")[1])
        goto(i+1)
    }

}

const Back = () => {

    const currentElement = formElements.find(element => !(element.hidden))
    const currentElementID = currentElement.getAttribute("id")

    console.log(currentElement);
    console.log(currentElementID);

    if (currentElementID == "student-1-details") {
        goto(0);
    } else {
        let i = Number(currentElementID.split("-")[1])
        goto(i-1)
    }

}

const goto = (n) => {

    for (const element of formElements) {
        element.hidden = true;
    }

    let id = (n == 0) ? `personal-details` : `student-${n}-details`
    let nextElement = document.getElementById(id);
    
    nextElement.hidden = false;

    if(formElements.length - 1 == n) {
        nextBtn.hidden = true;
        submitBtn.hidden = false;
    } else {
        nextBtn.hidden = false;
        submitBtn.hidden = true;
    }

    if(n == 0){
        backBtn.hidden = true;
    } else {
        backBtn.hidden = false;
    }
}

const updateStudentForms = (n) => {
    const availableForms = formElements.length - 1;

    console.log(`required student forms ${n}`);
    console.log(`availableForms ${availableForms}`);

    if (availableForms < n) {
        const fragment = document.createDocumentFragment();
        for (let i = availableForms + 1; i <= n; i++) {
            const clone = templateForm.cloneNode(true);
            clone.setAttribute("id", `student-${i}-details`)
            fragment.appendChild(clone)
        }
        mainForm.appendChild(fragment);
    } else {
        for (let i = availableForms; i > n; i--) {
            console.log(`student-${i}-details`);
            const element = document.getElementById(`student-${i}-details`);
            element.remove();
        }
    }

    formElements = document.getElementById("main-form").children;
    formElements = [...formElements]
    console.log(formElements);
}

