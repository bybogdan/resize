import React from 'react'

import {IMAGES_LINK} from './constants'
import {IInput} from './types'

const Input: React.FC<IInput> = ({
  setPreviewSrc,
  isPreventLabelOutOfPreview,
  setPreventLabelOutOfPreview,
}) => {
  const handlePreviewLoad = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e?.target?.files) {
      setPreviewSrc(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleCheckbox = () => {
    setPreventLabelOutOfPreview(prevValue => !prevValue)
  }

  return (
    <div className="input-container">
      <div className="input">
        <input
          className="input-file"
          onChange={handlePreviewLoad}
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <div className="input-images-wrapper">
        {IMAGES_LINK &&
          IMAGES_LINK.map((link: string, index: number) => (
            <div
              className="input-image"
              key={`${index}-input-image`}
              onMouseDown={() => setPreviewSrc(link)}
            >
              Default image {index + 1}
            </div>
          ))}
      </div>
      <div>
        <label className="input-checkbox">
          <input
            checked={isPreventLabelOutOfPreview}
            onChange={handleCheckbox}
            type="checkbox"
          />
          <span>
            Update labels coordinates at right edge and bottom during resizing
            to prevent labels from out of preview
          </span>
        </label>
        {isPreventLabelOutOfPreview && (
          <p className="input-warning">
            During resizing, if the labels will start to go beyond the preview,
            their coordinates will be updated to prevent this, as long as the
            preview is large enough. <br />
            Example: set the label to the lower right corner, from fullscreen by
            reducing the window to the smallest possible size, while the size is
            enough, the label coordinates will be updated. If after that you
            return to fullscreen, the label coordinates will differ from the
            initial ones, since they will already be calculated from the last
            preview width (in this case, the minimum one) <br />
            <button
              onClick={() => setPreventLabelOutOfPreview(false)}
              className="input-warning-button"
            >
              turn it off
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Input
