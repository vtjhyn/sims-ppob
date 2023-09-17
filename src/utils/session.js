export function sessionGet(key) {
  let stringValue = window.sessionStorage.getItem(key)
    if (stringValue !== null) {
      let value = JSON.parse(stringValue)
        let expirationDate = new Date(value.expirationDate)
        if (expirationDate > new Date()) {
          return value.value
        } else {
          sessionStorage.removeItem(key)
        }
    }
    return null
}

// add into session
export function sessionSet(key, value, expirationInMin = 10) {
  let expirationDate = new Date(new Date().getTime() + (expirationInMin * 60 * 1000 ))
    let newValue = {
    value: value,
    expirationDate: expirationDate.toISOString()
  }
  window.sessionStorage.setItem(key, JSON.stringify(newValue))
}