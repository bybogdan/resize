import {ILabels} from '../components/Home/types'
import {ILabel} from '../components/Label/types'
import {State} from '../hooks/types'

interface IContextConfig {
  state: State
  add: (label: ILabel) => void
  remove: (id: string) => void
  updatePosition: (updLabels: ILabels) => void
  clear: () => void
  prepareLabel: (defaultLabel: ILabel) => void
}

export type {IContextConfig, State}
