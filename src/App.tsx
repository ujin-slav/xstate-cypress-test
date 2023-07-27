import { useMachine } from '@xstate/react';
import React, { useEffect, useState,useCallback } from 'react'
import { Events, formMachine } from './machines/formMachine';
import { myMachine } from './machines/myFirstMachine'

function App() {

  const[validate,setValidate]=useState(true)
  const [current,send] = useMachine(myMachine)
  const [stateForm, sendForm] = useMachine(formMachine);
  const { values, errors } = stateForm.context;

  useEffect(() => {
    send('FETCH')
  },[]);

  const handleChange = useCallback(
    (e:any):any => {
      e.preventDefault();
      sendForm(Events.CHANGE, { key: e.target.name, value: e.target.value });
    },
    [sendForm]
  );

  const handleSubmit=()=>{
    sendForm(Events.SUBMIT);
  }
  
  const changeHandler=(text:string)=>{
    if(text.length>5){
      setValidate(false)
    }
  }

  return (
    <div >
      <input placeholder="name" onChange={(e)=>changeHandler(e.target.value)}/>
      <button disabled={validate}>Жми..</button>
      <div>
      <div>
        {current.context.user.map((item:any,index)=>
          <div key={index}>{item.username}</div>
        )}
      </div>
      </div>
      <div>
        Имя
      </div>
      <input  
        name="name"
        onChange={handleChange}
      />
      <span style={{color:'red'}}>{errors.name}</span>
      <div>
        Компания
      </div>
      <input 
        name="company"
        onChange={handleChange}
       />
      <span style={{color:'red'}}>{errors.company}</span>
      <div>
        <button onClick={()=>handleSubmit()}>Отправить</button>
      </div>
    </div>
  );
}

export default App;
