import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PicCarousel from './pic_carousel'
import './App.css';
import './Modal.css'

class PicModal extends Component {
    constructor(props){
        super(props);
        this.state={
            count: 0
        }
    }
    select = () => {
        let url = this.props.pics[this.state.count]
        fetch(`https://nba-player-ranker.herokuapp.com/avatar?name=${this.props.player}&picture_url=${url}`, {
            method: 'POST',
            headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded',
                })
        })
        .then(results => {
            this.props.close()
        })
    }
    click = (e) => {
        this.setState({count: e})
    }

    render(){
        if (!this.props.selectPic){
            return null
        }
        var buttonStyle = {
            margin: "1em"
        };
        return(
            <div>
                <div className="modal-wrapper"
                    style={{
                        transform: this.props.selectPic ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.props.selectPic ? '1' : '0'
                    }}>
                    <div className="centerer">
                        <div className="modal-header">
                            <h3>Please Select a Profile Picture for {this.props.player}</h3>
                            <span className="close-modal-btn" onClick={this.close}>×</span>
                        </div>
                        <div className="modal-body">
                            <PicCarousel click={this.click} payload={this.props.pics}/>
                        </div>
                        <div className="modal-footer">
                        <Button style={buttonStyle} variant="primary" onClick={this.select}>Select Picture</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PicModal