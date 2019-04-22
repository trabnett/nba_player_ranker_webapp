import React, { Component } from 'react';

class Header extends Component {
    render() {
      return (
        <header className="header">
          <div className="header-div">
            <img className="nba-logo" src='https://theundefeated.com/wp-content/uploads/2017/05/nba-logo.png' alt="nba logo"></img>
            <h1 className="welcome">Welcome to the NBA Player Ranker</h1>
          </div>

        </header>
      );
    }
  }
  
  export default Header;