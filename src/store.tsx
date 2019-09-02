import React, {Reducer, Dispatch, useReducer} from 'react';

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
  TOGGLE_FETCH_UP,
  TOGGLE_FETCH_DOWN
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
    case Action.TOGGLE_FETCH_UP: {
      console.log("fetching ...");
      return state;
    }
    case Action.TOGGLE_FETCH_DOWN: {
      console.log("done fetching");
      return state;
    }
    default: {
      return state
    }
  }
}

const middleware = (dispatch: Dispatch<StoreAction>) =>
  async (action: StoreAction) => {
    switch (action.type) {
      case Action.FETCH_TODOS: {
        dispatch({type: Action.TOGGLE_FETCH_UP})
        const todos: Todo[] = await fetch(url).then(res => res.json()).then((res: any[]) => res.slice(0, 5))
        dispatch({type: Action.UPDATE_TODOS, payload: todos})
        dispatch({type: Action.TOGGLE_FETCH_DOWN})
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
  return (
    <StoreContext.Provider value={{state, dispatch: middleware(dispatch)}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider

