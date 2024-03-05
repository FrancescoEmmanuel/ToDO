import React, {useState} from 'react'
import Button,{SelectButton} from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterModal from './FilterModal';



function Header({setModal}) {

  return (
    <div className='flex items-center justify-between h-[60px]'>
        {/* <button type ="button"> + New task</button> */}
        {/* <h1 className="text-5xl text-center ">To-do List</h1> */}
       
        <Button onClick= {() => setModal(true)}>+ New Task</Button>
   
          <button className="bg-white text-gray-800 p-2 px-2 py-1 rounded-xl flex gap-2 items-center">
                      <FontAwesomeIcon icon={faFilter}/>
                       Filter
          </button>
        
          {/* <SelectButton>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </SelectButton>
      */}
      
        {/* <SelectButton>
          <option value=""
        </SelectButton>
        */}
       
      </div>
  )
}

export default Header;