const requiredInputs = document.getElementsByClassName("required")

for (const element of requiredInputs) {
    const star = element.lastChild;
    star.setAttribute("style", "color:#d93025;")
}

const nextBtn = document.getElementById("next")
const backBtn = document.getElementById("back")
const submitBtn = document.getElementById("submit")
const clearBtn = document.getElementById("clear")

const studentTable = document.getElementById("student-table");

submitBtn.hidden = true;
backBtn.hidden = true;

const templateForm = document.getElementById("student-1-details")

const mainForm = document.getElementById("main-form");
let formElements = mainForm.children;
formElements = [...formElements];
console.log(formElements);



const Next = (event) => {

    event.preventDefault();

    const currentElement = formElements.find(element => !(element.hidden))
    const currentElementID = currentElement.getAttribute("id")

    console.log(currentElement);
    console.log(currentElementID);

    if (currentElementID == "personal-details") {
        let totalStudents = document.getElementById("total-students").value;
        console.log(`Total Students : ${totalStudents}`);
        console.log(`formElements.length : ${formElements.length}`);
        if (totalStudents != formElements.length - 2) {
            console.log(`Upadting ===========================================================`);
            updateStudentForms(totalStudents);
        }
        goto(1);
    } else {
        let i = Number(currentElementID.split("-")[1])
        goto(i + 1)
    }

}

const Back = (event) => {

    event.preventDefault();

    const currentElement = formElements.find(element => !(element.hidden))
    const currentElementID = currentElement.getAttribute("id")

    console.log(currentElement);
    console.log(currentElementID);

    if (currentElementID == "student-1-details") {
        goto(0);
    } else {
        let i = Number(currentElementID.split("-")[1])
        goto(i - 1)
    }

}

const Submit = (event) => {
    event.preventDefault();

    const dataObj = {}
    const formData = new FormData(event.target)
    const obj = Object.fromEntries(formData.entries());

    dataObj.fullName = obj.fullName
    dataObj.emailID = obj.emailID
    dataObj.totalStudents = obj.totalStudents
    dataObj.Students = {};

    const Students = dataObj.Students

    delete obj.fullName
    delete obj.emailID
    delete obj.totalStudents

    for (let [key, value] of Object.entries(obj)) {
        name = key.split("-")[0]
        id = key.split("-")[1]
        if (Students[`student-${id}`] === undefined) {
            Students[`student-${id}`] = {};
        }
        Students[`student-${id}`][name] = value;
    }

    console.log(dataObj);

    generateStudentTable(Students);

}

nextBtn.addEventListener('click', Next)
backBtn.addEventListener('click', Back)

const goto = (n) => {

    for (const element of formElements) {
        element.hidden = true;
    }

    let id = (n == 0) ? `personal-details` : `student-${n}-details`
    let nextElement = document.getElementById(id);

    nextElement.hidden = false;

    if (formElements.length - 2 == n) {
        nextBtn.hidden = true;
        submitBtn.hidden = false;
    } else {
        nextBtn.hidden = false;
        submitBtn.hidden = true;
    }

    if (n == 0) {
        backBtn.hidden = true;
    } else {
        backBtn.hidden = false;
    }
}

const updateStudentForms = (n) => {
    const availableForms = formElements.length - 2;

    console.log(`required student forms ${n}`);
    console.log(`availableForms ${availableForms}`);

    if (availableForms < n) {
        const buttons = document.getElementsByClassName("buttons")[0];
        const fragment = document.createDocumentFragment();
        for (let i = availableForms + 1; i <= n; i++) {
            const clone = templateForm.cloneNode(true);
            clone.setAttribute("id", `student-${i}-details`)
            const inputElements = clone.querySelectorAll('[name]')
            for (const element of inputElements) {
                let name = element.name;
                name = name.split("-")[0]
                element.setAttribute("name", `${name}-${i}`)
            }
            fragment.appendChild(clone)
        }
        mainForm.insertBefore(fragment, buttons);
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

const generateStudentTable = (students) => {
    const defaultProfilePicture = 'https://res.cloudinary.com/dycqdhycj/image/upload/v1744885687/default-profile-picture_lrivmz.png'
    
    const tempStudent = studentTable.getElementsByClassName("student")[0];
    
    for (const [key, value] of Object.entries(students)) {
        const clone = tempStudent.cloneNode(true);
        const dynamicValues = clone.querySelectorAll('[class]')

        for (const element of dynamicValues) {
            let className = element.classList[0];
            if(className == 'profile-img') {
                element.src = value[className] || defaultProfilePicture;
            } else {
                element.innerHTML = value[className]
            }
        }

        studentTable.appendChild(clone);
    }

    tempStudent.remove();

    mainForm.hidden = true;
    studentTable.hidden = false;
    
}