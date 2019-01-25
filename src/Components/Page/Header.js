import React, { Component } from 'react';
import copy from 'copy-to-clipboard';

import "./Page.css"

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = { copied:false }

        this.share = this.share.bind(this)
    }

    share(){
        let activeCountriesStr = this.props.getActive().map(el => el.name).toString();
        copy(window.location.href +  "/active" + activeCountriesStr);
        setTimeout(function() {
            this.setState({copied:false});
        }.bind(this), 1500);
        this.setState({copied:true})
    }
  
    render() {
        return (
            <div className="Header">
                <div className="headerWrapper"><h1>Opoid Crisis</h1><h2>Global Burden of Disease</h2> </div>  

                <button onClick={this.share} className="shareBttn">Share View</button>

                <div className={this.state.copied ? "copied": "copied noCopy"}>
                    Chart View <br/>Copied to clipboard!
                </div>
            </div>
        )
    }
}
