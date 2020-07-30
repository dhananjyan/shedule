export const register = {
    formIsValid: false,
    formControls: {
        username: {
            value: '',
            placeholder: 'Username',
            valid: false,
            validationRules: {
                minLength: 4,
                isRequired: true
            },
            touched: false,
            className: 'input'
        },
        password: {
            value: '',
            placeholder: 'Password',
            valid: false,
            validationRules: {
                minLength: 8,
                isRequired: true
            },
            touched: false,
            className: 'input'
        },
        email: {
            value: '',
            placeholder: 'Email',
            valid: false,
            validationRules: {
                isRequired: true,
                isEmail: true
            },
            touched: false,
            className: 'input'
        },
        
    }
}

export const loginForm = {
    formIsValid: false,
    formControls: {
        username: {
            value: '',
            placeholder: 'Username',
            valid: false,
            validationRules: {
                minLength: 2,
                isRequired: true
            },
            touched: true,
            className: 'input'
        },
        password: {
            value: '',
            placeholder: 'Password',
            valid: false,
            validationRules: {
                minLength: 8,
                isRequired: true
            },
            touched: false,
            className: 'input'
        }
        
    }
}

export const modalFormControls = {
    doctor: {
        value: '',
        placeholder: 'Select Your Convinient',
        valid: false,
        touched: false,
        className: 'input',
        validationRules: {
          isRequired: true,
        },
        options: []
    },
    date: {
        value: '',
        placeholder: 'Appointment Date',
        valid: false,
        touched: false,
        className: 'input',
        validationRules: {
          isRequired: true,
        },
    },
    time: {
        value: '',
        placeholder: 'Appointment Time',
        valid: false,
        touched: false,
        className: 'input',
    },
}