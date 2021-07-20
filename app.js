const allButtons = document.getElementsByTagName('button')
const screen = document.getElementsByClassName('screen')[0]
const zeroDivisionErrorMsg = 'NO ZERO DIVISION'

const add = nums => nums.reduce((acc, val) => acc + val)
const subtract = nums => nums.reduce((acc, val) => acc - val)
const multiply = nums => nums.reduce((acc, val) => acc * val)
const divide = nums =>
  nums.includes(0) ? 'NO ZERO DIVISION' : nums.reduce((acc, val) => acc / val)

const operate = (operationType, nums) => {
  if (operationType === '+') return add(nums)
  if (operationType === '-') return subtract(nums)
  if (operationType === '*') return multiply(nums)
  if (operationType === '/') return divide(nums)
}

screen.innerText = '0'
let nums = []
let num = ''
let operationType
let operatorPressed = false

const clearAll = () => {
  screen.innerText = '0'
  nums = []
  num = ''
}

const allAbuttonsArr = [...allButtons]

const processInput = input => {
  if (screen.innerText === '0') {
    screen.innerText = ''
  }

  let result

  if (input === 'AC') {
    clearAll()
  } else if (input === '.') {
    if (!screen.innerText.includes('.')) {
      screen.innerText += '.'
    }
  } else if (input === 'DEL') {
    if (screen.innerText.length > 1) {
      screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1)
    } else {
      screen.innerText = 0
    }
  } else if (input === '+' || input === '-' || input === '*' || input === '/') {
    operatorPressed = true
    operationType = input
    nums.push(Number(screen.innerText))
    if (nums.length === 2) {
      result = operate(operationType, nums)
      nums = [result]
      screen.innerText = result
    } else {
      screen.innerText = nums[0]
    }
  } else if (input === 'EQUALS') {
    if (nums.length > 0) {
      nums.push(Number(screen.innerText))
      result = result || operate(operationType, nums)
      nums = []
      screen.innerText =
        typeof result === 'string'
          ? zeroDivisionErrorMsg
          : Math.floor(result * 100) / 100
    }
  } else {
    if (screen.innerText === zeroDivisionErrorMsg) screen.innerText = ''
    if (operatorPressed) {
      operatorPressed = !operatorPressed
      screen.innerText = ''
    }
    screen.innerText += input
  }
}

const inputMap = input => {
  let output

  switch (input) {
    case '+':
    case 'Add':
      output = '+'
      break
    case '-':
    case 'Subtract':
      output = '-'
      break
    case '*':
    case 'Multiply':
      output = '*'
      break
    case '/':
    case 'Divide':
      output = '/'
      break
    case 'Backspace':
      output = 'DEL'
      break
    case '=':
    case 'Enter':
      output = 'EQUALS'
      break
    case '.':
    case 'Decimal':
      output = '.'
      break
    case 'AC':
      output = 'AC'
      break
    default:
      output = input
  }

  return output
}

const getKeyBoardInput = e => {
  const key = e.code
  const isAllowedKey = key =>
    key.includes('Numpad') || key.includes('Digit') || key === 'Backspace'

  if (key && key !== 'NumLock' && isAllowedKey(key)) {
    let output

    const isNum = key.match(/[0-9]/g)
    let keyboardInput = isNum
      ? Number(isNum[0])
      : key === 'Backspace'
      ? key
      : key.split('Numpad')[1]

    output = inputMap(keyboardInput)
    processInput(output)
  }
}

const getButtonInput = e => {
  const buttonInput = e.target.innerText
  let output

  output = inputMap(buttonInput)
  processInput(output)
}

// Listen for Button input
allAbuttonsArr.forEach(button => button.addEventListener('click', e => getButtonInput(e)))

// Listen for Keyinput
document.addEventListener('keydown', e => getKeyBoardInput(e))
