import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import graphBar from './graphBar.scss'

export default class GraphBar extends React.Component {
  // This is the BAR of the BarGraph
  // When The graphSeparator change we change the Grid system so we need to force a redraw.
  constructor (props) {
    super(props);
    this.state = {
      nbr: this.props.nbr,
      maxRatio: this.props.max,
      color: this.props.color,
      textColor: this.props.textColor
    }
  }
  render() {
    const {color, maxRatio, nbr, textColor} = this.state;
    return (<div className={graphBar.bar} style={{width:nbr*maxRatio,'backgroundColor': color}}><span style={{color:textColor}}>{nbr}</span></div>)
  }
}
