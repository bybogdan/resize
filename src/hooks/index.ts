import React from 'react'

import {Context, initialState, preparedLabelInitialValue} from '../context'
import {ACTIONS, STATUSES} from './constants'

import {State, Action, ILabels, ILabel} from './types'

const {READY} = STATUSES

const {ADD, REMOVE, UPDATE_POSITION, CLEAR, PREPARE_LABEL} = ACTIONS

function reducer(state: State, action: Action) {
  const {type, payload} = action
  switch (type) {
    case ADD:
      const {label} = payload
      state.data[label.id] = label

      return {
        ...state,
        data: state.data,
        preparedLabel: preparedLabelInitialValue,
      }
    case REMOVE:
      const {id} = payload
      const newData = {...state.data}
      delete newData[id]

      return {
        ...state,
        data: newData,
      }
    case UPDATE_POSITION:
      const {updLabels} = payload

      return {
        ...state,
        data: updLabels,
      }
    case CLEAR:
      return {
        ...state,
        data: {},
        preparedLabel: preparedLabelInitialValue,
      }
    case PREPARE_LABEL:
      const {defaultLabel} = payload

      return {
        ...state,
        preparedLabel: {
          data: defaultLabel,
          status: READY,
        },
      }
    default:
      return state
  }
}

export const useLabelsContext = () => {
  const [state, setState] = React.useReducer(reducer, initialState)

  const add = React.useCallback((label: ILabel): void => {
    setState({type: ADD, payload: {label}})
  }, [])

  const remove = React.useCallback((id: string): void => {
    setState({type: REMOVE, payload: {id}})
  }, [])

  const updatePosition = React.useCallback((updLabels: ILabels): void => {
    setState({type: UPDATE_POSITION, payload: {updLabels}})
  }, [])

  const clear = React.useCallback((): void => {
    setState({type: CLEAR})
  }, [])

  const prepareLabel = React.useCallback((defaultLabel: ILabel): void => {
    setState({
      type: PREPARE_LABEL,
      payload: {defaultLabel},
    })
  }, [])

  return {
    state,
    add,
    remove,
    updatePosition,
    clear,
    prepareLabel,
  }
}

export const useLabels = () => {
  const {state, ...rest} = React.useContext(Context)
  const {data: labels, preparedLabel} = state
  return {
    labels,
    preparedLabel,
    ...rest,
  }
}

export const useForceUpdate = () => {
  const [, setValue] = React.useState(0)
  return React.useCallback(() => setValue(value => value + 1), [])
}
