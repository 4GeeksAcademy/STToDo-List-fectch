import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';

export const Todolist = () => {
    const [taskList, setTasklist] = useState([]);
    const [inputValue, setInputValue] = useState(''); 

    useEffect(() => {
      (async () => {
        try {
          const response = await fetch("https://playground.4geeks.com/todo/users/steven");
          if (response.status == 404) {
            await createUser();
          }
          await getTaskslist();
        } catch (error) {
          console.error("Error:", error);
        }
      });
      },[]);

      async function createUser(){
        try {
          const response = await fetch("https://playground.4geeks.com/todo/users/steven", {
          method: "POST",
          headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
          body: JSON.stringify({
          name: "steven",
        }),
        });
        if (response.status !== 201) {
          console.error("Error:", response.status, response.statusText);
        }
        } catch (error) {
        console.error("Error:", error);
        }
      }

      const getTaskslist = async () => {
    
        const response = await fetch("https://playground.4geeks.com/todo/users/steven");
        const data = await response.json();
        setTasklist(data.todos || []); 
      };
      

  
    const inputChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
      };

      const keyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setTasklist([...taskList, inputValue]);
            setInputValue('');
        }
      };
      const deleteTask = (index) => {
        setTasklist(taskList.filter((_, i) => i !== index));
      };

    return (
        <div className="container">
            <div className="mb-2">
                <label className="fs-4 text-white">Your tasks here: 
                  <input type="text" placeholder="what needs to be done" value={inputValue} onChange={inputChange} onKeyDown={keyDown} /> 
                </label>
            </div>
            {taskList.length > 0 ? (
                <ul className="d-flex flex-column bg-dark ps-0" > 
                    {taskList.map((item, index) => (
					          <li className="fs-2 ms-3 p-2 text-white rounded border border-danger d-flex justify-content-center" key={index}>{item}    
                    <div className="d-flex ms-auto"><button type="button" onClick={() => deleteTask(index)} className="btn btn-dark">
                      <FontAwesomeIcon icon={faCircleXmark} /></button></div></li>
                    ))}
                    <li className="fs-5 d-flex ms-3 me-auto bg-dark text-white">{taskList.length} items left</li>
                </ul>
            ) : (
              <p className="fs-2 ms-3 p-2 text-white d-flex justify-content-center">NOT PENDING TASKS</p>
            )}     
        </div>
    );
}