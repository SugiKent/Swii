import React, { createContext, useReducer, useEffect } from 'react'

import firebase from '../config/firebaseConf';

type NewStateAction = Partial<S> | ((prevState: S) => Partial<S>)
type UserContextValueType = {
  state: UserContextState,
  dispatch: (newState: NewStateAction) => void
}

type UserContextState = {
  user: firebase.User | null
}

let reducer: React.Reducer<S, NewStateAction> = (prev: S, newState: NewStateAction) => {
  const _newState = typeof newState === 'function' ? newState(prev) : newState
  return {...prev, ..._newState}
}

type S = typeof initialState
const initialState: UserContextState = {
  user: null
}

export const UserContext = createContext<UserContextValueType>({} as UserContextValueType)

const UserContextProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = firebase.auth()

  useEffect(() => {
    auth.onAuthStateChanged(user => dispatch({user: user}))
  }, [auth])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      { props.children }
      </UserContext.Provider>
  )
}

export default UserContextProvider;
