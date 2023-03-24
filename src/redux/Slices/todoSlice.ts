import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Itodos } from "../../types/todosType";
type Istate = {
    todos:Itodos[],
    isLoading:boolean
}
const initialState : Istate = {
    todos:[],
    isLoading:false
}

export const FetchTodos = createAsyncThunk<Itodos[],undefined,{rejectValue:string}>(
    "todos/FetchTodos",
    async (_,{rejectWithValue})=>{
        const {data} = await axios.get<Itodos[]>("https://jsonplaceholder.typicode.com/todos?_limit=2")
        if(!data){
            return rejectWithValue("Server erorr")
        }
        return data;
    }

)

export const AddTodos = createAsyncThunk<Itodos,string,{rejectValue:string}>(
    "todos/AddTodos",
    async(title,{rejectWithValue})=>{
        const todoItems ={
            title:title,
            completed:false
        }
        const {data} = await axios.post<Itodos>("https://jsonplaceholder.typicode.com/todos",todoItems)
        if(!data){
            return rejectWithValue("Server erorr")
        }

        return data
    }
)

export const DeleteTodoItem = createAsyncThunk<string,string,{rejectValue:string}>(
    "todos/DeleteTodoItem",
    async(id,{rejectWithValue})=>{
        const {data} = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        if(!data){
            return rejectWithValue("Server erorr")
        }

        return id
    }
)
export const ChangeComlete = createAsyncThunk<Itodos, string, { rejectValue: string, state: { todo: Istate} }>(
    "todos/ChangeComlete",
    async (id, { rejectWithValue, getState }) => {
      
        const todo = getState().todo.todos.find((t) => t.id === id);
    
        if (!todo) {
          return rejectWithValue("Todo not found");
        }
        const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            ...todo,
            completed:!todo.completed
        });
        console.log(data)
      
        return data;
    
    }
  );
  
const TodoSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(FetchTodos.pending ,(state)=>{
            state.isLoading = true

        })
        builder.addCase(FetchTodos.fulfilled ,(state,action)=>{
            state.todos = action.payload
            state.isLoading = false
            
        })
        builder.addCase(AddTodos.pending ,(state)=>{
            state.isLoading = true

        })
        builder.addCase(AddTodos.fulfilled ,(state,action)=>{
            state.todos = ([...state.todos,action.payload])
            state.isLoading = false
           
            
        })
        builder.addCase(DeleteTodoItem.pending ,(state)=>{
            state.isLoading = true

        })
        builder.addCase(DeleteTodoItem.fulfilled ,(state,action)=>{
            state.todos = state.todos.filter(t=>t.id !== action.payload)
            state.isLoading = false
           
            
        })
        builder.addCase(ChangeComlete.fulfilled ,(state,action)=>{
          const toggle = state.todos.find(todo=>todo.id === action.payload.id)
          if(toggle){
            toggle.completed = !toggle.completed
          }            
        })
    }

})
export default TodoSlice;
