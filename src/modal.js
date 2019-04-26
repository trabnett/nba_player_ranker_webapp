import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import ControlledCarousel from './carousel'
import './Modal.css'

class Modal extends Component {
  constructor(props){
    super(props);
    this.state={
        count: 0,
        counter: 0,
        videoSpinner: true
    }
  }
  close = () =>{
      this.setState({videoSpinner: true})
      this.props.close()
  }
  componentWillMount(){
      this.setState({videoSpinner: true})
  }
//   componentWillUnmount() {
//     this.setState({videoSpinner: true}, () => clearInterval(this.interval))
//   }
  render(){
    if (!this.props.showVideos){
        return null
    }
    //   this.interval = setInterval(() => this.setState({videoSpinner: false}, () => console.log(this.state, "hey")), 3000)
    let content
    let videoHide = {}
    let name = this.props.player
    if (this.state.videoSpinner) {
        setTimeout(
            function() {
                this.setState({videoSpinner: false});
            }
            .bind(this),
            5000
          )
        content = <div className="spinner-container"><Spinner size="lg"/> </div>
        name = "Loading..."
        videoHide = {
            "display": "none",
            "position": "absolute",
            "z-index": "-1"
        }
    } else {
        content = null
    }
    console.log(this.state, "modal state at render")
    return(
        <div style={{
            height: '25em'
        }}>
            <div className="buffer">
                <p>hidden buffer</p>
            </div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.showVideos ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.showVideos ? '1' : '0'
                }}>
                <div className="centerer">
                    <div className="modal-header">
                        <h3>{name}</h3>
                        <span className="close-modal-btn" onClick={this.close}>×</span>
                    </div>
                    <div className="modal-body">
                        {content}
                        <ControlledCarousel style={videoHide}payload={this.props.videos} playing={this.props.playing}/>
                    </div>
                    <div className="modal-footer">
                        <Button variant="primary" onClick={this.close}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Modal