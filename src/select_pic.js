import React, { Component } from 'react';

class SelectPic extends Component {
    constructor(props){
        super(props);
        this.state={
          player: "",
          picArray: [],
          count: 0
        }
    }
    
    plusClick = () => {
        this.setState({count: this.state.count + 1})
    }
    minusClick = () => {
        this.setState({count: this.state.count - 1})
    }
    select = () => {
        let url = this.state.picArray[this.state.count]
        fetch(`http://127.0.0.1:5000/avatar?name=${this.state.player}&picture_url=${url}`, {
            method: 'POST',
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded',
              })
        })
        this.props.toggleSelectPic("")
    }
    componentWillMount(){
        this.setState({player: this.props.player}, () => {
            fetch(`http://127.0.0.1:5000/pictures?name=${this.state.player}`)
            .then(results => {
                return results.json()
              }).then(data => {
                let picArray = JSON.parse(data)
                this.setState({picArray: picArray.pics}, () => {
                    console.log(this.state, "+++++++++++++")
                })
              })
        })
    }
    render() {
        let currentPic = this.state.picArray[this.state.count]
        return (
            <div>
                <h1>{this.state.player}</h1>
                <button onClick={this.plusClick}>+</button><img className="player_pic" src={currentPic} alt="player avatar"></img><button onClick={this.minusClick}>-</button>
                <div>
                    <button onClick={this.select}>select picture</button>
                </div>
            </div>
        );
    }
  }
  
  export default SelectPic;