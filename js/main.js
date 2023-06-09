const convertBtn = document.querySelector("#convert")
const dayInput = document.querySelector("#day")
const monthInput = document.querySelector("#month")
const yearInput = document.querySelector("#year")
const formInputs = document.querySelectorAll("form input")
const errorDiv = document.querySelectorAll(".error")
const yearsOutput = document.querySelector(".years span")
const monthsOutput = document.querySelector(".months span")
const daysOutput = document.querySelector(".days span")
const spanResults = document.querySelectorAll(".result span")


convertBtn.addEventListener("click", (e) => {

    e.preventDefault()

    if (!checkAllInputs() || !checkFullDate()) {
        //cleanUp
        spanResults.forEach((span) => span.innerHTML = "--")
    }
    else {
        convertDate()
    }

})


function invalid(input, msg = "this field is required") {
    input.classList.add("border-2", "border-light-red")
    document.querySelector(`label[for="${input.id}"]`).classList.add("text-light-red")
    document.querySelector(`#${input.id} + div.error`).innerHTML = msg
    document.querySelector(`#${input.id} + div.error`).classList.remove("hidden")
}
function valid(input) {
    input.classList.remove("border-2", "border-light-red")
    document.querySelector(`label[for="${input.id}"]`).classList.remove("text-light-red")
    document.querySelector(`#${input.id} + div.error`).classList.add("hidden")
}


// check all fields if empty 
function checkAllInputs() {
    let notEmpty = true;
    formInputs.forEach((input) => {
        if (input.value === "") {
            invalid(input)
            notEmpty = false;
        }
        else {
            valid(input)
        }
    })
    return notEmpty
}

function checkDay() {
    const dayValue = +dayInput.value.trim();
    if (isNaN(dayValue)) {
        invalid(dayInput, "Must be a number")
        return false
    }
    else if (dayValue < 1 || dayValue > 31) {
  
        invalid(dayInput, "Must be a valid day!")
        return false
    }
    else {
   
        valid(dayInput)
        return true
    }
}

function checkMonth() {
    const monthValue = +monthInput.value.trim()
    if (isNaN(monthValue)) {
        invalid(monthInput, "Must be a number!")
        return false
    }
    else if (monthValue < 1 || monthValue > 12) {
        invalid(monthInput, "Must be a valid month!")
        return false
    }
    else {
        valid(monthInput)
        return true
    }
}

function checkYear() {
    const yearValue = +yearInput.value.trim()
    let currentYear = new Date().getFullYear()
    if (isNaN(yearValue)) {
        invalid(yearInput, "Must be a number!")
        return false
    }
    else if (yearValue < 1000 || yearValue > currentYear) {
        invalid(yearInput, "Must be a valid year!")
        return false
    }

    else {
        valid(yearInput)
        return true
    }
}


function checkFullDate() {
    let dayValue = +dayInput.value.trim()
    let monthValue = +monthInput.value.trim()
    let yearValue = +yearInput.value.trim()
    const monthsOf30 = [4, 6, 9, 11]

    if (!checkDay() || !checkMonth() || !checkYear()) {
        return false
    }

    // if common year there is no 29 feb
    else if (yearValue % 4 !== 0 && monthValue === 2 && dayValue === 29) {
        invalid(dayInput, "Must be a valid date!")
        return false
    }

    // if month has 30 days
    else if (dayValue === 31 && monthsOf30.includes(monthValue)) {
        invalid(dayInput, "Must be a valid date!")
        return false
    }
    else {
        return true
    }
}

function animate(input,limit) {
    let counter = 1
      let id = setInterval(() => {
          if (counter === limit) {
              clearInterval(id)
          }
          input.innerHTML = counter
          counter += 1
      },50)
  }
  

function convertDate() {

    let dayValue = dayInput.value.trim()
    let monthValue = monthInput.value.trim()
    let yearValue = yearInput.value.trim()
    let fullDate = `${monthValue}/${dayValue}/${yearValue}`;
    let date = new Date(fullDate)
    let currentDate = new Date()
    let inYears = currentDate.getFullYear() - date.getFullYear()
    let inMonths = Math.abs(currentDate.getMonth() - date.getMonth())
    let inDays  = Math.abs(currentDate.getDate() - date.getDate())
    animate(yearsOutput,inYears)
    animate(monthsOutput,inMonths)
    animate(daysOutput,inDays)
    
    
}

