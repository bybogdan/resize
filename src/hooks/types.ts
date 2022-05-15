import {ILabels} from '../components/Home/types'
import {ILabel} from '../components/Label/types'

interface Action {
  type: string
  payload?: any
}

interface IPreparedLabel {
  data: ILabel
  status: string
}

interface State {
  data: ILabels
  preparedLabel: IPreparedLabel
}

export type {Action, State, ILabel, ILabels}
