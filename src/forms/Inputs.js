
import React from 'react';
import usersvg from '../svg/user.svg'
import password from '../svg/password.svg'
import email from '../svg/email.svg'
import downArrow from '../svg/downArrow.svg'
import MoonLoader from "react-spinners/MoonLoader"

export const Password = props => {

    let formControl = "form-control";
    let inputStyle = {
        background: `url(${password}) no-repeat scroll 7px 7px`,
        width: '300px',
        backgroundColor: '#EEEEEE'
    }
    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="password" className={formControl} {...props} style={inputStyle}/>
        </div>
    );
}

export const Email = props => {

    let formControl = "form-control";
    let inputStyle = {
        background: `url(${email}) no-repeat scroll 7px 7px`,
        width: '300px',
        backgroundColor: '#EEEEEE'
    }
    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="email" className={formControl} {...props} style={inputStyle} />
        </div>
    );
}


export const TextInput = props => {

    let formControl = "form-control";
    
    let inputStyle = {
        background: `url(${usersvg}) no-repeat scroll 7px 7px`,
        width: '300px',
        backgroundColor: '#EEEEEE'
    }
    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="text" className={formControl} {...props} style={inputStyle}/>
        </div>
    );
}

export const Select = props => {

    let formControl = "form-control";
    
    let inputStyle = {
        background:` url(${downArrow}) no-repeat right #fff`,
        backgroundColor: '#EEEEEE',
        backgroundPositionX:'365px'
    }
    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }
    const select = props.options.length === 0 ? 'Please wait loading...' : 'Select your convinient...'
    return (
        <div className="form-group">
            <select className={formControl} className={props.className} style={inputStyle} value={props.value} onChange={props.onChange} name={props.name}>
              <option value='' key=''>{select}</option>
              {props.options.map(option => (
                <option value={option.value} key={option.value}>
                  {option.displayValue}
                </option>
              ))}
            </select>
        </div>
    );
}

export const Radio = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">

            {props.options.map(option => (
                <div className="form-group" key={option.value}>
                    <label>{option.displayValue}</label>
                    <input type="radio"
                        name={props.name}
                        value={option.value}
                        onChange={props.onChange}
                        className={formControl}
                    />
                </div>
            ))}

        </div>
    );
}


export const DateInput = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="date" className={formControl} {...props}/>
        </div>
    );
}


export const TimeInput = props => {

    let formControl = "form-control";
    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
            <input type="time" className={formControl} {...props}/>
        </div>
    );
}