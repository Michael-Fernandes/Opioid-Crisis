import React, { Component } from 'react'
const blocks = ["--", "EU (European Union)", "AU (African Union)", "USAN (Union of South American Nations)", "AL (Arab League)", "ASEAN (Association of Southeast Asian Nations)", "PA (Pacific Alliance)", "USAN (Union of South American Nations)"]

export default class CountryBlock extends Component {
  constructor(props){
      super(props);
      this.state = { selected:"--" };

      this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event){
    let { selectBlock } = this.props;
    const code = event.target.value.split(" ")[0];
    if(code !== "--"){
        fetch("https://restcountries.eu/rest/v2/regionalbloc/" + code)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                selectBlock(json.map(el => el.name));
            }).catch((err) => console.log(err) );
    } else {
        selectBlock([]);
    }

    this.setState({selected: event.target.value});
  }

  render() {
    return (
        <div className="selectBlockWrapper">
            <label style={{display:'block', "fontWeight":"600"}}>
                CountryBlocks
            </label>
            <select value={this.state.selected} onChange={this.onSelect} className="selectBlock">
                {blocks.map((elem, index) => <option value={elem} key={index}>{elem}</option> )}
            </select>
        </div>
    )
  }
}
