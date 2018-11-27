import React, {Component} from 'react'

export default class AssignAnimal extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="animal">Animal</label>
          <select defaultValue="" name="animal" id="animal" onChange={this.props.handleFieldChange}>
            <option value="">Assign an animal</option>
            {
              this.props.animals.map(j => <option key={j.id} id={j.id}>{j.name}</option>)
            }
            <option value="addAnimal">Add New Animal</option>
          </select>
        </div>
      </React.Fragment>
    )
  }
}