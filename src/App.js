import React, { Component } from 'react';
import Header from './header'
import Footer from './footer'
import PlayerCard from './player_card'
import AddPlayer from './add_player'
import SelectPic from './select_pic'
import Modal from './modal'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      newPlayer: "",
      players: [],
      videos: [],
      selectPic: false,
      showVideos: false,
      counter: 0
    }
  }
  sortByRating = (arr) => {
    let newArr = arr.sort(function(a,b){return a.rating-b.rating})
    this.setState({players: newArr})
  }
  ratingChange = (name, rating) => {
    console.log(name, rating)
    this.state.players.forEach((player, idx) => {
      if (player.name === name){
        let newArray = [...this.state.players]
        newArray[idx].rating = rating
        newArray.sort(function(a,b){return b.rating - a.rating})
        this.setState({players: newArray}, () => {
          // this.sortByRating(this.state.players)
          fetch(`http://127.0.0.1:5000/rating?name=${name}&rating=${rating}`, {
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded',
              })
          })
        })
      }
      this.setState({counter: this.state.counter + 1})
    })

  }
  toggleSelectPic = (newPlayer) => {
    this.setState({newPlayer: newPlayer, selectPic: !this.state.selectPic}, () => {
      fetch('http://127.0.0.1:5000/getall')
      .then(results => {
        return results.json()
      }).then(data => {
        this.setState({players: data})
      })
    })
  }
  toggleShowModal = (player) => {
    fetch(`http://127.0.0.1:5000/videos?name=${player}`)
    .then(results => {
        return results.json()
      }).then(data => {
          console.log(data, "data")
        let videos = JSON.parse(data)
        this.setState({videos: videos.videos,newPlayer: player, showVideos: !this.state.showVideos}, () => {
            console.log(this.state, "+++++++++++++")
        })
      })
  }
  getPlayers = () => {
    fetch('http://127.0.0.1:5000/getall')
    .then(results => {
      return results.json()
    }).then(data => {
      console.log(data, "asdfasdfasdf")
      data.sort(function(a,b){return b.rating - a.rating})
      this.setState({players: data})
    })
  }
  componentDidMount(){
    this.getPlayers()
  }
  render() {
    if (this.state.selectPic){
      return(
        <SelectPic player={this.state.newPlayer} toggleSelectPic={this.toggleSelectPic}/>
      )
    }
    let ratingChange = (name, rating) => {this.ratingChange(name, rating)}
    let toggleShowModal = (player) => {this.toggleShowModal(player)}
    return (
      <div className="App">
      { this.state.toggleShowModal ? <div onClick={this.toggleShowModal} className="back-drop"></div> : null }
      <Modal
          className="modal"
          player={this.state.newPlayer}
          videos={this.state.videos}
          show={this.state.showVideos}
          close={this.toggleShowModal}>
      </Modal>
        <Header/>
        <AddPlayer toggleSelectPic={this.toggleSelectPic}/>
          <div>
            {this.state.players.map(function(player, idx){
              return(
                <PlayerCard key={idx +1} player={player} ratingChange={ratingChange} toggleShowModal={toggleShowModal}/>
              )
            })}
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
