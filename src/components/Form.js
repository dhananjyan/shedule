import React from 'react'

export default function Form({ children }) {
    const style={ 
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
    return (
        <form style={style} onSubmit={(e)=>{
            e.preventDefault()
            alert('Success')
        }}>
            {children}
        </form>
    )
}
