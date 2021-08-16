@@include('./plantingElements.js');

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
}