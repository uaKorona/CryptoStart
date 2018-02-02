export default function (minLength) {
  if (!minLength) {
    console.warn('you use minLength validator but not specify min length! ')
    return () => true
  }

  return (value) => {
    return !!(value && value.length >= minLength) || 'Min length ' + minLength
  }
}
