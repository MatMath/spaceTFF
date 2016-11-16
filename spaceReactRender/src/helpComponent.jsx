import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class HelpComponentList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      msgArray: this.props.msgArray,
      display: true
    }
    this.setToTrue = this.setToTrue.bind(this);
    this.setToFalse = this.setToFalse.bind(this);
  }
  setToTrue() {
    this.setState({display: true});
    console.log("Set to true");
  }
  setToFalse() {
    console.log("Set to False");
    this.setState({display: false});
  }
  render() {
    const {msgArray, display} = this.state;
    return (
      <div>
        {display ? <button className='btn btn-info' onClick={this.setToFalse}>Hide</button> : null}
        {!display ? <button className='btn btn-info' onClick={this.setToTrue}>Info</button> : null}
        <span>{display}</span>
        {display ?
          <ul>
          {msgArray.map((string, index) => {
            return (<li key={index}>{string}</li>)
          })}
          </ul> : null }
      </div>
    )
  }
}
