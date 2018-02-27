export default function currencyFilter (value) {
  if (!value) return ''

  const maxPartLength = 3
  const partSeparator = ','
  const isArrayMaxPart = index => !((index + 1) % maxPartLength)

  let [integerPart, fractionalPart] = value.split('.')
  let splittedString = integerPart
  const isNotLastIntegerSymbol = index => (index + 1) < integerPart.length

  fractionalPart = fractionalPart
    ? '.' + fractionalPart
    : ''

  if (integerPart.length > maxPartLength) {
    splittedString = integerPart
      .split('')
      .reverse()
      .map((letter, index) => {
        if (isArrayMaxPart(index) && isNotLastIntegerSymbol(index)) {
          return partSeparator + letter
        }
        return letter
      })
      .reverse()
      .join('')
  }

  return splittedString + fractionalPart
}
