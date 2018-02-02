export default function (value) {
  const pattern = /^\d+$/
  return pattern.test(value) || 'Only numbers'
}
