import {Dispatch, SetStateAction} from 'react'

interface IInput {
  setPreviewSrc: (value: string) => void
  isPreventLabelOutOfPreview: boolean
  setPreventLabelOutOfPreview: Dispatch<SetStateAction<boolean>>
}

export type {IInput}
