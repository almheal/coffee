const addStyle = ($el, css, value) => {
  $el.style[css] = value
}

const calculateDistance = (scrollTop, elOffsetTop) => {
  return scrollTop < elOffsetTop ? 0 : parseInt((scrollTop - elOffsetTop) / STEP_SIZE)
}