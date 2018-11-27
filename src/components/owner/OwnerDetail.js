import React, {Component} from 'react'
import "./OwnerList.css"
import {Link} from 'react-router-dom'
import person from './ownerIcon.png'

export default class OwnerDetail extends Component{
  animalOwners(ownerId){
    let animalOwner = this.props.animalsOwners
    .filter(join => join.ownerId === ownerId)
    .map(join => this.props.animals.find(animal => animal.id === join.animalId))
    return animalOwner
  }


  render(){
    const owner = this.props.owners.find(a => a.id === parseInt(this.props.match.params.ownerId)) || {}

    return(
      <section className="owner">
        <div key={owner.id} className="card">
          <div className="card-body">
          <img src={person} className="icon--owner"/>
            <h4 className="card-title">{owner.name}</h4>
            <h6 className="card-title">{owner.phoneNumber}</h6>
            <div>
              <h3>Animals</h3>
              {
                this.animalOwners(owner.id).map(ownedAnimal => <Link key={ownedAnimal.id}className="nav-link" to={`/animals/${ownedAnimal.id}`}>
                <div className="card details">
                  <p>Name: {ownedAnimal.name}</p>
                 <p>Breed:{ownedAnimal.breed}</p>
                </div>
                </Link>
                )
              }

            </div>
            <Link className="nav-link" to={"/owners"}     onClick={()=> {
                return this.props.deleteOwners(owner.id)}}>Remove Owner</Link>
          </div>
        </div>
      </section>
    )
  }
}