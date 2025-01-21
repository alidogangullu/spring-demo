import React, {useEffect, useState}  from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {id} = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const navigator = useNavigate()

  useEffect(() => {
    if(id){
        getEmployeeById(id).then(response => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
        }).catch(error => {
            console.error('There was an error!', error)
        })
    }
  }, [id])

  function saveEmployee(e) {
    e.preventDefault()

    const employee = {firstName, lastName, email}
    

    if (validateForm()) {

        if (id) {
            updateEmployee(id, employee).then(response => {
                console.log('Employee updated successfully', response)
                navigator('/employees')
            }).catch(error => {
                console.error('There was an error!', error)
            })
        } else {
            createEmployee(employee).then(response => {
                console.log('Employee created successfully', response)
                navigator('/employees')
            }).catch(error => {
                console.error('There was an error!', error)
            })
        }
        
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = {...errors}

    if (firstName.trim()) {
        errorsCopy.firstName = '';
    } else {
        errorsCopy.firstName = 'First Name is required';
        valid = false;
    }

    if (lastName.trim()) {
        errorsCopy.lastName = '';
    } else {
        errorsCopy.lastName = 'Last Name is required';
        valid = false;
    }

    if (email.trim()) {
        errorsCopy.email = '';
    } else {
        errorsCopy.email = 'Email is required';
        valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
        return <h2 className='text-center'>Update Employee</h2>
    } else {
        return <h2 className='text-center'>Add Employee</h2>
    }
}

  return (
    <div className='container'>
        {pageTitle()}
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label>First Name:</label>
                            <input placeholder='First Name' name='firstName' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Last Name:</label>
                            <input placeholder='Last Name' name='lastName' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input placeholder='Email' name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveEmployee}>Save</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default EmployeeComponent