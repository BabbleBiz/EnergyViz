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
    console.log("In fetchData")
    console.log(res)
  }
  state = {
    data: [{
      date: 2019,
      value: 29
    }, {
        date: 2018,
        value: 26
    }, {
        date: 2017,
        value: 22
    },
  ],
  height: 500,
  width: 500
  }

  render() {
    return (
      <div className="App">
        <Chart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}


export default App;
