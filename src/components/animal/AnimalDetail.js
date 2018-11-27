import React, {Component} from 'react'
import "./Animal.css"
import dog from "./DogIcon.png"
import {Link} from 'react-router-dom'

export default class AnimalDetail extends Component {
  animalOwners(animalId){
    let animalOwner = this.props.animalsOwners
    .filter(join => join.animalId === animalId)
    .map(join => this.props.owners.find(owner => owner.id === join.ownerId))

    return animalOwner
  }

  render(){
    const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}

    return (
      <section className="animal">
        <div key={animal.id} className="card">
          <div className="card-body">
            <h4 className="card-title">
              <img src={dog} className="icon--dog" />
                {animal.name}
            </h4>
            <h6 className="card-title">{animal.breed}</h6>
            <h3>Owned by:</h3>
            {
              this.animalOwners(animal.id).map(ownedAnimal => <Link className="nav-link" to={`/owners/${ownedAnimal.id}`}>{ownedAnimal.name}</Link>)
            }
            <Link className="nav-link" to={"/animals"}     onClick={()=> {
                return this.props.deleteAnimals(animal.id)}}>Delete</Link>
          </div>
        </div>
      </section>
    )
  }
}