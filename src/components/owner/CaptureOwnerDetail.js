import React, {Component} from 'react'

export default class CaptureOwnerDetail extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="ownerName">Owner name</label>
          <input type="text" required={true}
            className="form-control"
            onChange={this.props.handleFieldChange}
            id="ownerFirstName"
            placeholder="Owner First Name" />
          <input type="text" required={true}
            className="form-control"
            onChange={this.props.handleFieldChange}
            id="ownerLastName"
            placeholder="Owner Last Name" />
        </div>
        <div className="form-group">
          <label htmlFor="ownerPhone">Owner Phone Number</label>
          <input type="text" required={true}
            className="form-control"
            onChange={this.props.handleFieldChange}
            id="ownerPhone"
            placeholder="Owner Phone Number" />
        </div>

      </React.Fragment>
    )
  }
}