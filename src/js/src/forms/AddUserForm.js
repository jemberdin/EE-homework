import React, { Component } from 'react';
import { Formik } from 'formik'; 
import { Input, Button } from 'antd';
import './Input.css';
import { addNewUser } from '../client';

class AddUserForm extends Component {
    state = {  
        type: 'text'
    }

    render() { 
        return (
            <Formik
                initialValues={{ firstName: '', lastName: '',  date: '', email: '', address: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.firstName) {
                        errors.firstName = 'First name required'
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Last name required'
                    }
                    if (!values.date) {
                        errors.date = 'Date of birth required'
                    }
                    if (!values.email) {
                    errors.email = 'Email required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    if (!values.address) {
                        errors.address = 'Address required'
                    }
                    return errors;
                }}
                onSubmit={(user, { setSubmitting }) => {
                    addNewUser(user).then(() => {
                        this.props.onSuccess();
                        setSubmitting(false);
                    }) 
                }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        submitForm,
                        isValid,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Input
                                className='Input'
                                name='firstName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder='First name'
                            />
                            {errors.firstName && touched.firstName && <div className='ErrorMessage'>{errors.firstName}</div>}
                            <Input
                                className='Input'
                                name='lastName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder='Last name'
                            />
                            {errors.lastName && touched.lastName && <div className='ErrorMessage'>{errors.lastName}</div>}
                            <Input
                                className='Input'
                                name='date'
                                type={ this.state.type } 
                                onFocus={ () => this.setState({type: 'date'}) }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.date}
                                placeholder='Date of birth'
                            />
                            {errors.date && touched.date && <div className='ErrorMessage'>{errors.date}</div>}
                            <Input
                                className='Input'
                                name='email'
                                type='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email e.g examle@gmail.com'
                            />
                            {errors.email && touched.email && <div className='ErrorMessage'>{errors.email}</div>}
                            <Input
                                className='Input'
                                name='address'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                placeholder='Address'
                            />
                            {errors.address && touched.address && <div className='ErrorMessage'>{errors.address}</div>}
                            <Button 
                                onClick={() => submitForm()} 
                                type='submit' 
                                disabled={isSubmitting || (touched && !isValid)}>
                                Submit
                            </Button>
                        </form>
                    )}
            </Formik>
        );
    }
}
 
export default AddUserForm;