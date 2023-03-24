import React from 'react';
import './App.scss';

import { FetchTodos,AddTodos } from './redux/Slices/todoSlice';
import {useAppDispatch,useAppSelector} from "./hooks/reduxHooks"

import TodosItem from './Components/TodosItem';
import Spiner from "./reuses-components/Spinner";
const App=()=>{
  const [inputValue,SetInputValue] = React.useState<string>("")
const todos = useAppSelector(state=>state.todo);
const dispatch = useAppDispatch();
console.log(todos)
const SetTodos = ()=>{
 if(inputValue)
 {
  dispatch(AddTodos(inputValue))
  SetInputValue("")
 }
}


  React.useEffect(()=>{
    dispatch(FetchTodos())
  },[])

  return (
    <div className="App">
      <div className="inputForm">
        <input value={inputValue} onChange={(e)=>SetInputValue(e.target.value)} type="text" placeholder='Write todos...' />
        <button className='button-17' onClick={()=>SetTodos()}>Set Todos</button>
      </div>
      {
        todos.isLoading 
        ?
        <Spiner/>
        :
        todos.todos.map(t=>(
          <TodosItem id={t.id} completed={t.completed} title={t.title}/>
        ))
        
      
      }
    </div>
  );
}

export default App;
