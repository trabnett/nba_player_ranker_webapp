import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Modal.css'

class Modal2 extends Component {
  constructor(props){
    super(props);
    this.state={
        count: 0
    }
  }
  close = () =>{
      this.setState({count: 0})
      this.props.close()
  }
  changeVideo = (n) => {
      console.log(this.props.videos.length, "number of vids")
        if (this.state.count === 0 && n < 0){
            return null
        }
        if (this.state.count === this.props.videos.length - 1 && n > 0){
            return null
        }
        this.setState({count: this.state.count + n}, () => console.log(this.state))
  }
  render(){
      if (!this.props.showVideos){
          return null
      }
      return(
        <div style={{
            height: '25em'
        }}>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.showVideos ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.showVideos ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>{this.props.player}</h3>
                    <span className="close-modal-btn" onClick={this.close}>×</span>
                </div>
                <div className="modal-body">
                    <ReactPlayer url={this.props.videos[this.state.count]} playing={this.props.playing ? true : false}/>
                </div>
                <div>
                    <button onClick={() => this.changeVideo(1)}>+</button><button onClick={() => this.changeVideo(-1)}>-</button>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={this.close}>CLOSE</button>
                </div>
            </div>
        </div>
      )
  }
}

export default Modal2