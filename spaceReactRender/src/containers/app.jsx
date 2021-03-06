import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/index.scss';
import React from 'react';

import { connect } from 'react-redux';

// modules
import GraphSection from './graphSection.jsx';
import TableDisplay from '../components/tableDisplay.jsx';
import HelpComponentList from '../components/helpComponent.jsx';
let localAddress = process.env.API_HTTP_SERVER;
// The API_HTTP_SERVER is currently set to the AWS server. The config is in the Webpack.config.js module on top.

// Loading actions
import { changeYears, changeMaxPopulation, change_baseParam_paramServer, changeCargoItem, change_baseParam_paramServer_maxPersPerShip, change_baseParam_paramServer_persPerShip } from '../actions/paramActions';
import { getGrowthProjection, saveThisBackup } from '../actions/fetchActions';

const mapStateToProps = state => {
    // Similar to "state" in React, this will get the Passed value or the default value from the store.
    return {
      persPerShip: state.baseParam.paramServer.persPerShip,
      cargo: state.baseParam.paramServer.cargo,
      persIncreasePertrip: state.baseParam.paramServer.persIncreasePertrip,
      maxPersPerShip: state.baseParam.paramServer.maxPersPerShip,
      engineMalfunction: state.baseParam.paramServer.engineMalfunction,
      refuilingDefect: state.baseParam.paramServer.refuilingDefect,
      landingFaillure: state.baseParam.paramServer.landingFaillure,
      reusabilityOfShip: state.baseParam.paramServer.reusabilityOfShip,
      improvement: state.baseParam.paramServer.improvement,
      firstStageEngine: state.baseParam.paramServer.firstStageEngine,
      itsEngine: state.baseParam.paramServer.itsEngine,
      touristRatio: state.baseParam.paramServer.touristRatio,
      orbitRefulling: state.baseParam.paramServer.orbitRefulling,
      probIncreaseProdOfIts: state.baseParam.paramServer.probIncreaseProdOfIts,
      itsIncreaseOf: state.baseParam.paramServer.itsIncreaseOf,
      maxPop: state.baseParam.paramRun.maxPop,
      years: state.baseParam.paramRun.years,
      resultOfgrowth: state.calculatedData.resultOfgrowth,
      savedBackup: state.calculatedData.savedBackup,
      fetching: state.calculatedData.fetching,
      shipConfigurationHelp: ['Reusability of ship: Number of trip a ship can do before being recycled',
      'First Stage Engine: Number of Engine that lift the first stage',
      'ITS Engine: Number of engine inside the Interplanettery Transport System',
      'Orbit Refulling: Number of refuelling in orbit needed'],
      riskListHelp: ['TakeOff (Each engine)',
      'Refueling (each time)',
      'Journey to mars (Each engine)',
      'Decelarating on arrival (Each engine)',
      'Landing on mars',
      'Refueling --> No loss of life, just ship',
      'TakeOff/Journey (Each engine)',
      'Decelarating on arrival (Each engine)',
      'Landing on earth']
    };
};


class App extends React.Component {
  constructor (props) {
    super(props);
    this.saveThisBackup = this.saveThisBackup.bind(this);
    this.getGrowthProjection = this.getGrowthProjection.bind(this);
  }

