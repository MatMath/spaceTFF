import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import GraphBar from './graphBar.jsx'
import styles from './graphBar.scss'

export default class BarGraph extends React.Component {
  // This is the Graph itself.
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth,
      savedBackup: this.props.savedBackup,
      checked: {
        Population: true,
        SavedPopulation: true,
        Death: true,
        SavedDeath: true
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    // Copy the object so we don't mutate the old state.
    // (This requires an Object.assign polyfill):
    const checked = Object.assign({}, this.state.checked)
    if (!checked[value]) {
      checked[value] = true;
    } else {
      checked[value] = false;
    };
    this.setState({checked});
  }
  render() {
    let maxMartian = this.state.checked.Population ? this.props.resultOfgrowth[this.props.resultOfgrowth.length - 1].martian : 0;
    let maxDeath = this.state.checked.Death ? this.props.resultOfgrowth[this.props.resultOfgrowth.length - 1].cummulativeLife : 0;
    let maxMartianBckup = 0, maxDeathBckup = 0;
    if (this.props.savedBackup.length > 0) {
      maxMartianBckup = this.state.checked.SavedPopulation ? this.props.savedBackup[this.props.savedBackup.length - 1].martian : 0;
      maxDeathBckup = this.state.checked.SavedDeath ? this.props.savedBackup[this.props.savedBackup.length - 1].cummulativeLife : 0;
    }
    // Strangely the "Math.max([maxMartian, maxDeath, maxMartianBckup, maxDeathBckup])" dosent work.
    let maxPop = Math.max(Math.max(maxMartian, maxDeath), Math.max(maxMartianBckup, maxDeathBckup));
    console.log('maxPop:', maxPop);
    let maximumWidthRatio = 500/maxPop;
    let graphSeparator = Math.round(maxPop/5/100)*100; //Round to the hundrer by basic.
    if (graphSeparator > 1000) {
      graphSeparator = Math.round(maxPop/5/1000)*1000; //if large number round to the thousant.
    }
    const {resultOfgrowth, checked, savedBackup} = this.state;
    const popColor = 'rgba(0, 196, 255, 0.55)';
    const deathColor = '#ec581f';
    const savedPopColor = 'rgba(0, 255, 78, 0.76)';
    const savedDeathColor = 'rgb(236, 163, 31)';
    // console.log('BckupTransmitted:', savedBackup);
    return (<div>
        <div className='row'>
          <div className='col-sm-3'>
            <div><strong>Current Run</strong></div>
            <div style={{'backgroundColor': popColor}}>Population: <input
              type="checkbox"
              value="Population"
              onChange={this.handleChange}
              defaultChecked={true} />
            </div>
            <div style={{'backgroundColor': deathColor}}>Death: <input
              type="checkbox"
              value="Death"
              onChange={this.handleChange}
              defaultChecked={true} />
            </div>
          </div>
          {savedBackup.length > 0 && <div className='col-sm-3'>
            <div><strong>Previous Run</strong></div>
            <div style={{'backgroundColor': savedPopColor}}>Population: <input
              type="checkbox"
              value="SavedPopulation"
              onChange={this.handleChange}
              defaultChecked={true} />
            </div>
            <div style={{'backgroundColor': savedDeathColor}}>Death: <input
              type="checkbox"
              value="SavedDeath"
              onChange={this.handleChange}
              defaultChecked={true} />
            </div>
          </div>}
        </div>
        <h3>Population Growth</h3>
        <div className={styles.graph_header}>
          <div className='col-xs-2'>Years</div>
          <div className='col-xs-10'>Data Grid: {graphSeparator}</div>
        </div>
        <div className={`${styles.fix_graph_container}`}>
          {resultOfgrowth.map((item, index)=> {
            return (<div key={index} className='row'>
              <div className={`col-xs-1 ${styles.vcenter}`}>
                <div>{Math.round(index*22/12)}</div>
              </div>
              <div className={`col-xs-11 ${styles.vcenter}`}>
                <div style={{'backgroundSize': graphSeparator*maximumWidthRatio + 'px', 'backgroundImage': 'linear-gradient(to right, grey 1px, transparent 1px)'}}>
                  {checked.Population && <GraphBar nbr={item.martian} max={maximumWidthRatio} color={popColor} textColor='black'></GraphBar>}
                  {checked.Death && <GraphBar nbr={item.cummulativeLife} max={maximumWidthRatio} color={deathColor} textColor='black'></GraphBar>}
                  {savedBackup.length > 0 && checked.SavedPopulation && savedBackup[index] && <GraphBar nbr={savedBackup[index].martian} max={maximumWidthRatio} color={savedPopColor} textColor='black'></GraphBar>}
                  {savedBackup.length > 0 && checked.SavedDeath && savedBackup[index] && <GraphBar nbr={savedBackup[index].cummulativeLife} max={maximumWidthRatio} color={savedDeathColor} textColor='black'></GraphBar>}
                </div>
              </div>
            </div>);
          })}
        </div>
      </div>)
  }
}
