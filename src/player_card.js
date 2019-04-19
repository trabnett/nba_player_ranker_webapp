import React, { Component } from 'react';

class PlayerCard extends Component {

    render() {
      return (
        <div>
          <div><img className="player_pic" src={this.props.player.picture_url} alt="player avatar"/></div>
          <ul>
            <li>Name: {this.props.player.name}</li>
            <li>Ppg: {this.props.player.ppg}</li>
            <li>Assists: {this.props.player.assists}</li>
            <li>Rebounds: {this.props.player.rebounds}</li>
            <li>Per: {this.props.player.per}</li>
          </ul>
        </div>
      );
    }
  }
  
  export default PlayerCard;