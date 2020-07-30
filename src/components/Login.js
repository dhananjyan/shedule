import React, { Component } from 'react'
import '../App.css';
import { TextInput, Password } from '../forms/Inputs'
import Validate from '../forms/Validate'
import { loginForm } from '../forms/Forms'
import { Link } from "react-router-dom";
  import {loginQuery} from '../query/query'
  import { Redirect } from "react-router-dom";
import Button from '../buttons/Button';
  
export class Login extends Component {
    constructor() {
        super()
        this.state = {
          ...loginForm,
          message: '',
          isLogin: false,
          loading: false,
          rest: []
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    changeHandler(event) {
        
      this.setState({
        message: ''
      })
        const name = event.target.name
        const value = event.target.value
  
        const updatedControls = {
          ...this.state.formControls
        }
        const updatedFormElement = {
          ...updatedControls[name]
        }
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = Validate(value, updatedFormElement.validationRules)
  
        updatedControls[name] = updatedFormElement
  
        let formIsValid = true
        for (let inputIdentifier in updatedControls) {
          formIsValid = updatedControls[inputIdentifier].valid && formIsValid
        }
  
        this.setState({
          formControls: updatedControls,
          formIsValid: formIsValid
        });
  
    }
    
    formSubmitHandler = () => {
      const { addDatas, mutate } = this.props
        this.setState({ loading: true})
        const formData = {};
        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value;
        }
        
        mutate({ variables: { username: formData.username, password: formData.password } })
        .then(() => { 
          addDatas('username', formData.username)
          addDatas('login', true)
          this.setState({ loading: false})
          this.setState({ isLogin: true})
        })
        .catch(() => {
          this.setState({message: 'Username or password incorrect'})
          this.setState({ loading: false })
          
          // console.log(res)
          // const errors = res.graphQLErrors.map(error => error.message);
          // console.log(errors)
        });
        // fetch('http://localhost:5000/graphql', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Accept': 'application/json',
        //     },
        //     body: JSON.stringify({query: `mutation {
        //         login(username: "${formData.username}", password: "${formData.password}"){
        //           username
        //           email
        //           password
        //         }
        //       }`})
        //   })
        //     .then(r => r.json())
        //     .then(({ data: { login } }) => {
        //       if(login) {
        //         console.log(login)
        //       } else {
        //         this.setState({
        //           message: 'Username or password incorrect'
        //         })
        //       }
        //     });
        
      }
    
    
    render() {
        if(this.state.isLogin) {
          return <Redirect to="/user"/>
        }
        
        return (
          <div class='component-a'>
            <div className={'card'}>
                <div className='heading'>Login</div>
                <div style={{color: 'red'}}>{this.state.message}</div>
                <TextInput name="username" 
                    placeholder={this.state.formControls.username.placeholder}
                    value={this.state.formControls.username.value}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.username.touched}
                    valid={this.state.formControls.username.valid}
                    className={this.state.formControls.username.className}
                />
                <Password name="password" 
                    placeholder={this.state.formControls.password.placeholder}
                    value={this.state.formControls.password.value}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.password.touched}
                    valid={this.state.formControls.password.valid}
                    className={this.state.formControls.username.className}
                />
                <Button onClick={this.formSubmitHandler} 
                  disabled={! this.state.formIsValid}
                  className='btn' type='submit'
                  name='Login'
                  loading={this.state.loading}
                />

                <div className={'last'}>Doesn’t have an account yet? <span style={{cursor:'pointer',color:'#7CD0FF'}}><Link to="/register">Register</Link></span></div>
            </div>
          </div>
        )
    }
}

export default loginQuery(Login)
