import React from 'react';
import './App.css';
import Chart from './Chart'
import axios from 'axios'

class App extends React.Component {
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
  height: 500,
  width: 500
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Chart data={this.state.data} width={this.state.width} height={this.state.height} />

      </div>
    );
  }
}


export default App;
