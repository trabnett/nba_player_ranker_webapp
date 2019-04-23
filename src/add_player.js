import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddPlayer extends Component {
    constructor(props){
        super(props);
        this.state={
          player: ""
        }
      }
    handleChange = (e) => {
        this.setState({player: e.target.value})
    }
    keyDown = (e) => {
      if (e.which === 13){
        this.handleSubmit()
      }
    }
    handleSubmit = () => {
      if (this.state.player === ""){
        return null
      }
        fetch(`http://127.0.0.1:5000/add?name=${this.state.player}`)
        .then(results => {
            return results.json()
          }).then(data => {
            if (data.error) {
                return (this.setState({player: ""}, () => alert(data.error)))
            }
            this.setState({player: data.name}, () => {
                this.props.openSelectPic(this.state.player)
            })
          })
        
        
    }
    render() {
      return (
        <div className="add-player">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Add A Player to the List</Form.Label>
              <Form.Control type="email" placeholder="Add A Player to the List" value={this.state.player} onChange={this.handleChange} onKeyPress={this.keyDown}/>
            </Form.Group>
            <Button variant="primary" onClick={this.handleSubmit}>Enter</Button>
          </Form>
        </div>
      )
    }
  }
  
  export default AddPlayer;