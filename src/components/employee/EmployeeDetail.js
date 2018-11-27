import React, {Component} from 'react'
import "./EmployeeList.css"
import {Link} from 'react-router-dom'
import moment from 'moment'
import person from './employeeIcon.png'

export default class EmployeeDetail extends Component{
  render(){
    const employee = this.props.employees.find(a => a.id === parseInt(this.props.match.params.employeeId)) || {}

    return(
      <section className="employee">
        <div key={employee.id} className="card">
          <div className="card-body">
            <img src={person} className="icon--employee"/>
            <h4 className="card-title">{employee.name}</h4>
            <p>{employee.phoneNumber}</p>
            <p>Employed Since: {moment(employee.employedDate).format("dddd, MMMM Do YYYY")} </p>
            <Link className="nav-link" to={"/employees"}     onClick={()=> {
                return this.props.deleteEmployees(employee.id)}}>Fire Employee</Link>
          </div>
        </div>
      </section>
    )
  }
}