import React from "react"
import { useAppDispatch } from "../hooks/reduxHooks"
import { DeleteTodoItem,ChangeComlete } from "../redux/Slices/todoSlice"
interface TodosItemProps{
    id:string,
    title:string,
    completed?:boolean
}

const TodosItem:React.FC<TodosItemProps> = ({completed,id,title})=>{
    const dispatch = useAppDispatch()
    return(
        <ul key={id}className="todosBlock">
        <div className="todosItem">
         <button className='button-17' onClick={()=>dispatch(ChangeComlete(id))}>Complete</button>
         <li className={completed?"isCompleted":"list"}> {title}</li>
         <button className='button-17' onClick={()=>dispatch(DeleteTodoItem(id))}>Delete</button>
        </div>
      </ul>
    )
}
export default TodosItem;
