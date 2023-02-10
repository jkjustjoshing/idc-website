import type { FormEvent, PropsWithChildren, Reducer } from 'react'
import { useReducer } from 'react'
import { submitForm } from '@/utils/forms/formUtils'

export type Props = PropsWithChildren<{
  action: string
  sheetName: string
  successString: string
  debug?: boolean
  class?: string
}>

type State =
  | { state: 'init' }
  | { state: 'loading' }
  | { state: 'success' }
  | { state: 'error'; error: string }

type Action =
  | { type: 'loading' }
  | { type: 'success' }
  | { type: 'error'; error: string }

export const Form = ({
  action,
  sheetName,
  successString,
  debug = false,
  class: className,
  children,
}: Props) => {
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'loading':
        return { state: 'loading' }
      case 'success':
        return { state: 'success' }
      case 'error':
        return { state: 'error', error: action.error }
      default:
        throw new Error()
    }
  }
  const initialState = { state: 'init' } as const

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  )

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target
    if (target instanceof HTMLFormElement) {
      dispatch({ type: 'loading' })
      const { success, error } = await submitForm(target)
      if (error) {
        dispatch({ type: 'error', error })
      } else {
        dispatch({ type: 'success' })
      }
    }
  }

  return (
    <form
      action={action}
      className={className}
      method="post"
      onSubmit={onSubmit}
    >
      <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
      <input type="hidden" name="SheetName" value={sheetName} />
      <input type="hidden" name="successString" value={successString} />
      {debug && <input type="hidden" name="_no_email" value="true" />}

      {children}

      {state.state === 'loading' && <div>Loading...</div>}
      {state.state === 'success' && <div>{successString}</div>}
      {state.state === 'error' && <div>ERROR. {state.error}</div>}
    </form>
  )
}
