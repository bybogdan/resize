import {ILabel} from '../components/Label/types'

interface IImprovedCoordinates {
  positionX: number
  positionY: number
}

interface IParamsForDefaultLabel {
  previewNode: HTMLImageElement
  clientX: number
  clientY: number
}

interface IParamsForLabel {
  previewNode: HTMLImageElement
  hiddenLabel: HTMLDivElement
  preparedLabel: {
    data: ILabel
    status: string
  }
  add: (label: ILabel) => void
}

interface IGetImprovedCoordinatesParams {
  defaultLabel: ILabel
  previewRect: DOMRect
  labelRectBottom: number
  labelRectRight: number
}

export type {
  ILabel,
  IParamsForDefaultLabel,
  IParamsForLabel,
  IGetImprovedCoordinatesParams,
  IImprovedCoordinates,
}
