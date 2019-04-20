import React, { Component } from 'react';

class PlayerCard extends Component {
  constructor(props){
    super(props);
    this.state={
      player: "",
      rating: 0
    }
  }
  plusClick = () => {
    this.setState({rating: this.state.rating + 1}, () => {
      this.props.ratingChange(this.props.player.name, this.state.rating)
    })
  }
  minusClick = () => {
    if (this.state.rating > 0){
      this.setState({rating: this.state.rating - 1}, () => {
        this.props.ratingChange(this.props.player.name, this.state.rating)
      })
    }
  }
  componentDidMount(){
    this.setState({player: this.props.player.name, rating: this.props.player.rating})
  }
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
          <li>rating: {this.props.player.rating}</li>
        </ul>
        <div key={this.props.player.name}><button onClick={this.plusClick}>+</button><button onClick={this.minusClick}>-</button></div>
      </div>
      
    );
  }
}

export default PlayerCard;