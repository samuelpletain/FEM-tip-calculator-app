import 'reset-css/sass/_reset.scss'
import './scss/style.scss'

let bill = 0
let tip = -1
let people = 0
const tipAmount = document.getElementById("tip_amount_per_person")
const total = document.getElementById("total_per_person")
const peopleInput = document.getElementById("people")
const peopleError = document.getElementById("error")
const tipButtons = document.getElementsByClassName("section__button")
const tipInput = document.getElementById("tip")
const billInput = document.getElementById("bill")
const reset = document.getElementById("reset")

Array.from(tipButtons).forEach((element) => {
  element.addEventListener('click', () => {
    if (document.getElementsByClassName("button--selected").length > 0) {
      document.getElementsByClassName("button--selected")[0].classList.remove("button--selected")
    } 
    element.classList.add("button--selected")
    tip = parseInt(element.value);
    calculateTip()
  })
})

tipInput.addEventListener("focusout", () => {
  if (document.getElementsByClassName("button--selected").length > 0) {
    document.getElementsByClassName("button--selected")[0].classList.remove("button--selected")
  }
  if (tipInput.value < 0) {
    tip = 0
    tipInput.value = 0;
  } else {
    tip = parseInt(tipInput.value).toFixed(0)
    tipInput.value = tip
    calculateTip()
  }
})

billInput.addEventListener("focusout", () => {
  if (billInput.value < 0) {
    billInput.value = 0
  } else {
    bill = parseFloat(billInput.value).toFixed(2)
    billInput.value = bill
    calculateTip()
  }
})

peopleInput.addEventListener("focusout", () => {
  if (peopleInput.value <= 0) {
    peopleInput.value = 0
    peopleInput.classList.add("input--error")
    peopleError.classList.remove("error--hidden")
  } else {
    peopleInput.classList.remove("input--error")
    peopleError.classList.add("error--hidden")
    people = parseInt(peopleInput.value)
    calculateTip()
  }
})

reset.addEventListener('click', () => {
  bill = 0
  people = 0
  tip = -1
  billInput.value = ""
  peopleInput.value = ""
  tipInput.value = ""
  if (document.getElementsByClassName("button--selected").length > 0) {
    document.getElementsByClassName("button--selected")[0].classList.remove("button--selected")
  }
  tipAmount.textContent = "0.00"
  total.textContent = "0.00"
})

function calculateTip() {
  if ((people > 0) && (bill > 0) && (tip > -1)) {
    tipAmount.textContent = (bill * tip / 100 / people).toFixed(2)
    total.textContent = ((bill / people) + (bill * tip / 100 / people)).toFixed(2)
  }
}