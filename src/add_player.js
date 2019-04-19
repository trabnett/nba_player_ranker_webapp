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
    handleSubmit = () => {
        console.log(this.state.player)

        fetch(`http://127.0.0.1:5000/add?name=${this.state.player}`)
        .then(results => {
            console.log(this.state.player, "<==========")
            return results.json()
          }).then(data => {
            this.props.toggleSelectPic(this.state.player)
            // this.setState({player: data.name}, () => {
            //     console.log(data)
            //     this.props.toggleSelectPic(this.state.player)
            //     this.setState({player: ""})
            // })
          })
        
        
    }
    render() {
      return (
        <div>
            <input type="text" value={this.state.player} onChange={this.handleChange}></input>
            <button onClick={this.handleSubmit}>enter</button>
        </div>
      )
    }
  }
  
  export default AddPlayer;