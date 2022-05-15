import React from 'react'

import {STATUSES} from '../hooks/constants'

import {IContextConfig, State} from './types'

const {IDLE} = STATUSES

export const preparedLabelInitialValue = {
  data: {
    id: '',
    positionX: 0,
    positionY: 0,
  },
  status: IDLE,
}

export const initialState: State = {
  data: {},
  preparedLabel: preparedLabelInitialValue,
}

const contextConfig: IContextConfig = {
  state: initialState,
  add: () => {},
  remove: () => {},
  updatePosition: () => {},
  clear: () => {},
  prepareLabel: () => {},
}

export const Context = React.createContext(contextConfig)
