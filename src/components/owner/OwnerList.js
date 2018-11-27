import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./OwnerList.css"
import person from './ownerIcon.png'

export default class OwnerList extends Component{
  render(){
    return (
      <React.Fragment>
        <div className="ownerButton">
          <button type="button" className="btn btn-success" onClick={()=> {
            this.props.history.push("/owners/new")
          }}>Add Owner</button>
        </div>
      <section className="owners">
        {
          this.props.owners.map(owner =>
            <div key={owner.id} className="card">
            <img src={person} className="icon--owner"/>
              <h3>{owner.name}</h3>
              <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
            </div>
            )
        }
      </section>
      </React.Fragment>
    )
  }
}