import React from 'react'

import Label from '../Label'

import {IHiddenLabel} from './types'

const HiddenLabel: React.FC<IHiddenLabel> = React.forwardRef(
  ({positionY, positionX}, ref) => {
    return (
      <div className="hidden" ref={ref}>
        <Label id="hidden-label" positionY={positionY} positionX={positionX} />
      </div>
    )
  },
)

export default React.memo(HiddenLabel)
