import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PicCarousel from './pic_carousel'
import './App.css';

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
        this.props.closeSelectPic()
    }
    componentDidMount(){
        this.setState({picArray: this.props.picArray})
    }
    render() {
        return (
            <div className="pic-select">
                <h1>{this.state.player}</h1>
                <PicCarousel payload={this.props.picArray}/>
                <div>
                    <Button variant="primary" onClick={this.select}>Select Picture</Button>
                </div>
            </div>
        );
    }
  }
  
  export default SelectPic;