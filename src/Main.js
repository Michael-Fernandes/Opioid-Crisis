import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./Resources/data.json";
import Legend from "./Components/Legend/Legend";
import Chart from "./Components/Chart/Chart";
import Header from "./Components/Page/Header";
import Footer from "./Components/Page/Footer";
import CountryBlock from "./Components/Chart/CountryBlock"
import "./Components/Chart/Chart.css"

class App extends Component {
  constructor(props){
    super(props)
    this.state = { countries : setActive(getActiveFromUrl(), Object.keys(data)), innerWidth: window.innerWidth }

    this.toggleActive = this.toggleActive.bind(this);
    this.getActive = this.getActive.bind(this);
    this.selectBlock = this.selectBlock.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this)
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

  updateDimensions(){
      this.setState({innerWidth: window.innerWidth})
  }

  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    const width = (this.state.innerWidth > 750);
    console.log(width);
    return (
        <div className="App">
            <Header getActive={this.getActive}
                    selectBlock={this.selectBlock}/>
              <div className="content">
                <div >
                  <CountryBlock selectBlock={this.selectBlock}/>
                  
                  <div className="Chart-Wrapper">
                    { width
                    ?  <div className="chart-content">
                          <Chart countries={this.state.countries} />
                          <Legend countries={this.state.countries}
                                  toggleActive={this.toggleActive}/>
                      </div>
                    : <div className="chart-content">
                        <Legend countries={this.state.countries}
                                    toggleActive={this.toggleActive}/>
                        <Chart countries={this.state.countries} />
                        
                      </div>

                    }
                     
                  </div>
                </div>
              </div>
            <Footer />
        </div>
    );
  }
}

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

export default App;
