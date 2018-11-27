/* eslint-disable react/jsx-no-comment-textnodes */
import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import LocationManager from '../modules/LocationManager'
import OwnerManager from '../modules/OwnerManager'
import AnimalManager from '../modules/AnimalManager';
import EmployeeManager from '../modules/EmployeeManager';
import AnimalDetail from './animal/AnimalDetail'
import AnimalOwnerManager from '../modules/AnimalOwnerManager'
import OwnerDetail from './owner/OwnerDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import LocationDetail from './location/LocationDetail'
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owner/OwnerForm'
import Login from './authentication/Login'


export default class ApplicationViews extends Component {
  state = {
    locations: [],
    animals: [],
    owners: [],
    animalsOwners: [],
    employees: [],
    addAnimal: false,
    addOwner: false
  }

  componentDidMount() {
    const newState = {}

    AnimalManager.getAll().then(animals => newState.animals = animals)
      .then(()=> EmployeeManager.getAll().then(employees => newState.employees = employees))
      .then(() => LocationManager.getAll().then(locations => newState.locations = locations))
      .then(() => OwnerManager.getAll().then(owners => newState.owners = owners))
      .then(() => AnimalOwnerManager.getAll()
      .then(animalsOwners => newState.animalsOwners = animalsOwners))
      .then(()=> console.log(newState))
      .then(() => this.setState(newState))
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  deleteAnimals = (id) => {
    AnimalManager.delete(id).then(animals => this.setState({
      animals: animals
    }))
  }

  deleteEmployees = (id) => {
    EmployeeManager.delete(id).then(employees => this.setState({
      employees: employees
    }))
  }

  deleteOwners = (id) => {
    const newState = {}
    OwnerManager.deleteOwner(id).then(owners => newState.owners = owners)
    .then(() => AnimalManager.getAll()).then(animals => newState.animals = animals)
    .then(()=> AnimalOwnerManager.getAll())
    .then(animalsOwners => newState.animalsOwners = animalsOwners)
    .then(() => {
      this.setState(newState)
      console.log(this.state)
    })

  }
showOwnerForm = () => {
    this.setState({
      addOwner: true
    })
  }
hideOwnerForm = () => {
  this.setState({
    addOwner: false
  })
}

  showAnimalForm = () => {
    this.setState({
      addAnimal: true
    })
  }

  hideAnimalForm = ()=>{
    this.setState({
      addAnimal: false
    })
  }
  addAnimal = (animal) => {
    return new Promise((resolve, reject)=>{
      let newAnimal=""
      AnimalManager.post(animal)
      .then((response) => {
        console.log("response", response)
        newAnimal = response
        return AnimalManager.getAll()
      }).then(animals => this.setState({
         animals: animals
      }, ()=> resolve(newAnimal)))
    })
  }

  addEmployee = (employee) => {
    return EmployeeManager.post(employee).then(() => EmployeeManager.getAll())
    .then(employees => this.setState({
        employees: employees
      })
    )
    }

  addOwner = (owner) => {
    return new Promise((resolve, reject)=>{
      let newOwner = ""
      OwnerManager.post(owner)
      .then((response) => {newOwner = response
        return OwnerManager.getAll()
      })
      .then(owners => this.setState({
          owners: owners
        }, ()=> resolve(newOwner))
      )
    })
  }

  addAnimalOwner = (animalOwner) => {
    return new Promise((resolve, reject)=> {
      AnimalOwnerManager.post(animalOwner).then(() => AnimalOwnerManager.getAll())
      .then(animalsOwners => this.setState({
        animalsOwners: animalsOwners
      }, ()=> resolve())
      )
    })
  }


  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          if(this.isAuthenticated()){
            return <LocationList locations={this.state.locations} />
          } else{
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/login" component={Login} />
        <Route exact path="/animals" render={(props) => {
          if(this.isAuthenticated()){
            return <AnimalList {...props} animals={this.state.animals} owners={this.state.owners} animalsOwners={this.state.animalsOwners} deleteAnimals={this.deleteAnimals}/>
          } else{
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/employees" render={(props) => {
          if(this.isAuthenticated()){
            return <EmployeeList {...props} employees={this.state.employees}deleteEmployees={this.deleteEmployees}/>
          } else{
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/owners" render={(props) => {
          if(this.isAuthenticated()){
            return <OwnerList {...props} owners={this.state.owners} deleteOwners={this.deleteOwners} />
          } else{
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/animals/:animalId(\d+)" render={(props)=> {
          return <AnimalDetail {...props} deleteAnimals= {this.deleteAnimals} animals={this.state.animals}
          owners={this.state.owners} animalsOwners={this.state.animalsOwners} />
        }} />
        <Route path="/owners/:ownerId(\d+)" render={(props)=> {
          return <OwnerDetail {...props} owners={this.state.owners} deleteOwners={this.deleteOwners}
          animals={this.state.animals} animalsOwners ={this.state.animalsOwners}/>
        }} />
        <Route path="/employees/:employeeId(\d+)" render={(props)=> {
          return <EmployeeDetail {...props} employees={this.state.employees}deleteEmployees={this.deleteEmployees} />
        }} />
        <Route path="/locations/:locationId(\d+)" render={(props)=> {
          return <LocationDetail {...props} locations={this.state.locations} />
        }} />
      <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props}
          addAnimal={this.addAnimal}
          addOwner={this.addOwner}
          addAnimalOwner={this.addAnimalOwner}
          showAnimalForm={this.showAnimalForm}
          hideAnimalForm={this.hideAnimalForm}
          employees={this.state.employees}
          owners={this.state.owners}
          showOwnerForm={this.showOwnerForm}
          addOwnerState={this.state.addOwner}
          hideOwnerForm={this.hideOwnerForm} />
        }} />
      <Route path="/employees/new" render={(props) => {
          return <EmployeeForm {...props}
          addEmployee={this.addEmployee}/>
        }} />
      <Route path="/owners/new" render={(props) => {
          return <OwnerForm {...props}
          addAnimalState={this.state.addAnimal}
          showAnimalForm ={this.showAnimalForm}
          hideAnimalForm={this.hideAnimalForm}
          animals={this.state.animals}
          addOwner={this.addOwner}
          addAnimal={this.addAnimal}
          addAnimalOwner={this.addAnimalOwner}
          employees={this.state.employees}
          owners={this.state.owners}
          animalsOwners={this.state.animalsOwners}/>
        }} />
      </React.Fragment>
    )
  }
}