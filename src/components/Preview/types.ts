interface IPreview {
  children?: React.ReactNode
  previewSrc: string
  onMouseDown: (e: React.MouseEvent) => void
  onClose: (e: React.MouseEvent) => void
  ref: React.Ref<HTMLImageElement>
  isShow: boolean
}

export type {IPreview}
