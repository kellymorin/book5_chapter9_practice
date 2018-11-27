import React, {Component} from 'react'
import dog from './DogIcon.png'
import {Link} from 'react-router-dom'
import "./Animal.css"

export default class AnimalList extends Component{

  animalOwners(animalId){
    let animalOwner = this.props.animalsOwners
    .filter(join => join.animalId === animalId)
    .map(join => this.props.owners.find(owner => owner.id === join.ownerId ).name)

    if (animalOwner.length === 0){
      animalOwner = ["no one"]
    }
    return animalOwner
  }

  render(){
    return(
      <React.Fragment>
      <div className="animalButton">
        <button type="button" className="btn btn-success"
          onClick={() => {
            this.props.history.push("/animals/new")}
          }> Admit Animal</button>
      </div>
      <section className="animals">
      {
        this.props.animals.map(animal =>
          <div key={animal.id} className="card">
          <img src={dog} className="icon--dog"/>
            {animal.name}
            <p>Owned by: {this.animalOwners(animal.id).join(" & ")}</p>
            <Link className="nav-link" to={`/animals/${animal.id}`}>Details</Link>
            <a href= "#"
              onClick={()=> this.props.deleteAnimals( animal.id)}
              className="card-link">Delete</a>
          </div>
        )
      }
      </section>
    </React.Fragment>
    )
  }
}