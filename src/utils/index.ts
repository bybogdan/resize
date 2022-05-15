import {
  IParamsForDefaultLabel,
  ILabel,
  IParamsForLabel,
  IGetImprovedCoordinatesParams,
  IImprovedCoordinates,
} from './types'

export const createDefaultLabel = ({
  previewNode,
  clientY,
  clientX,
}: IParamsForDefaultLabel): ILabel => {
  const {top: previewRectTop} = previewNode.getBoundingClientRect()
  const positionY =
    previewRectTop > 0
      ? clientY - previewRectTop
      : clientY + Math.abs(previewRectTop)

  const label = {
    id: `label-${Math.floor(Math.random() * 100000)}`,
    positionY,
    positionX: clientX,
  }

  return label
}

// correct the coordinates of label if it needs to have in the preview boundaries
export const getImprovedCoordinates = ({
  defaultLabel,
  previewRect,
  labelRectBottom,
  labelRectRight,
}: IGetImprovedCoordinatesParams): IImprovedCoordinates => {
  const {positionX, positionY} = defaultLabel
  const improvedCoordinates = {
    positionX,
    positionY,
  }

  if (previewRect.bottom < labelRectBottom) {
    improvedCoordinates.positionY =
      improvedCoordinates.positionY - (labelRectBottom - previewRect.height) - 2
  }
  if (previewRect.right < labelRectRight) {
    improvedCoordinates.positionX =
      improvedCoordinates.positionX - (labelRectRight - previewRect.right) - 2
  }

  return improvedCoordinates
}

export const addLabel = ({
  previewNode,
  hiddenLabel,
  preparedLabel,
  add,
}: IParamsForLabel) => {
  const {data: defaultLabel} = preparedLabel

  const previewRect = previewNode.getBoundingClientRect()
  const {bottom: labelRectBottom, right: labelRectRight} =
    hiddenLabel.getBoundingClientRect()

  add({
    ...defaultLabel,
    ...getImprovedCoordinates({
      defaultLabel,
      previewRect,
      labelRectBottom,
      labelRectRight,
    }),
  })
}
