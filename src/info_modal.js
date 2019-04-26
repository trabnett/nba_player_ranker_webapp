import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Modal.css';
import './App.css';

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
                        transform: this.props.showInfo ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.props.showInfo ? '1' : '0',
                        top: "35%"
                    }}>
                    <div className="centerer">
                        <div className="modal-header">
                            <h3>About this app</h3>
                            <span className="close-modal-btn" onClick={this.close}>×</span>
                        </div>
                        <div className="modal-body">
                            <p>NBA Player Ranker is a full stack web app built by Tim Rabnett using Create React App for the front end and Flask for the backend. It allows users to enter the name of an NBA player, then uses Microsoft Azure to search the internet for relevant pictures, videos and info. It also scrapes a some statistics from Basketball Reference using Beautiful Soup. Data is stored persistantly in Postgres, although I reset the database every so often.</p>
                            <p>To Use: Enter an NBA player into the search mechanism, choose a profile picture for the player, and then rank him against all of the other players. Use the 'Watch Videos' buttons to familiarize yourself with everyone on the list.</p>
                            <p>Enjoy!</p>
                            <div className="info-cards"> 
                                <Card style={{ width: '18rem', margin: 'auto' }}>
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
                                <Card style={{ width: '18rem', margin: 'auto' }}>
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