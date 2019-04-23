import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PlayerCard extends Component {
  constructor(props){
    super(props);
    this.state={
      player: "",
      rating: 0
    }
  }
  toggleShowModal = () => {
    this.props.toggleShowModal(this.props.player.name)
  }
  plusClick = () => {
    this.setState({player: this.props.player.name, rating: this.props.player.rating + 1}, () => {
      this.props.ratingChange(this.props.player.name, this.state.rating)
    })
  }
  minusClick = () => {
    if (this.state.rating > 0){
      this.setState({player: this.props.player.name, rating: this.props.player.rating - 1}, () => {
      this.props.ratingChange(this.props.player.name, this.state.rating)
      })
    }
  }
  componentWillMount(){
    this.setState({player: this.props.player.name, rating: this.props.player.rating})
  }
  render() {
    return (
      <div>
        <div><img className="player_pic" src={this.props.player.picture_url} alt="player avatar"/></div>
        <div>
          <Button variant="primary" onClick={this.toggleShowModal}>Watch Videos</Button>
        </div>
        <ul>
          <li>Name: {this.props.player.name}</li>
          <li>Ppg: {this.props.player.ppg}</li>
          <li>Assists: {this.props.player.assists}</li>
          <li>Rebounds: {this.props.player.rebounds}</li>
          <li>Per: {this.props.player.per}</li>
          <li>rating: {this.props.player.rating}</li>
        </ul>
        <div>
          <Button onClick={this.plusClick} variant="primary" size="sm">
            +
          </Button>
          <Button onClick={this.minusClick} variant="primary" size="sm">
            -
          </Button>
        </div>
      </div>
      
    );
  }
}

export default PlayerCard;