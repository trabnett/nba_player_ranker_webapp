import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

class Lockout extends Component {
    constructor(props){
        super(props);
        this.state={
            count: 0
        }
    }
    render(){
        const Completionist = () => {
            this.props.closeLockout()
            return null
        };
        const renderer = ({ minutes, seconds, completed }) => {
            if (seconds < 10){
                seconds = '0' + seconds
            }
            if (completed) {
              // Render a completed state
              return <Completionist />;
            } else {
              // Render a countdown
              return <span>{minutes}:{seconds}</span>;
            }
          };
        if (this.props.lockout){
            return(
                <div className="lockout">
                    Each User is only allowed 2 votes every 5 minutes. You can vote agian in: 
                    <div><Countdown date={Date.now() + ((300 - this.props.lockoutTime) * 1000)} renderer={renderer} zeroPadTime={2}/></div>
                </div>
            ) 
        } else {
            return null
        }

    }
}
export default Lockout;

