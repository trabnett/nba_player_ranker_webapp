import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import PlayerCard from './player_card';
import AddPlayer from './add_player';
import PicModal from './pic_modal';
import InfoModal from './info_modal';
import Modal from './modal';
import Lockout from './lockout'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      newPlayer: "",
      ipAddress: "",
      players: [],
      pics: [],
      videos: [],
      lockoutTime: 0,
      lockout: false,
      selectPic: false,
      showVideos: false,
      videoSpinner: false,
      showInfo: false,
      playing: false,
      counter: 0
    }
  }
  openInfoModal = () => {
    this.getLockout()
    this.setState({showInfo: true})
  }
  closeInfoModal = () => {
    this.getLockout()
    this.setState({showInfo: false})
  }

  openModal = (player) => {
    this.getLockout()
    if (this.state.showVideos){
      return null
    }
    this.setState({showVideos: true})
    fetch(`https://player-ranker-server.herokuapp.com/videos?name=${player}`)
    .then(results => {
        return results.json()
      }).then(data => {
        let videos = JSON.parse(data)
        this.setState({videos: videos.videos,newPlayer: player, playing: true}, () => {
        })
      }).catch(function() {
        console.log("error");
      })
  }
  closeModal = () => {
    this.getLockout()
    this.setState({showVideos: false, playing: false, newPlayer: '', videos: []})
  }

  getPlayers = () => {
    fetch('https://player-ranker-server.herokuapp.com/getall')
    .then(results => {
      return results.json()
    }).then(data => {
      data.sort(function(a,b){return b.rating - a.rating})
      this.setState({players: data, showVideos: false})
    }).catch(function() {
      console.log("error");
    })
  }
  sortByRating = (arr) => {
    let newArr = arr.sort(function(a,b){return a.rating-b.rating})
    this.setState({players: newArr})
  }
  getLockout = () => {
    fetch(`https://player-ranker-server.herokuapp.com/get_my_ip?ip=${this.state.ipAddress}&bypass=true`)
    .then(results => {return results.json()
    })
    .then(data => {
      this.setState({lockoutTime: data.timestamp, lockout: true}, () => console.log(this.state, "after get lockout"))
    })
    .catch(function() {
      console.log("error");
    })
  } 
  ratingChange = (name, rating) => {
    fetch(`https://player-ranker-server.herokuapp.com/get_my_ip?ip=${this.state.ipAddress}`)
    .then(results => {return results.json()
    })
    .then(data => {
      if (data.lockout){
          return this.setState({lockout: true, lockoutTime: data.lockout})
      } else {
        this.state.players.forEach((player, idx) => {
          if (player.name === name){
            let newArray = [...this.state.players]
            newArray[idx].rating = rating
            newArray.sort(function(a,b){return b.rating - a.rating})
            this.setState({players: newArray}, () => {
              fetch(`https://player-ranker-server.herokuapp.com/rating?name=${name}&rating=${rating}`, {
                method: 'POST',
                headers: new Headers({
                           'Content-Type': 'application/x-www-form-urlencoded',
                  })
              }).catch(function() {
                console.log("error");
              })
            })
          }
          this.setState({lockout: false})
        })
      }
    })
    .catch(function() {
      console.log("error");
    })
  }
  openSelectPic = (newPlayer) => {
    this.getLockout()
    this.setState({newPlayer}, () => {
      fetch(`https://player-ranker-server.herokuapp.com/pictures?name=${this.state.newPlayer}`)
            .then(results => {
                return results.json()
              }).then(data => {
                if (data.error){
                  return alert(data.error)
                }
                let picArray = JSON.parse(data)
                this.setState({pics: picArray.pics}, () => this.setState({selectPic: true}))
              }).catch(function() {
                console.log("error");
              })

    })
  }
  closeSelectPic = () => {
    this.getLockout()
    this.getPlayers()
    this.setState({selectPic: false})
  }
  closeLockout = () => {
    this.setState({lockout: false})
  }
  componentDidMount(){
    this.getPlayers()
    fetch('https://api6.ipify.org?format=json')
    .then(results=> {
      return results.json()
    }).then(data => this.setState({ipAddress: data.ip}))
    .catch(function() {
      console.log("error");
    })
  }
  render() {
    let ratingChange = (name, rating) => {this.ratingChange(name, rating)}
    let toggleShowModal = (player) => {this.openModal(player)}
    let showVideos = this.state.showVideos
    return (
      <div className="App">
        <Header openInfoModal={this.openInfoModal} closeInfoModal={this.closeInfoModal} showInfo={this.state.showInfo}/>
        <Lockout lockoutTime={this.state.lockoutTime} lockout={this.state.lockout} closeLockout={this.closeLockout}/>
        { this.state.toggleShowModal ? <div onClick={this.toggleShowModal} className="back-drop"></div> : null }
        <div className="player-list">
          <InfoModal
            className="modal"
            showInfo={this.state.showInfo}
            close={this.closeInfoModal}
          />
          <Modal
            className="modal"
            showVideos={this.state.showVideos} 
            player={this.state.newPlayer} 
            videos={this.state.videos}
            close={this.closeModal}
            playing={this.state.playing}
            videoSpinner={this.state.videoSpinner}
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
