import React, {useContext} from 'react';
import {StoreContext, Action} from './store';

const App: React.FC = () => {
  const {state: {todos}, dispatch} = useContext(StoreContext)
  return (
    <>
      <div style={{
        marginTop: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <button onClick={() => dispatch({type: Action.FETCH_TODOS})}>
          Refresh todos
      </button>
      </div>
      <div style={{
        marginTop: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{marginBottom: "15px"}}>
              Title: {todo.title} <br />
              Completed: {"" + todo.completed}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
