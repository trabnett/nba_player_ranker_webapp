import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ControlledCarousel from './carousel'
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
                    <ControlledCarousel payload={this.props.videos} playing={this.props.playing}/>
                </div>
                <div className="modal-footer">
                    <Button variant="primary" onClick={this.close}>Close</Button>
                </div>
            </div>
        </div>
      )
  }
}

export default Modal2