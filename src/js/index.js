@@include('./const.js');
@@include('./helpers/index.js');
@@include('./planting/planting.js');
@@include('./growing/growing.js');

let windowHeight = window.innerHeight
const $planting = document.querySelector('[data-element="planting"]')
const $growing = document.querySelector('[data-element="growing"]')

document.addEventListener('DOMContentLoaded', () => {
  setHeightSections()
  document.addEventListener('scroll', scrollHandler)
})

const sections = [
  {
    el: $planting,
    steps: PLANTING_SECTION_STEPS,
    handler: planting
  },
  {
    el: $growing,
    steps: GROWING_SECTION_STEPS,
    handler: growing
  }
]





function scrollHandler(e){
  const scrollTop = document.scrollingElement.scrollTop

  sections.forEach(({el, handler}) => {
    const elOffsetHeight = el.offsetHeight
    const elOffsetTop = el.offsetTop
    if(scrollTop + 300 > elOffsetTop && scrollTop - 300 < elOffsetHeight + elOffsetTop){
      handler({scrollTop, elOffsetTop})
    }
  })

}


function setHeightSections(){
  sections.forEach(({el, steps}) => {
    const height = steps * STEP_SIZE + windowHeight
    addStyle(el, 'height', height + 'px')
  })
}