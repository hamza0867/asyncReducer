import React, {Reducer, Dispatch, useReducer} from 'react';

export interface State {
  loading: boolean;
}

export enum UiAction {
  TOGGLE_FETCH_UP,
  TOGGLE_FETCH_DOWN
}


export type UiStoreAction = {
  type: UiAction;
}

const initState: State = {
  loading: false
}

const reducer: Reducer<State, UiStoreAction> = (state, action) => {
  switch (action.type) {
    case UiAction.TOGGLE_FETCH_UP: {
      console.log("fetching ...");
      return {
        ...state,
        loading: true
      }
    }
    case UiAction.TOGGLE_FETCH_DOWN: {
      console.log("done fetching");
      return {
        ...state,
        loading: false
      };
    }
    default: {
      return state
    }
  }
}

type StoreContextProps = {state: State, dispatch: Dispatch<UiStoreAction>}

export const Store2Context = React.createContext<StoreContextProps>({} as StoreContextProps)

const Store2Provider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <Store2Context.Provider value={{state, dispatch}}>
      {children}
    </Store2Context.Provider>
  )
}

export default Store2Provider