  changeYears (event) {
      let value = (isNaN(parseInt(event.target.value)) === true) ? '' : parseInt(event.target.value);
      this.props.dispatch(changeYears(value));
  }
  changeMaxPopulation (event) {
    let value = (isNaN(parseInt(event.target.value)) === true) ? '' : parseInt(event.target.value);
    this.props.dispatch(changeMaxPopulation(value));
  }
  changeNumberValue (key, event) {
    if (key && event.target.value !== undefined) {
      let value = parseFloat(event.target.value);
      if(isNaN(value) === true) {
        // if someone remove the # to input another we endup in NAN so we need to replace to empty value.
        value = '';
      }
      this.props.dispatch(change_baseParam_paramServer(key, value));
    }
  }
  changeCargoCapacity (key, event) {
    let value = (isNaN(parseInt(event.target.value)) === true) ? '' : parseInt(event.target.value);
    this.props.dispatch(changeCargoItem(key, this.props.cargo, value, this.props.persPerShip, this.props.maxPersPerShip));
  }
  change_maxPersPerShip (event) {
    let value = (isNaN(parseInt(event.target.value)) === true) ? '' : parseInt(event.target.value);
    this.props.dispatch(change_baseParam_paramServer_maxPersPerShip(value, this.props.cargo, this.props.persPerShip));
  }
  change_persPerShip (event) {
    let value = (isNaN(parseInt(event.target.value)) === true) ? '' : parseInt(event.target.value);
    this.props.dispatch(change_baseParam_paramServer_persPerShip(value, this.props.cargo, this.props.maxPersPerShip));
  }
  getGrowthProjection() {
    if (this.props.fetching === false) {
      // TODO: A reorganisation of only the data we need to send is good idea instead of the growing list data.
      let serverData = {
        persPerShip: this.props.persPerShip,
        cargo: this.props.cargo,
        persIncreasePertrip: this.props.persIncreasePertrip,
        maxPersPerShip: this.props.maxPersPerShip,
        engineMalfunction: this.props.engineMalfunction,
        refuilingDefect: this.props.refuilingDefect,
        landingFaillure: this.props.landingFaillure,
        reusabilityOfShip: this.props.reusabilityOfShip,
        improvement: this.props.improvement,
        firstStageEngine: this.props.firstStageEngine,
        itsEngine: this.props.itsEngine,
        touristRatio: this.props.touristRatio,
        orbitRefulling: this.props.orbitRefulling,
        probIncreaseProdOfIts: this.props.probIncreaseProdOfIts,
        itsIncreaseOf: this.props.itsIncreaseOf,
        maxPop: this.props.maxPop,
        years: this.props.years
      };
      this.props.dispatch(getGrowthProjection(localAddress, serverData));
    }
  }
  saveThisBackup() {
    const backup = Object.assign([], this.props.resultOfgrowth);
    this.props.dispatch(saveThisBackup(backup));
  }
  render () {
    const {cargo, persIncreasePertrip, maxPersPerShip, shipConfigurationHelp, riskListHelp, persPerShip, engineMalfunction, refuilingDefect, landingFaillure, reusabilityOfShip, improvement, firstStageEngine, itsEngine, touristRatio, orbitRefulling, probIncreaseProdOfIts, itsIncreaseOf, resultOfgrowth, maxPop, years} = this.props;
    return (
      <div className='container'>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}> Faillure type </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group' data-toggle="tooltip" data-placement="bottom" title="Chance that 1 engine have a critical defect.">
              <label className='col-sm-6 control-label'>Engine Malfunction</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='0.001'
                  min='0'
                  value={engineMalfunction}
                  onChange={this.changeNumberValue.bind(this, 'engineMalfunction')} />
              </div>
            </div>
            <div className='form-group' data-toggle="tooltip" data-placement="bottom" title="Chance of refueling critical event.">
              <label className='col-sm-6 control-label'>Refuiling Defect</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={refuilingDefect}
                  onChange={this.changeNumberValue.bind(this, 'refuilingDefect')} />
              </div>
            </div>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Landing Faillure</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={landingFaillure}
                  onChange={this.changeNumberValue.bind(this, 'landingFaillure')} />
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group' data-toggle="tooltip" data-placement="bottom" title="Improvement on the defect.">
              <label className='col-sm-6 control-label'>Improvement</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  max='1'
                  value={improvement}
                  onChange={this.changeNumberValue.bind(this, 'improvement')} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>
            % of change of faillure on each component,
            ex: If we have 42 engines to Launch the first stage and 1% chance of defect then a dice is roll for each engine to see if it will fail catastrophically or not.
            Improvement ratio is reducing the fail rate ex: First launch = 10% defect, 2e launch = 10% * (1 - improvement)
          </p>
        </div>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}> Ship configuration </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Reusability of ship</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='1'
                  min='0'
                  max='50'
                  value={reusabilityOfShip}
                  onChange={this.changeNumberValue.bind(this, 'reusabilityOfShip')} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Orbit Refulling</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='1'
                  min='0'
                  max='50'
                  value={orbitRefulling}
                  onChange={this.changeNumberValue.bind(this, 'orbitRefulling')} />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>First Stage Engine</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={firstStageEngine}
                  onChange={this.changeNumberValue.bind(this, 'firstStageEngine')} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>ITS Engine</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={itsEngine}
                  onChange={this.changeNumberValue.bind(this, 'itsEngine')} />
              </div>
            </div>
          </div>
        </div>

