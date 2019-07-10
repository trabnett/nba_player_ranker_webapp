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
  render(){
    if (!this.props.showVideos){
        return null
    }
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

    return(
        <div>
            <div className="modal-wrapper-vid"
                style={{
                    opacity: this.props.showVideos ? '1' : '0'
                }}>
                <div className="centerer">
                    <div className="modal-header">
                        <h3>{name}</h3>
                        <span className="close-modal-btn" onClick={this.close}>×</span>
                    </div>
                    <div className="modal-body">
                        {content}
                        <ControlledCarousel style={videoHide} payload={this.props.videos} playing={this.props.playing}/>
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