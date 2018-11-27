import React, {Component} from 'react'

export default class AnimalDetails extends Component {
  render(){
    return(
      <React.Fragment>
          <div className="form-group">
            <label htmlFor="animalName">Animal name</label>
            <input type="text" required={true}
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="animalName"
              placeholder="Animal name" />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Breed</label>
            <input type="text" required={true}
              className="form-control"
              onChange={this.props.handleFieldChange}
              id="breed" placeholder="Breed" />
          </div>
      </React.Fragment>
    )
  }
}