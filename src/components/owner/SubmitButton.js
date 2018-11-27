import React, {Component} from 'react'

export default class SubmitButton extends Component{
  render(){
    return(
      <React.Fragment>
        <button type="submit" onClick={this.props.submitFunction} className="btn btn-primary">Submit</button>
      </React.Fragment>
    )
  }
}