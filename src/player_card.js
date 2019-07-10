import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { Spinner } from 'reactstrap';

class PlayerCard extends Component {
  constructor(props){
    super(props);
    this.state={
      player: '',
      rating: 0,
      counter: 0,
      loading: false
    }
  }
  toggleShowModal = () => {
    setTimeout(
      function() {
          this.setState({loading: false});
      }
      .bind(this),
      3000
    )
    this.props.toggleShowModal(this.props.player.name)
    this.setState({loading: true})
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
  componentDidMount(){
    this.setState({player: this.props.player.name, rating: this.props.player.rating, loading: this.props.showVideos})
  }
  render() {
    let btn
    this.state.loading ? 
    btn = <Button variant="primary" disabled>
            <Spinner
              as='span'
              animation='grow'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            <span>   Loading...</span>
          </Button> :
    btn = <Button variant="primary" onClick={this.toggleShowModal} >Watch Videos</Button>
    return (
      <div className="card-container">
        <Card border="secondary">
          <Card.Header as="h5">{this.props.player.name}</Card.Header>
          <Card.Body>
            <div className="card-content">
              <div className="rank">
                <p className='rank-number'>{this.props.idx + 1}</p>
              </div>
              <div className="pic-container">
                <img className="player_pic" src={this.props.player.picture_url} alt="player avatar"/>
                <div>
                  <Button onClick={this.plusClick} variant="primary" size="sm">
                    Up Vote
                  </Button>
                  <Button onClick={this.minusClick} variant="primary" size="sm">
                    Down Vote
                  </Button>
                </div>
              </div>
              <div className="info-box">
                <Card.Title>Career Stats:</Card.Title>
                <div>
                <table >
                  <thead>
                    <tr>
                      <th>PPG</th>
                      <th>AST</th>
                      <th>REB</th>
                      <th>PER</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.player.ppg}</td>
                      <td>{this.props.player.assists}</td>
                      <td>{this.props.player.rebounds}</td>
                      <td>{this.props.player.per}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                {btn}
              </div>
          </div>
          </Card.Body>
        </Card>
      </div>      
    );
  }
}

export default PlayerCard;