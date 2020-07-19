import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Inputs from './components/Inputs';
import SubmitBtn from './components/SubmitBtn';


function App() {

  let card = 'card'
  const [isLoginPage, setIsLoginPage] = useState(false)
  return (
    <div className={card}>
      <div className='heading'>{isLoginPage? 'Login' : 'Register'}</div>
      <Form>
        <Inputs page={isLoginPage? 'Login' : 'Register'}/>
        <SubmitBtn name={isLoginPage? 'Login' : 'Register'}/>
      </Form>
      <div className={'last'}>{isLoginPage? 'Doesn’t have an account yet? ' : 'Already have an account ? '}<span style={{cursor:'pointer',color:'#7CD0FF'}} onClick={()=>setIsLoginPage(!isLoginPage)}>{isLoginPage? 'Register' : 'Login'}</span></div>
    </div>
  )
}

export default App;
