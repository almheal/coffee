//planting
const PLANTING_OPACITY_STEPS = 4
const PLANTING_DROP_BEAN_STEPS = 6
const PLANTING_ROTATE_HAND_STEPS = 5
const PLANTING_PHASE_STEPS = 3
const PLANTING_HAND_MAX_ROTATE = 50
const PLANTING_SECTION_STEPS = 31


//growing
const GROWING_FIRST_MOUNTAINS = 4
const GROWING_SECOND_MOUNTAINS = 4
const GROWING_TROPIC_TEXT = 4
const GROWING_SUBTROPIC_TEXT = 4
const GROWING_ROBUSTA_STEPS = 8
const GROWING_ARABICA_STEPS = 8
const GROWING_ROBUSTA_MAX_BOTTOM = 240
const GROWING_ARABICA_MAX_BOTTOM = 420
const GROWING_SECTION_STEPS = 9

const STEP_SIZE = 100;
const addStyle = ($el, css, value) => {
  $el.style[css] = value
}

const calculateDistance = (scrollTop, elOffsetTop) => {
  return scrollTop < elOffsetTop ? 0 : parseInt((scrollTop - elOffsetTop) / STEP_SIZE)
};
const plantingHand = document.querySelector('[data-planting-hand]')
const plantingBean = document.querySelector('[data-planting-bean]')
const plantingCircle = document.querySelector('[data-planting-circle]')
//top phases
const secondTopPhase = document.querySelector('[data-planting-second-top-phase]')
const thirdTopPhase = document.querySelector('[data-planting-third-top-phase]')
//bottom phases
const secondBottomPhase = document.querySelector('[data-planting-second-bottom-phase]')
const thirdBottomPhase = document.querySelector('[data-planting-third-bottom-phase]')

const phaseSecondText = document.querySelector('[data-planting-second-text]')
const phaseThirdText = document.querySelector('[data-planting-third-text]');

const phaseBottomElements = [secondBottomPhase, thirdBottomPhase]
const phaseTopElements = [secondTopPhase, thirdTopPhase]

function planting({scrollTop, elOffsetTop}){
  const distance = calculateDistance(scrollTop, elOffsetTop)
  const plantBeanDistance = plantBean(distance)
  const stepCircleDistance = stepCircle(plantBeanDistance)
  const firstPhaseDistance = firstPhase(stepCircleDistance)
  const secondPhaseDistance = secondPhase(firstPhaseDistance)
  const thirdPhaseDistance = thirdPhase(secondPhaseDistance)
  const fourthPhaseDistance = fourthPhase(thirdPhaseDistance)
  fivePhase(fourthPhaseDistance)
}


function plantBean(distance){
  if(distance < 0){
    return
  }

  const maxTopBean = 700
  const defaultTopBean = 200

  const rotate = distance * (PLANTING_HAND_MAX_ROTATE / PLANTING_ROTATE_HAND_STEPS)
  const rotateHand = rotate > PLANTING_HAND_MAX_ROTATE ? PLANTING_HAND_MAX_ROTATE : rotate

  const top = distance * 100 + defaultTopBean > maxTopBean ? maxTopBean : distance * 100 + defaultTopBean

  addStyle(plantingHand, 'transform', `rotate(${rotateHand}deg)`)
  addStyle(plantingBean, 'top', top + 'px')

  return distance - PLANTING_DROP_BEAN_STEPS
}


function stepCircle(distance){
  if(distance < 0){
    return
  }
  const opacityHandStep = PLANTING_OPACITY_STEPS - distance
  const opacityHand = opacityHandStep * 0.25 <= 0 ? 0 : opacityHandStep * 0.25
  addStyle(plantingHand, 'opacity', opacityHand)

  if(distance < PLANTING_OPACITY_STEPS){
    addStyle(plantingCircle, 'display', 'none')
    addStyle(plantingCircle, 'opacity', '0')
    return distance - PLANTING_OPACITY_STEPS
  }

  const circleLocalSteps = distance - PLANTING_OPACITY_STEPS
  const opacityCircle = circleLocalSteps * 0.25 > 1 ? 1 : circleLocalSteps * 0.25

  addStyle(plantingCircle, 'display', 'flex')
  addStyle(plantingCircle, 'opacity', opacityCircle)

  return distance - (PLANTING_OPACITY_STEPS + PLANTING_OPACITY_STEPS)
}


//first planting phase, change background
function firstPhase(distance){
  if(distance < 0){
    return
  }
  if(distance >= PLANTING_PHASE_STEPS){
    phaseBottomElements.forEach(item => item.classList.add('step-1'))
    phaseTopElements.forEach(item => item.classList.add('step-1'))
  }else{
    phaseBottomElements.forEach(item => item.classList.remove('step-1'))
    phaseTopElements.forEach(item => item.classList.remove('step-1'))
  }
  return distance - PLANTING_PHASE_STEPS
}

