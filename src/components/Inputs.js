import React, { useState } from 'react'
import usersvg from '../svg/user.svg'
import password from '../svg/password.svg'
import email from '../svg/email.svg'

export function Input({ name, type, svg}){
    const [value, setValue] = useState('')
    
    let style = {
        background: `url(${svg}) no-repeat scroll 7px 7px`,
        width: '300px',
        backgroundColor: '#EEEEEE'
    }
    return  (
        <input type={type} className='input' style={style} onChange={(e)=>setValue(e.target.value)} value={value} placeholder={name}/> 
    )
}

export default function Inputs({ page }) {

    switch (page) {
        case 'Login':
            return (
                <>
                    <Input name={'Username'} type={'text'} svg={usersvg}/>
                    <Input name={'Password'} type={'password'} svg={password}/>
                </>
            )
        case 'Register':
            return (
                <>
                    <Input name={'Username'} type={'text'} svg={usersvg}/>
                    <Input name={'Password'} type={'password'} svg={password}/>
                    <Input name={'Email'} type={'email'} svg={email}/>
                </>
        )

        default:
            return (
                null
            )
    }
}
