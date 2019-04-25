import React from 'react';
import './App.css';
import Chart from './Chart'




class App extends React.Component {
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
