import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { useDatas } from './context/DataContext'
import {
  Switch,
  Route
} from "react-router-dom"
import User from './components/User'

function App() {
  const { data: {datas:{login: isLoggedIn}}, addData } = useDatas()
  function addDatas(name, value) {
    addData(name, value)
  }
  return (
      <Switch>
        <Route
          path="/login"
          render={()=><Login addDatas={addDatas}/>}
          
        />
        <Route
          path="/register"
          component={Register}
        />
        {isLoggedIn && (
          <Route
            path="/user"
            component={User}
          /> 
        )}
    </Switch>
  )
}

export default App