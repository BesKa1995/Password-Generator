const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const clipboardEl = document.getElementById('clipboard')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

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
  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
})
function generatePasswor(lower, upper, number, symbol, length) {

  var generatePasswor = ''

  const typesCount = lower + upper + number + symbol

  if (typesCount === 0) {
    return ''
  }
  const typesArr = [{ lower }, { upper }, { symbol }, { number }]
    .filter(item => Object.values(item)[0] === true)

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]
      generatePasswor += randomFunc[funcName]()
    })
  }

  return generatePasswor.slice(0, length)
}




function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 64)
}



function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}


