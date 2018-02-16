export function asyncSetTimeout (timeout = 0) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout)
  })
}
