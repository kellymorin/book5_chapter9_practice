import React, { Component } from 'react'
import "./EmployeeList.css"
import {Link} from 'react-router-dom'
import person from './employeeIcon.png'

export default class EmployeeList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="employeeButton">
          <button type="button" className="btn btn-success" onClick={()=> {
            this.props.history.push("/employees/new")
          }}>Add Employee</button>
        </div>
      <section className="employees">
        {
          this.props.employees.map(employee =>
            <div key={employee.id} className="card">
            <img src={person} className="icon--employee"/>
              {employee.name}
              <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
            </div>
          )
        }
      </section>
    </React.Fragment>
    )
  }
}