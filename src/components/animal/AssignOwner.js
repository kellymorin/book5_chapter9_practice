import React, {Component} from 'react'

export default class AssignOwner extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="owner">Assign to owner</label>
          <select defaultValue="" name="owner" id="owner" onChange={this.props.handleFieldChange}>
          <option value="">Select an owner</option>
            {
              this.props.owners.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
            }
          <option value="addOwner">Add New Owner</option>
          </select>
        </div>
      </React.Fragment>
    )
  }
}