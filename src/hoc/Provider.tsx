import React from 'react'

import {Context} from '../context'

import {useLabelsContext} from '../hooks'

const Provider: React.FC = ({children}) => {
  const value = useLabelsContext()
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider
