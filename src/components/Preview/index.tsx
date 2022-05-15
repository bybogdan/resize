import React from 'react'

import {IPreview} from './types'

const Preview: React.FC<IPreview> = React.forwardRef(
  ({children, previewSrc, onMouseDown, onClose, isShow}, ref) => {
    return (
      <>
        {!isShow && <div>Preview is loading...</div>}
        <div
          className={`preview-wrapper ${isShow && 'preview-wrapper-show'}`}
          onMouseDown={onMouseDown}
        >
          <button className="close" onMouseDown={onClose}>
            X
          </button>
          {children}
          <img ref={ref} className="preview" src={previewSrc} alt="#" />
        </div>
      </>
    )
  },
)

export default Preview
