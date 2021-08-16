@@include('./growingElements.js');

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
}