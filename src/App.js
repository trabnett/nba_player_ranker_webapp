import React, { Component } from 'react';
import Header from './header'
import Footer from './footer'
import PlayerCard from './player_card'
import AddPlayer from './add_player'
import SelectPic from './select_pic'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      newPlayer: "",
      players: [],
      selectPic: false
    }
  }
  toggleSelectPic = (newPlayer) => {
    this.setState({newPlayer: newPlayer, selectPic: true}, () => {
      console.log("success!")
    })
  }
  componentDidMount(){
    fetch('http://127.0.0.1:5000/getall')
    .then(results => {
      return results.json()
    }).then(data => {
      this.setState({players: data})
    })
  }
  render() {
    if (this.state.selectPic){
      return(
        <SelectPic player={this.state.newPlayer}/>
      )
    }
    return (
      <div className="App">
        <Header/>
        <AddPlayer toggleSelectPic={this.toggleSelectPic}/>
          <div>
            {this.state.players.map(function(player, idx){
              return(
                <PlayerCard key={idx +1} player={player} />
              )
            })}
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
