import React, { Component } from 'react';

class AddPlayer extends Component {
    constructor(props){
        super(props);
        this.state={
          player: ""
        }
      }
    handleChange = (e) => {
        this.setState({player: e.target.value})
    }
    keyDown = (e) => {
      if (e.which === 13){
        this.handleSubmit()
      }
    }
    handleSubmit = () => {
      if (this.state.player === ""){
        return null
      }
        fetch(`http://127.0.0.1:5000/add?name=${this.state.player}`)
        .then(results => {
            return results.json()
          }).then(data => {
            if (data.error) {
                return (this.setState({player: ""}, () => alert(data.error)))
            }
            this.setState({player: data.name}, () => {
                this.props.toggleSelectPic(this.state.player)
            })
          })
        
        
    }
    render() {
      return (
        <div className="add-player">
            <input className="new-player" type="text" value={this.state.player} onChange={this.handleChange} onKeyPress={this.keyDown} placeholder="Add A Player to the List"></input>
            <button className="add-player-button" onClick={this.handleSubmit}>Enter</button>
        </div>
      )
    }
  }
  
  export default AddPlayer;