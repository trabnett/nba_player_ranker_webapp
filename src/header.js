import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Header extends Component {
  render() {
    // let pillStyle = {
    //   "maxHeight": "2.4em",
    //   "marginTop": "1.8em",
    //   "marginRight": "1.5em",
    //   "borderRadius": "25px",
    //   "opacity": ".6",
    //   "width": "4.3em";
    // }
    let btn
    this.props.showInfo ? btn = this.props.closeInfoModal : btn = this.props.openInfoModal
    return (
      <header className="header">
          <img className="nba-logo" src='https://theundefeated.com/wp-content/uploads/2017/05/nba-logo.png' alt="nba logo"></img>
          <h1 className="welcome">Welcome to the NBA Player Ranker</h1>
          <Button className="about-button" onClick={btn} variant="primary" size="sm">About</Button>
      </header>
    );
  }
}
  
export default Header;