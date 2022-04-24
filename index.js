const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const clipboardEl = document.getElementById('clipboard')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')


//for looping to generate random character on each iteration
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbols
}

generateEl.addEventListener('click', () => {


  let length = parseInt(lengthEl.value)
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  resultEl.innerHTML = generatePasswor(hasLower, hasUpper, hasNumber, hasSymbol, length)
})


clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerHTML

  //if password is empty then copying doesn't happen
  if (!password) { return }


  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
})
function generatePasswor(lower, upper, number, symbol, length) {

  var generatePasswor = ''


  const typesCount = lower + upper + number + symbol

  //if typesCount is zero doesn't happen password generation logic because of infinite loop
  if (typesCount === 0) {
    return ''
  }

  //getting filtered types. selected only those that were checked on checkboxes
  const typesArr = [{ lower }, { upper }, { symbol }, { number }]
    .filter(item => Object.values(item)[0] === true)

  
  //
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]
      generatePasswor += randomFunc[funcName]()
    })
  }

  return generatePasswor.slice(0, length)
}


const uppercaseStartCode = 65
const lowercaseStartCode = 97
const numberStartCode = 97

const enLettersQuantity = 26
const digitsQunatity = 10


function getRandomUpper() {

  return String.fromCharCode(Math.floor(Math.random() * enLettersQuantity) + uppercaseStartCode)
}



function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * enLettersQuantity) + lowercaseStartCode)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * digitsQunatity) + numberStartCode)
}

function getRandomSymbols() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}


