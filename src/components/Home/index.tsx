import React from 'react'

import Preview from '../Preview'
import Input from '../Input'
import Label from '../Label'
import HiddenLabel from '../HiddenLabel'

import {useLabels, useForceUpdate} from '../../hooks'
import {addLabel, createDefaultLabel, getImprovedCoordinates} from '../../utils'

import {STATUSES} from './constants'
import {STATUSES as PREPARED_LABEL_STATUSES} from '../../hooks/constants'

import {ILabels} from './types'

const {IDLE, LOADED, LOADING} = STATUSES

const Home: React.FC = () => {
  const [previewSrc, setPreviewSrc] = React.useState<string>('')
  const [status, setStatus] = React.useState<string>(IDLE)
  const [isPreventLabelOutOfPreview, setPreventLabelOutOfPreview] =
    React.useState<boolean>(false)

  const previewRef = React.useRef<HTMLImageElement>(null)
  const hiddenLabelRef = React.useRef<HTMLDivElement>(null)

  const {labels, preparedLabel, ...labelsActions} = useLabels()
  const forceUpdate = useForceUpdate()
  const {add, remove, updatePosition, clear, prepareLabel} = labelsActions

  const labelsArray = Array.from(Object.values(labels))

  const isLoaded = status === LOADED

  let previewWidth = React.useRef<number>(0)

  const setIdle = () => setStatus(IDLE)
  const setLoading = () => setStatus(LOADING)
  const setLoaded = () => {
    setTimeout(() => {
      setStatus(LOADED)
    }, 200)
  }

  const afterPreviewLoaded = React.useCallback((): void => {
    setLoaded()
  }, [])

  const awaitPreviewLoad = React.useCallback((): void => {
    let isImageLoaded: boolean = false
    setLoading()
    const previewNode = previewRef.current
    const interval = setInterval(() => {
      const {width} = previewNode?.getBoundingClientRect() ?? {}
      isImageLoaded = width ? width > 0 : false
      if (isImageLoaded) {
        afterPreviewLoaded()
        clearInterval(interval)
      }
    }, 100)
    setTimeout(() => {
      clearInterval(interval)
      if (!isImageLoaded) {
        setIdle()
        setPreviewSrc('')
      }
    }, 2000)
  }, [afterPreviewLoaded])

  const removePreview = (e: React.MouseEvent): void => {
    e.preventDefault()
    setPreviewSrc('')
  }

  const handleAddingLabel = (e: React.MouseEvent): void => {
    e.preventDefault()
    const {clientX, clientY} = e
    const {id} = e.target as HTMLDivElement
    const previewNode = previewRef.current
    if (!previewNode) {
      return
    }

    // if click on an existing label, it will removed
    if (id?.includes('label')) {
      remove(id)
      return
    }

    const label = createDefaultLabel({
      previewNode,
      clientX,
      clientY,
    })
    // after prepare label will be added to preview
    prepareLabel(label)
  }

  const handleUpdatePosition = React.useCallback(
    (factor: number, previewRect: DOMRect): void => {
      if (!labelsArray.length) {
        return
      }
      const hiddenLabelNode = hiddenLabelRef.current
        ?.firstChild as HTMLDivElement

      const {height: labelHeight, width: labelWidth} =
        hiddenLabelNode.getBoundingClientRect()

      updatePosition(
        labelsArray.reduce((obj: ILabels, {id, positionX, positionY}) => {
          const label = {
            id,
            positionX: factor * positionX,
            positionY: factor * positionY,
          }

          if (
            isPreventLabelOutOfPreview &&
            previewRect.width > labelWidth * 4
          ) {
            obj[id] = {
              ...label,
              ...getImprovedCoordinates({
                defaultLabel: label,
                previewRect,
                labelRectBottom: label.positionY + labelHeight,
                labelRectRight: label.positionX + labelWidth,
              }),
            }
          } else {
            obj[id] = label
          }

          return obj
        }, {}),
      )
      previewWidth.current = previewRect.width
      forceUpdate()
    },
    [labelsArray, updatePosition, isPreventLabelOutOfPreview, forceUpdate],
  )

  const handleResize = React.useCallback(
    (e): void => {
      const newRect = previewRef.current?.getBoundingClientRect()
      if (!newRect) {
        return
      }
      const {width: newPreviewWidth} = newRect

      if (previewWidth.current !== newPreviewWidth) {
        const factor = previewWidth.current
          ? newPreviewWidth / previewWidth.current
          : 1

        handleUpdatePosition(factor, newRect)
      }
    },
    [handleUpdatePosition],
  )

  React.useEffect(() => {
    const previewNode = previewRef?.current
    const hiddenLabel = hiddenLabelRef.current?.firstChild as HTMLDivElement

    if (
      preparedLabel.status === PREPARED_LABEL_STATUSES.READY &&
      previewNode &&
      hiddenLabel
    ) {
      addLabel({
        previewNode,
        hiddenLabel,
        preparedLabel,
        add,
      })
    }
  }, [preparedLabel, add])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  React.useEffect(() => {
    if (previewSrc) {
      awaitPreviewLoad()
    }
    return () => {
      setIdle()
      clear()
      previewWidth.current = 0
    }
  }, [previewSrc, clear, awaitPreviewLoad])

  React.useEffect(() => {
    if (isLoaded) {
      const {width} = previewRef.current?.getBoundingClientRect() ?? {}
      if (width) {
        previewWidth.current = width
      }
    }
  }, [isLoaded])

  return (
    <div className="home">
      {previewSrc ? (
        <Preview
          previewSrc={previewSrc}
          ref={previewRef}
          onMouseDown={handleAddingLabel}
          onClose={removePreview}
          isShow={isLoaded}
        >
          {!!labelsArray.length &&
            labelsArray.map(({positionY, positionX, id}, index) => (
              <Label
                key={`${index}-${id}`}
                positionX={positionX}
                positionY={positionY}
                id={id}
              />
            ))}
          <HiddenLabel {...preparedLabel.data} ref={hiddenLabelRef} />
        </Preview>
      ) : (
        <Input
          setPreviewSrc={setPreviewSrc}
          isPreventLabelOutOfPreview={isPreventLabelOutOfPreview}
          setPreventLabelOutOfPreview={setPreventLabelOutOfPreview}
        />
      )}
    </div>
  )
}

export default Home
