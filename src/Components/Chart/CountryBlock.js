import React, { Component } from 'react'
import Countries from "../../Resources/Continents"

const highest = ['United States', 'Libya', 'United Arab Emirates', 'Estonia', 'Russian Federation', 'Iran', 'Canada', 'Lebanon', 'Kazakhstan', 'Lithuania'];
const lowest = ['South Sudan', 'Ethiopia', 'Burundi', 'Egypt', 'Somalia', 'Rwanda', 'Uganda', 'Solomon Islands', 'Madagascar', 'Papua New Guinea']

const selectTop = ["--", "Top 10 Highest", "Top 10 Lowest"]

const blocks = ["--", 
    "EU (European Union)", 
    "AU (African Union)", 
    "USAN (Union of South American Nations)", 
    "AL (Arab League)", 
    "ASEAN (Association of Southeast Asian Nations)", 
    "PA (Pacific Alliance)", 
    "USAN (Union of South American Nations)"
];

const continents = {
    "--":"--",
    "Africa": "AF",
    "Asia": "AS",
    "Europe": "EU",
    "North America": "NA",
    "Oceania": "OC",
    "South America": "SA"
};

export default class CountryBlock extends Component {
  constructor(props){
      super(props);
      this.state = { selected:"--", continent:"--", selectTop:"--"};
      
      this.onSelect = this.onSelect.bind(this);
      this.onSelectContinent = this.onSelectContinent.bind(this);
      this.onSelectTop = this.onSelectTop.bind(this);
  }

  onSelect(event){
    let { selectBlock } = this.props;
    const code = event.target.value.split(" ")[0];
    if (code !== "--"){
        fetch("https://restcountries.eu/rest/v2/regionalbloc/" + code)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                selectBlock(json.map(el => el.name));
            }).catch((err) => console.log(err) );
    } else {
        selectBlock([]);
    }

    this.setState({selected: event.target.value, continent:"--", selectTop:"--"});
  }

  onSelectContinent(event){
    let selectedCountries = []
    let countryAbv = Object.keys(Countries);
    let selectedAbv = countryAbv.filter( elem => {
        console.log(elem)
        console.log(Countries[elem].continent, continents[event.target.value]);
        console.log(Countries[elem].continent == continents[event.target.value])
        return Countries[elem].continent == continents[event.target.value]
    });

    for(let i = 0; i < selectedAbv.length; i++){
        if (countryAbv.indexOf(selectedAbv[i]) !== -1){
            selectedCountries.push(Countries[selectedAbv[i]].name);
        } 
    }

    this.props.selectBlock(selectedCountries);
    this.setState({selected: "--", continent:event.target.value, selectTop:"--"});
  }

  onSelectTop(event){
    if(event.target.value == "Top 10 Highest"){
        this.props.selectBlock(highest);
    } else if(event.target.value == "Top 10 Lowest"){
        this.props.selectBlock(lowest);
    } else{
        this.selectBlock("--")
    }
    this.setState({selected:"--", continent:"--", selectTop:event.target.value})
  }

  render() {
    return (
        <div className="selectDropdownWrapper">
            <div className="selectDropdown">
                <label style={{display:'block', "fontWeight":"600"}}>
                    Country Blocks
                </label>
                <select value={this.state.selected} onChange={this.onSelect} className="selectBlock">
                    {blocks.map((elem, index) => <option value={elem} key={index}>{elem}</option> )}
                </select>
            </div>
            <div className="selectDropdown">
                <label style={{display:'block', "fontWeight":"600"}}>
                    Countries
                </label>
                <select value={this.state.continent} onChange={this.onSelectContinent} className="selectBlock">
                    {Object.keys(continents).map((elem, index) => <option value={elem} key={index}>{elem}</option> )}
                </select>
            </div>
            <div className="selectDropdown">
                <label style={{display:'block', "fontWeight":"600"}}>
                    Top 10 Highest
                </label>
                <select value={this.state.selectTop} onChange={this.onSelectTop} className="selectBlock">
                    {selectTop.map((elem, index) => <option value={elem} key={index}>{elem}</option> )}
                </select>
            </div>
        </div>
    )
  }
}
