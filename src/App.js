import React from 'react';
import './App.css';
import Chart from './Chart'
import axios from 'axios'
import BarChart from './BarChart'
import ControlPanel from './ControlPanel'


class App extends React.Component {
  constructor () {
    super()
    this.starRatingButtonClicked = this.starRatingButtonClicked.bind(this)
    this.perFootButtonClicked = this.perFootButtonClicked.bind(this)
  }

  componentDidMount(){
    this.fetchData()
  }


  async fetchData () {
    let res = await axios.get('/api')
    this.setState({
      data: res.data
    })

  }
  state = {
  data: [],
  xAxisTitle: 'yearbuilt',
  yAxisTitle: 'energystarscore',
  height: 500,
  width: 500,
  checked: false,
  chart: false
  }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
  }

  async starRatingButtonClicked () {
    let res = await axios.get('/api')
    this.setState({
      data: res.data,
      yAxisTitle: 'energystarscore'
    })
  }

  async perFootButtonClicked () {
    let res = await axios.get('/api/perFoot')
    this.setState({
      data: res.data,
      yAxisTitle: 'energyperfoot'
    })
  }

  async totalGHGButtonClicked() {
    let res = await axios.get('/api/totalGHG')
    this.setState({
      data: res.data,
      yAxisTitle: 'totalghg'
    })
  }

  render() {
    return (

      <div className="App">
        <h1>Welcome to EnergyViz</h1>
        <h3>Let's learn about D3!</h3>
        <label>
          <ControlPanel checked={this.state.checked} onChange={this.handleCheckboxChange} />
          <span style={{marginLeft: 8}}>Label Text</span>
        </label>
        <div>
          <button className='button' onClick={() => this.starRatingButtonClicked()} >Energy Star Rating</button>
          <button className='button' onClick ={ () => this.perFootButtonClicked () } >Energy Per Foot</button>
          <button className='button' onClick={() => this.starRatingButtonClicked()} >Energy Star Rating</button>
          <button className='button' onClick={() => this.totalGHGButtonClicked()} >Total GHG</button>
        </div>
          <div>Graph of: {this.state.xAxisTitle} vs {this.state.yAxisTitle} line graph</div>
          <Chart xAxisTitle={this.state.xAxisTitle} yAxisTitle={this.state.yAxisTitle} data={this.state.data} width={this.state.width} height={this.state.height} checked={this.state.checked}/>
          <BarChart xAxisTitle={this.state.xAxisTitle} yAxisTitle={this.state.yAxisTitle} data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}


export default App;
