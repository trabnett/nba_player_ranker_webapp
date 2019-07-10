import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './css/Modal.css';
import './css/App.css';

class InfoModal extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    close = () =>{
        this.props.close()
    }
    render(){
        if (!this.props.showInfo){
            return null
        }
        return(
            <div>
                <div className="modal-wrapper"
                    style={{
                        opacity: this.props.showInfo ? '1' : '0'
                    }}>
                    <div className="centerer">
                        <div className="modal-header">
                            <h3>About this app</h3>
                            <span className="close-modal-btn" onClick={this.close}>×</span>
                        </div>
                        <div className="modal-body">
                            <p>NBA Player Ranker is a full stack web app built using <b>Create React App</b> for the front end and <b>Flask</b> for the backend. The main goals of this app were to practice <b>responsive design</b>, <b>Flask fundamentals</b> and <b>React fundamentals</b>. </p>
                            <p>It allows users to enter the name of an NBA player, then uses <b>Microsoft Azure</b> to search the internet for relevant pictures, videos and info. It also scrapes a some statistics from Basketball Reference using <b>Beautiful Soup</b>. Data is stored persistantly in <b>Postgres</b>, although I reset the database every so often.</p>
                            <p>To Use: Enter an NBA player into the search field, choose a profile picture for the player, and then rank him against all of the other players. <b>Users</b> get two votes every five minutes based on their public IP address. Use the 'Watch Videos' buttons to familiarize yourself with everyone on the list.</p>
                            <p>Enjoy!</p>
                            <div className="info-cards"> 
                                <Card className="features">
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Card.Header>Front end</Card.Header>
                                            <ul>
                                                <li>React</li>
                                                <li>React Bootsrap</li>
                                                <li>Reactstrap</li>
                                                <li><a href="https://github.com/trabnett/nba_player_ranker_webapp">github repo</a></li>
                                            </ul>

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card className="features">
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Card.Header>Backend</Card.Header>
                                            <ul>
                                                <li>Python</li>
                                                <li>Flask</li>
                                                <li>Microsoft Azure</li>
                                                <li>BeautifulSoup</li>
                                                <li>Postgres</li>
                                                <li><a href="https://github.com/trabnett/nba-player-ranker-server">github repo</a></li>
                                            </ul>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>
                        </div>
                        <div style={{color: "white"}} className="modal-footer">
                            timrabnett@gmail.com<Button variant="primary" onClick={this.close}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoModal