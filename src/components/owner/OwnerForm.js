import React, { Component } from 'react'
import "./OwnerList.css"
import CaptureOwnerDetail from './CaptureOwnerDetail'
import AssignAnimal from './assignAnimal'
import SubmitButton from './SubmitButton'
import AnimalDetails from '../animal/CaptureAnimalDetails'

class OwnerForm extends Component{
  state={
    ownerName: "",
    ownerPhone: "",
    animalName: "",
    breed: "",
    animal: "",
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    if(evt.target.id ==="ownerFirstName"){
      let lastName = document.querySelector("#ownerLastName")
      stateToChange["ownerName"] = `${evt.target.value} ${lastName.value}`
    } else if(evt.target.id === "ownerLastName"){
      let firstName = document.querySelector("#ownerFirstName")
      stateToChange["ownerName"] = `${firstName.value} ${evt.target.value}`
    } else if(evt.target.id === "animal" && evt.target.value === "addAnimal"){
     this.props.showAnimalForm()
    } else{
      stateToChange[evt.target.id] = evt.target.value
    }
    this.setState(stateToChange)
  }

  constructNewOwner=(evt)=>{
    evt.preventDefault()
    let postedOwner=""
    let postedAnimal=""
    if(this.state.animal === "" && this.state.animalName === ""){
      window.alert("Please select an animal")
    } else if(this.props.addAnimalState === true){
      const owner = {
        name: this.state.ownerName,
        phoneNumber: this.state.ownerPhone,
      }
      this.props.addOwner(owner)
      .then((newOwner)=> {
        postedOwner = newOwner
        const animal = {
          name: this.state.animalName,
          breed: this.state.breed,
        }
        return this.props.addAnimal(animal)})
        .then((newAnimal)=> {
          postedAnimal = newAnimal
          const animalOwner = {
            ownerId: postedOwner.id,
            animalId: postedAnimal.id,
          }
        return this.props.addAnimalOwner(animalOwner)
        })
      .then(()=> this.props.history.push("/owners"))
      }
    else{
      const owner = {
        name: this.state.ownerName,
        phoneNumber: this.state.ownerPhone,
      }

      // Create the animal and redirect user to animal list
      this.props.addOwner(owner).then((newOwner)=> {
        const animalOwner={
          ownerId: newOwner.id,
          animalId: this.props.animals.find(e => e.name === this.state.animal).id
        }
        return this.props.addAnimalOwner(animalOwner)
      }).then(() => this.props.history.push("/owners"))
    }
  }


  render(){
    let animalStatus = () => <AssignAnimal animals={this.props.animals} handleFieldChange={this.handleFieldChange}/>
    if(this.props.addAnimalState === true){
      animalStatus = () => <AnimalDetails animals={this.props.animals} handleFieldChange={this.handleFieldChange}/>
    }
    return(
      <React.Fragment>
        <form>
          <CaptureOwnerDetail handleFieldChange={this.handleFieldChange} />
          {animalStatus()}
          <SubmitButton submitFunction={this.constructNewOwner}/>
        </form>
      </React.Fragment>
    )
  }
}

export default OwnerForm