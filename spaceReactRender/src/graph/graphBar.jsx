import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import graphBar from './graphBar.scss';

export default class GraphBar extends React.Component {
  // This is the BAR of the BarGraph
  render() {
    const {color, max, nbr, textColor} = this.props;
    const width = nbr*max;
    return (<div className={graphBar.bar} style={{width:width, 'backgroundColor': color}}><span style={{color:textColor}}>{nbr}</span></div>);
  }
}