        <div className='row col-xs-12'>
          <HelpComponentList msgArray={shipConfigurationHelp}></HelpComponentList>
        </div>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}>Crew & Cargo configuration </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Maximum crew per ship</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={maxPersPerShip}
                  onChange={this.change_maxPersPerShip.bind(this)} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Starting crew #</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  max={maxPersPerShip}
                  value={persPerShip}
                  onChange={this.change_persPerShip.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Crew augmentation per transfers</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  max='100'
                  value={persIncreasePertrip}
                  onChange={this.changeNumberValue.bind(this, 'persIncreasePertrip')} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Tourist Ratio</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='0.01'
                  max='1'
                  value={touristRatio}
                  onChange={this.changeNumberValue.bind(this, 'touristRatio')} />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Max cargo capacity (t)</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min={cargo.final}
                  step='1'
                  max='1000'
                  value={cargo.initial}
                  onChange={this.changeCargoCapacity.bind(this, 'initial')} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Full crew min cargo capacity (t)</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='300'
                  step='1'
                  max='1000'
                  value={cargo.final}
                  onChange={this.changeCargoCapacity.bind(this, 'final')} />
              </div>
            </div>
          </div>
        </div>
        <div className='row col-xs-12'>
          <p>Current payload: {cargo.current}</p>
          <p>Payload per crew: {cargo.tonsPerPerson} (Less people mean more payload)</p>
        </div>

        <div className={`row col-xs-12 bg-info ${styles.splitSection}`}> Production increase </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Chance of increase</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='0'
                  step='0.01'
                  max='1'
                  value={probIncreaseProdOfIts}
                  onChange={this.changeNumberValue.bind(this, 'probIncreaseProdOfIts')} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group' data-toggle="tooltip" data-placement="bottom" title="# of Internation Transport Vehicule.">
              <label className='col-sm-6 control-label'>ITS Increase</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='1'
                  min='0'
                  max='50'
                  value={itsIncreaseOf}
                  onChange={this.changeNumberValue.bind(this, 'itsIncreaseOf')} />
              </div>
            </div>
          </div>
        </div>
        <div className='row col-xs-12'>
          <p>Chance of increase: Chance that this round we increase the ship production by a total of "ITS Increase"</p>
        </div>

        <div className={`row col-xs-12 bg-warning ${styles.splitSection}`}> Run parameters </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Population to reach</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  min='100'
                  step='100'
                  max='5000000'
                  value={maxPop}
                  onChange={this.changeMaxPopulation.bind(this)} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='col-sm-6 control-label'>Max number of run</label>
              <div className='col-sm-6'>
                <input type='number' className='form-control'
                  step='1'
                  min='1'
                  max='1000'
                  value={years}
                  onChange={this.changeYears.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className='row col-xs-12'>
          <h4>Risk list:</h4>
          <HelpComponentList msgArray={riskListHelp}></HelpComponentList>
        </div>

        <div className={`row ${styles.submit_btn}`}>
          <button className={'btn btn-lg btn-success'} disabled={this.props.fetching} onClick={this.getGrowthProjection}>Get the Data!</button>
          <button className={'btn btn-lg btn-warning'} disabled={this.props.fetching} onClick={this.saveThisBackup}>Save a backup</button>
        </div>

        {/* Table display can be here since it is a Dumb component */}
        {resultOfgrowth.length > 0 && <TableDisplay resultOfgrowth={resultOfgrowth}></TableDisplay>}
        <GraphSection />
      </div>
    );
  }
}

// Exporting the Store + app "Connected"
export default connect(mapStateToProps)(App);
