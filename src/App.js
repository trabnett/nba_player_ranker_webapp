import React, { Component } from 'react';
import Header from './header'
import Footer from './footer'
import PlayerCard from './player_card'
import AddPlayer from './add_player'
import PicModal from './pic_modal'
import Modal from './modal'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      newPlayer: "",
      players: [],
      pics: [],
      videos: [],
      selectPic: false,
      showVideos: false,
      playing: false,
      counter: 0
    }
  }
  closeModal = () => {this.setState({showVideos: false, playing: false})}

  sortByRating = (arr) => {
    let newArr = arr.sort(function(a,b){return a.rating-b.rating})
    this.setState({players: newArr})
  }
  ratingChange = (name, rating) => {
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
  openSelectPic = (newPlayer) => {
    this.setState({newPlayer}, () => {
      fetch(`http://127.0.0.1:5000/pictures?name=${this.state.newPlayer}`)
            .then(results => {
                return results.json()
              }).then(data => {
                let picArray = JSON.parse(data)
                this.setState({pics: picArray.pics}, () => this.setState({selectPic: true}))
              })

    })
  }
  closeSelectPic = () => {
    this.getPlayers()
    this.setState({selectPic: false})
  }
  openModal = (player) => {
    if (this.state.showVideos){
      return null
    }
    fetch(`http://127.0.0.1:5000/videos?name=${player}`)
    .then(results => {
        return results.json()
      }).then(data => {
        let videos = JSON.parse(data)
        this.setState({videos: videos.videos,newPlayer: player, showVideos: true, playing: true}, () => {
        })
      })
  }
  getPlayers = () => {
    fetch('http://127.0.0.1:5000/getall')
    .then(results => {
      return results.json()
    }).then(data => {
      data.sort(function(a,b){return b.rating - a.rating})
      this.setState({players: data, showVideos: false})
    })
  }
  componentDidMount(){
    this.getPlayers()
  }
  render() {
    // if (this.state.selectPic){
    //   return(
    //     <SelectPic player={this.state.newPlayer} openSelectPic={this.openSelectPic} closeSelectPic={this.closeSelectPic} picArray={this.state.pics}/>
    //   )
    // }
    let ratingChange = (name, rating) => {this.ratingChange(name, rating)}
    let toggleShowModal = (player) => {this.openModal(player)}
    let showVideos = this.state.showVideos
    return (
      <div className="App">
        <Header/>
        { this.state.toggleShowModal ? <div onClick={this.toggleShowModal} className="back-drop"></div> : null }
        <div className="player-list">
          <Modal
            className="modal"
            showVideos={this.state.showVideos} 
            player={this.state.newPlayer} 
            videos={this.state.videos}
            close={this.closeModal}
            playing={this.state.playing}
            />
            <PicModal 
              className="modal"
              selectPic={this.state.selectPic} 
              player={this.state.newPlayer} 
              pics={this.state.pics}
              close={this.closeSelectPic}
              playing={this.state.playing}/>
          <AddPlayer openSelectPic={this.openSelectPic} sortByRating={this.sortByRating}/>
            <div>
              {this.state.players.map(function(player, idx){
                return(
                  <PlayerCard key={idx +1} idx={idx} player={player} showVideos={showVideos} ratingChange={ratingChange} toggleShowModal={toggleShowModal}/>
                )
              })}
            </div>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
