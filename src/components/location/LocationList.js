import React, {Component} from 'react'
import "./LocationList.css"
import {Link} from 'react-router-dom'

export default class LocationList extends Component{
  render(){
    return(
      <section className="locations">
      {
        this.props.locations.map(location =>
          <div key={location.id}>
            <h4>{location.name}</h4>
            <Link className="nav-link" to={`/locations/${location.id}`}>Details</Link>
          </div>
          )
      }
      </section>
    )
  }
}