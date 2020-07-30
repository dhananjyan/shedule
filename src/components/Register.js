import React, { Component } from 'react'
import '../App.css';
import { TextInput, Password, Email } from '../forms/Inputs'
import Validate from '../forms/Validate'
import { register } from '../forms/Forms'
import {
    Link
  } from "react-router-dom";
import {addUserQuery} from '../query/query'
import Button from '../buttons/Button';



export class Register extends Component {

    constructor() {
        super()
        this.state = {
          ...register,
          message: '',
          loading: false
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
      this.setState({loading: true}) 
      const formData = {};
      for (let formElementId in this.state.formControls) {
          formData[formElementId] = this.state.formControls[formElementId].value;
      }
      // const [addTodo, { data }] = useMutation(addUser);
      this.props.mutate({ variables: { username: formData.username, password: formData.password, email: formData.email } })
      .then(() => { 
        this.setState({message: 'Thank you for your registration'}) 
        this.setState({loading: false}) 
      })
      .catch(() => {
        this.setState({message: 'Username or Email already exist'})
        this.setState({loading: false}) 
        // console.log(res)
        // const errors = res.graphQLErrors.map(error => error.message);
        // console.log(errors)
      });
      // console.log(data)
      // fetch('http://localhost:5000/graphql', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json',
      //     },
      //     body: JSON.stringify({query: `mutation {
      //         addUser(username:"${formData.username}", password:"${formData.password}", email:"${formData.email}") {
      //           username
      //         }
      //       }`})
      //   })
      //     .then(r => r.json())
      //     .then(({data: { addUser }, errors}) => {
      //       if(addUser) {
      //         this.setState({
      //           message: 'Thank you for your registration'
      //         })
      //         return
      //       } 
      //       if(errors) {
      //         this.setState({
      //           message: 'Username or Email already exist'
      //         })

      //       }
      //       return
      //     });
      
    }
    
    
    render() {
        
        return (
          <div className='component-a'>
            <div className={'card'}>
                <div className='heading'>Register</div>
                <div>{this.state.message}</div>
                <Email name="email" 
                    placeholder={this.state.formControls.email.placeholder}
                    value={this.state.formControls.email.value}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.email.touched}
                    valid={this.state.formControls.email.valid}
                    className={this.state.formControls.email.className}
                />
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
                    className={this.state.formControls.password.className}
                />
                <Button onClick={this.formSubmitHandler} 
                  disabled={! this.state.formIsValid}
                  className='btn' type='submit'
                  name='Register'
                  loading={this.state.loading}
                />
                <div className={'last'}>Already have an account ? <span style={{cursor:'pointer',color:'#7CD0FF'}}><Link to="/login">Login</Link></span></div>
            </div>
          </div>
        )
    }
}

export default addUserQuery(Register)
