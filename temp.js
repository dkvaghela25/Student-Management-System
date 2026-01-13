const obj = {
    "fullName": "Divyang Vaghela",
    "emailID": "dkv@gmail.com",
    "totalStudents": "3",
    "fullName-1": "ABC",
    "emailID-1": "abc@gmail.com",
    "phoneNo-1": "9123456789",
    "branch-1": "Computer Science",
    "Divison": "A",
    "enrolmentNo-1": "ABC1",
    "fullName-2": "XYZ",
    "emailID-2": "xyz@gmail.com",
    "phoneNo-2": "9456123789",
    "branch-2": "Information Technology",
    "Divison-2": "B",
    "enrolmentNo-2": "XYZ1",
    "fullName-3": "PQR",
    "emailID-3": "pqr@gmail.com",
    "phoneNo-3": "9789456123",
    "branch-3": "Electrical",
    "Divison-3": "A",
    "enrolmentNo-3": "PQR1"
}

const dataObj = {}

dataObj.fullName = obj.fullName
dataObj.emailID = obj.emailID
dataObj.totalStudents = obj.totalStudents

delete obj.fullName
delete obj.emailID
delete obj.totalStudents


for (let [key, value] of Object.entries(obj)) {
    console.log(key);
    key = key.split("-")[0]
    console.log(key);
}