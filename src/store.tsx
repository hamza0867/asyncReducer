import React, {Reducer, Dispatch, useReducer, useContext} from 'react';
import {UiStoreAction, UiAction, Store2Context} from './store2';

const url = "https://jsonplaceholder.typicode.com/todos"

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface State {
  todos: Todo[];
}

export enum Action {
  UPDATE_TODO,
  UPDATE_TODOS,
  FETCH_TODOS,
}


export type StoreAction = {
  type: Action;
  payload?: Todo | Todo[]
}

const initState: State = {
  todos: []
}

const reducer: Reducer<State, StoreAction> = (state, action) => {
  switch (action.type) {
    case Action.UPDATE_TODOS: {
      return {
        ...state,
        todos: (action.payload as Todo[])
      }
    }
    default: {
      return state
    }
  }
}

const middleware = (dispatch: Dispatch<StoreAction>, uiDispatch: Dispatch<UiStoreAction>) =>
  async (action: StoreAction) => {
    switch (action.type) {
      case Action.FETCH_TODOS: {
        uiDispatch({type: UiAction.TOGGLE_FETCH_UP})
        const todos: Todo[] = await fetch(url).then(res => res.json()).then((res: any[]) => {
          const ret = res.slice(0, 5)
          console.log(ret);
          return ret
        })
        dispatch({type: Action.UPDATE_TODOS, payload: todos})
        uiDispatch({type: UiAction.TOGGLE_FETCH_DOWN})
        return;
      }
      default:
        return;
    }
  }

type StoreContextProps = {state: State, dispatch: Dispatch<StoreAction>}

export const StoreContext = React.createContext<StoreContextProps>({} as StoreContextProps)

const StoreProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initState)
  const {dispatch: uiDispatch} = useContext(Store2Context)
  return (
    <StoreContext.Provider value={{state, dispatch: middleware(dispatch, uiDispatch)}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider

