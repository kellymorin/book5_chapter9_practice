import React, { Component } from 'react'
import "./EmployeeList.css"
import moment from 'moment'

class EmployeeForm extends Component {
  // Set initial state
  state = {
    employeeName: "",
    phoneNumber: "",
    employedDate: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    if(evt.target.id === "employeeFirstName"){
      let lastName = document.querySelector("#employeeLastName")
      stateToChange["employeeName"] = `${evt.target.value} ${lastName.value}`
    } else if(evt.target.id === "employeeLastName"){
      let firstName = document.querySelector("#employeeFirstName")
      stateToChange["employeeName"] = `${firstName.value} ${evt.target.value} `
    } else{
      stateToChange[evt.target.id] = evt.target.value
    }
    this.setState(stateToChange)
  }

  /*
      Local method for validation, creating animal object, and
      invoking the function reference passed from parent component
   */
  constructNewEmployee = evt => {
    evt.preventDefault()
    const employee = {
      name: this.state.employeeName,
      phoneNumber: this.state.phoneNumber,
      employedDate: moment()
    }

      // Create the animal and redirect user to animal list
      this.props.addEmployee(employee).then(() => this.props.history.push("/employees"))

  }

  render() {
    return (
      <React.Fragment>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="employeeName">Employee name</label>
            <input type="text" required={true}
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeFirstName"
              placeholder="Employee First Name" />
            <input type="text" required={true}
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeLastName"
              placeholder="Employee Last Name" />
          </div>
          <div className="form-group">
            <label htmlFor="employeePhone">Employee Phone Number</label>
            <input type="text" required={true}
              className="form-control"
              onChange={this.handleFieldChange}
              id="phoneNumber"
              placeholder="111-111-1111" />
          </div>
          <button type="submit" onClick={this.constructNewEmployee} className="btn btn-primary">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default EmployeeForm