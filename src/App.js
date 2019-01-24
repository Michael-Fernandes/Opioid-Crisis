import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3'
import data from "./Resources/data.json"
import Legend from './Components/Legend/Legend'
import Chart from "./Components/Chart"
import "./Components/Chart/Chart.css"

const createActive = (countries) => {
  let d = []
  for( let country of countries.sort() ){
    d.push({name:country, active:false})
  }
  return d
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = { countries : createActive(Object.keys(data)),}

    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive(country){
    let countries = this.state.countries;

    let selectedCountry = countries[ countries.findIndex(elem => elem.name == country) ]
    let newActive = countries.filter(elm => elm.name !== country);

    let toggledActive = !selectedCountry.active;
    newActive.push({name:country, active:toggledActive})

    this.setState({countries: newActive.sort((a, b) =>  a.name.localeCompare(b.name) )})
  }

  render() {
    return (
      <div className="App">
        <div className="Chart-Wrapper">
          <Chart countries={this.state.countries}/>
          <Legend countries={this.state.countries}
                  toggleActive={this.toggleActive}/>
        </div>
      </div>
    );
  }
}

export default App;
