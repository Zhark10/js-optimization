const debounce = (callback, limit) => {
  let timer
  return function() {
    const ctx = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(()=>callback.apply(ctx, args), limit)
  }
}