import React from 'react'

import {ILabel} from './types'

const Label: React.FC<ILabel> = ({positionY, positionX, id}) => {
  return (
    <div
      id={id}
      className="label"
      style={{
        top: `${positionY}px`,
        left: `${positionX}px`,
      }}
    >
      label
    </div>
  )
}

export default React.memo(Label)
