const debounce = (callback, limit, immediate) => {
  let timer
  return function() {
    const ctx = this
    const args = arguments
    let later = function() {
      timer = null
      if (!immediate) {
        callback.apply(ctx, args)
      }
    }

    let immediateCall = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(later, limit)
    if (immediateCall) {
      callback.apply(ctx, args)
    }
  }
}