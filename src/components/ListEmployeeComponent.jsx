import React, {useEffect, useState} from "react";
import {deleteEmployee, listEmployees} from "../services/EmployeeService.js";
import {useNavigate} from "react-router-dom";

const ListEmployeeComponent = () => {

    const [employees, setEmployee] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee()
    }, [])

    function getAllEmployee() {
        listEmployees().then((response) => {
            setEmployee(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log(id)
        deleteEmployee(id).then((resp) => {
            getAllEmployee()
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'> List Of Employee</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className={'btn btn-info'} onClick={() => updateEmployee(employee.id)}>Update
                                </button>
                                <button className={'btn btn-danger'} style={{marginLeft: '10px'}} onClick={() => removeEmployee(employee.id)}>Delete
                                </button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent