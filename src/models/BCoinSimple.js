export default class BCoinSimple {
  symbol; // "ETHBTC"
  price; // "0.08967100"

  constructor (item = {}) {
    Object.assign(this, item)
  }
}
