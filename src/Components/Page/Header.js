import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import "./Page.css"
import CountryBlock from "../Chart/CountryBlock";

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            copied:false
        }
        this.share = this.share.bind(this)
    }

    share(){
        copy(window.location.href +  "/active" + this.props.getActive().map(el => el.name).toString());
        setTimeout(function(){
            this.setState({copied:false});
        }.bind(this),2000);
        this.setState({copied:true})
    }

  
    render() {
        return (
        <div className="Header">
            <h2>Opoid Crisis</h2>    
            <div onClick={this.share}>Share!</div>
            <div className={this.state.copied ? "copied": "noCopy"}>
                Copied to clipboard
            </div>
            <CountryBlock selectBlock={this.props.selectBlock}/>
        </div>
        )
    }
}
