import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./Resources/data.json";
import Legend from "./Components/Legend/Legend";
import Chart from "./Components/Chart";
import Header from "./Components/Page/Header";
import Footer from "./Components/Page/Footer";
import CountryBlock from "./Components/Chart/CountryBlock"
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./Components/Chart/Chart.css"

const getActiveFromUrl =() =>{
  let activeUrl = "active="
  let index = window.location.href.search("active") + activeUrl.length;
  let activeCountries = decodeURIComponent(window.location.href.slice(index - 1));
  return activeCountries.split(",");
}

const setActive = (activeCountries, countries) => {
  let d = []
  for( let name of countries.sort() ){
    let active = activeCountries.includes(name);
    d.push({
          name,
          active,
    })
  }
  return d
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = { countries : setActive(getActiveFromUrl(), Object.keys(data))}

    this.toggleActive = this.toggleActive.bind(this)
    this.getActive = this.getActive.bind(this);
    this.selectBlock = this.selectBlock.bind(this)
  }

  toggleActive(country){
    let countries = this.state.countries;

    let selectedCountry = countries[ countries.findIndex(elem => elem.name == country) ]
    let newActive = countries.filter(elm => elm.name !== country);

    let toggledActive = !selectedCountry.active;
    newActive.push({name:country, active:toggledActive})

    this.setState({countries: newActive.sort((a, b) =>  a.name.localeCompare(b.name) )})
  }

  getActive(){
    return this.state.countries.filter(el => el.active === true)
  }

  selectBlock(block){
    this.setState({countries: setActive(block, Object.keys(data))})
  }

  render() {
    
    return (
        <div className="App">
            <Header getActive={this.getActive}
                    selectBlock={this.selectBlock}/>
              <div className="content">
                <div >
                  <CountryBlock selectBlock={this.props.selectBlock}/>
                  
                  <div className="Chart-Wrapper">
                    <div className="chart-content">
                      <Chart countries={this.state.countries}/>
                      <Legend countries={this.state.countries}
                              toggleActive={this.toggleActive}/>
                    </div>
                  </div>

                </div>
              </div>
            <Footer />
        </div>
    );
  }
}

export default App;