//second planting phase, change background
function secondPhase(distance){
  if(distance < 0){
    return
  }

  if(distance >= PLANTING_PHASE_STEPS){
    const opacity = (distance - PLANTING_PHASE_STEPS) * 0.4
    const textOpacity = opacity >= 1 ? 1 : opacity
    addStyle(phaseSecondText, 'opacity', textOpacity)

    phaseBottomElements.forEach(item => item.classList.add('step-2'))
    phaseTopElements.forEach(item => item.classList.add('step-2'))
  }else{
    addStyle(phaseSecondText, 'opacity', 0)
    phaseBottomElements.forEach(item => item.classList.remove('step-2'))
    phaseTopElements.forEach(item => item.classList.remove('step-2'))
  }

  return distance - PLANTING_PHASE_STEPS
}

//third planting phase, change background
function thirdPhase(distance){
  if(distance < 0){
    return
  }
  if(distance >= PLANTING_PHASE_STEPS){
    phaseBottomElements.forEach(item => item.classList.add('step-3'))
    phaseTopElements.forEach(item => item.classList.add('step-3'))
  }else{
    phaseBottomElements.forEach(item => item.classList.remove('step-3'))
    phaseTopElements.forEach(item => item.classList.remove('step-3'))
  }
  return distance - PLANTING_PHASE_STEPS
}

//fourth planting phase, change background
function fourthPhase(distance){
  if(distance < 0){
    return
  }
  if(distance >= PLANTING_PHASE_STEPS){
    const opacity = (distance - PLANTING_PHASE_STEPS) * 0.4
    const textOpacity = opacity >= 1 ? 1 : opacity
    addStyle(phaseThirdText, 'opacity', textOpacity)
    thirdTopPhase.classList.add('step-4')
    thirdBottomPhase.classList.add('step-4')
  }else{
    addStyle(phaseThirdText, 'opacity', 0)
    thirdTopPhase.classList.remove('step-4')
    thirdBottomPhase.classList.remove('step-4')
  }


  return distance - (PLANTING_PHASE_STEPS - 1)
}

//five planting phase, change background
function fivePhase(distance){
  if(distance < 0){
    return
  }
  if(distance >= PLANTING_PHASE_STEPS){
    thirdTopPhase.classList.add('step-5')
  }else{
    thirdTopPhase.classList.remove('step-5')
  }

  return distance - PLANTING_PHASE_STEPS
};
const growingArabica = document.querySelector('[data-growing-arabica]')
const growingRobusta = document.querySelector('[data-growing-robusta]')
const growingFirstMountains = document.querySelector('[data-growing-mountains-first]')
const growingSecondMountains = document.querySelector('[data-growing-mountains-second]')
const growingTropicText = document.querySelector('[data-growing-tropic-text]')
const growingSubTropicText = document.querySelector('[data-growing-subtropic-text]');

function growing({scrollTop, elOffsetTop}){
  const distance = calculateDistance(scrollTop, elOffsetTop)
  const firstStepDistance = showFirstMountains(distance)
  showSecondMountains(firstStepDistance)
  showArabica(distance)
  showRobusta(distance)
}

function showFirstMountains(distance){
  const firstOpacity = (distance / GROWING_FIRST_MOUNTAINS) * distance
  const firstOpacityMountains = firstOpacity >= 1 ? 1 : firstOpacity

  addStyle(growingFirstMountains, 'opacity', firstOpacityMountains)
  showSubTropicText(distance)
  return distance - GROWING_FIRST_MOUNTAINS
}


function showSecondMountains(distance){
  if(distance < 0){
    return
  }
  const secondOpacity = distance / GROWING_SECOND_MOUNTAINS * distance
  const secondOpacityMountains = secondOpacity >= 1 ? 1 : secondOpacity
  addStyle(growingSecondMountains, 'opacity', secondOpacityMountains)
  showTropicText(distance)
}

function showSubTropicText(distance){
  const subTropicOpacity = (distance / GROWING_SUBTROPIC_TEXT) * distance
  addStyle(growingSubTropicText, 'opacity', subTropicOpacity >= 1 ? 1 : subTropicOpacity)
}


function showTropicText(distance){
  const tropicTextOpacity = (distance / GROWING_TROPIC_TEXT) * distance
  addStyle(growingTropicText, 'opacity', tropicTextOpacity >= 1 ? 1 : tropicTextOpacity)
}


function showArabica(distance){
  const arabicaBottom = (GROWING_ARABICA_MAX_BOTTOM / GROWING_ARABICA_STEPS) * distance
  const arabicaBottomValue = arabicaBottom > GROWING_ARABICA_MAX_BOTTOM ? GROWING_ARABICA_MAX_BOTTOM : arabicaBottom
  addStyle(growingArabica, 'bottom', arabicaBottomValue + 'px')
}


function showRobusta(distance){
  const robustaBottom = (GROWING_ROBUSTA_MAX_BOTTOM / GROWING_ROBUSTA_STEPS) * distance
  const robustaBottomValue = robustaBottom > GROWING_ROBUSTA_MAX_BOTTOM ? GROWING_ROBUSTA_MAX_BOTTOM : robustaBottom
  addStyle(growingRobusta, 'bottom', robustaBottomValue + 'px')
};

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