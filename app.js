const allButtons = document.getElementsByTagName('button')
const screen = document.getElementsByClassName('screen')[0]
const zeroDivisionErrorMsg = 'NO ZERO DIVISION'

const add = nums => nums.reduce((acc, val) => acc + val)
const subtract = nums => nums.reduce((acc, val) => acc - val)
const multiply = nums => nums.reduce((acc, val) => acc * val)
const divide = nums =>
  nums.includes(0) ? 'NO ZERO DIVISION' : nums.reduce((acc, val) => acc / val)

const operate = (operationType, nums) => {
  operationType = operationType.toUpperCase()

  if (operationType === '+' || operationType === 'Add') {
    return add(nums)
  }
  if (operationType === '-' || operationType === 'Subtract') {
    return subtract(nums)
  }
  if (operationType === '*' || operationType === 'Multiply') {
    return multiply(nums)
  }
  if (operationType === '/' || operationType === 'Divide') {
    return divide(nums)
  }
}

const clearAll = () => {
  screen.innerText = ''
  nums = []
  num = ''
}

const allAbuttonsArr = [...allButtons]

let nums = []
let num = ''
let operationType

const getKeyBoardInput = e => {
  const key = e.code

  if (key && key !== 'NumLock') {
    const isAllowedKey = key => key.includes('Numpad') || key.includes('Digit')
    let number
    let operation

    if (isAllowedKey(key)) {
      const isNum = key.match(/[0-9]/g)

      if (Boolean(isNum)) {
        number = Number(isNum[0])
      } else {
        operation = key.split('Numpad')[1]
      }
    }

    const output = typeof number === 'number' ? number : { operator: operation }
    console.log(output)
    return output
  }
}

const processInput = e => {
  const buttonType = e.target.getAttribute('data-type')
  const buttonContent = e.target.innerText
  let result

  if (buttonType === 'clear') {
    clearAll()
  } else if (buttonType === 'dot') {
    if (!screen.innerText.includes('.')) {
      screen.innerText += '.'
    }
  } else if (buttonType === 'operator') {
    operationType = buttonContent
    nums.push(Number(screen.innerText))
    if (nums.length === 2) {
      result = operate(operationType, nums)
      nums = [result]
      screen.innerText = result
    } else {
      screen.innerText = ''
    }
  } else if (buttonType === 'equals') {
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
    screen.innerText += buttonContent
  }
}

// Listen for Button input
allAbuttonsArr.forEach(button =>
  button.addEventListener('click', e => processInput(e))
)

// Listen for Keyinput
document.addEventListener('keydown', e => getKeyBoardInput(e))
