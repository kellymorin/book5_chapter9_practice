import React, { Component } from 'react'
import "./Animal.css"
import CaptureOwnerDetail from "../owner/CaptureOwnerDetail"
import SubmitButton from "../owner/SubmitButton"
import AnimalDetails from "./CaptureAnimalDetails"
import AssignOwner from './AssignOwner'

class AnimalForm extends Component {
  // Set initial state
  state = {
    animalName: "",
    breed: "",
    employee: "",
    ownerName: "",
    ownerPhone: "",
    owner: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    if(evt.target.id === "owner" && evt.target.value === "addOwner"){
      this.props.showOwnerForm()
    }else if(evt.target.id === "ownerFirstName"){
      let lastName = document.querySelector("#ownerLastName")
      stateToChange["ownerName"] = `${evt.target.value} ${lastName.value}`
    }else if(evt.target.id === "ownerLastName"){
      let firstName = document.querySelector("#ownerFirstName")
      stateToChange["ownerName"] = `${firstName.value} ${evt.target.value}`
    }else{
      stateToChange[evt.target.id] = evt.target.value
    }
    this.setState(stateToChange)
  }

  /*
      Local method for validation, creating animal object, and
      invoking the function reference passed from parent component
   */
  constructNewAnimal = evt => {
    evt.preventDefault()
    let postedOwner= ""
    let postedAnimal= ""
    if(this.state.employee === ""){
      window.alert("Please select a caretaker")
    }
    else if(this.props.addOwnerState === true){
      const animal ={
        name: this.state.animalName,
        breed: this.state.breed,
        employeeId: this.props.employees.find(e => e.name === this.state.employee).id
      }
      this.props.addAnimal(animal)
      .then((newAnimal)=> {
        postedAnimal = newAnimal
        const owner = {
          name: this.state.ownerName,
          phoneNumber: this.state.ownerPhone
        }
        return this.props.addOwner(owner)
      })
      .then((newOwner)=> {
        postedOwner = newOwner
        const animalOwner = {
          ownerId: postedOwner.id,
          animalId: postedAnimal.id
        }
        return this.props.addAnimalOwner(animalOwner)
      }).then(()=> this.props.history.push("/animals"))
    } else{
      const animal ={
        name: this.state.animalName,
        breed: this.state.breed,
        employeeId: this.props.employees.find(e => e.name === this.state.employee).id
      }
      this.props.addAnimal(animal)
      .then((newAnimal)=> {
        const animalOwner={
          ownerId: this.props.owners.find(e => e.name === this.state.owner).id,
          animalId: newAnimal.id
        }
        return this.props.addAnimalOwner(animalOwner)
      }).then(()=> this.props.history.push("/animals"))
    }
  }

  render() {
    let ownerStatus = () => <AssignOwner owners={this.props.owners} handleFieldChange={this.handleFieldChange} />
    if(this.props.addOwnerState === true){
      ownerStatus = () => <CaptureOwnerDetail owners={this.props.owners} handleFieldChange={this.handleFieldChange} />
    }
    return (
      <React.Fragment>
        <form className="animalForm">
          <AnimalDetails handleFieldChange={this.handleFieldChange}/>
          <div className="form-group">
            <label htmlFor="employee">Assign to caretaker</label>
            <select defaultValue="" name="employee" id="employee"
              onChange={this.handleFieldChange}>
              <option value="">Select an employee</option>
              {
                this.props.employees.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
              }
            </select>
          </div>
          {ownerStatus()}
          <SubmitButton submitFunction={this.constructNewAnimal} />
        </form>
      </React.Fragment>
    )
  }
}


export default AnimalForm