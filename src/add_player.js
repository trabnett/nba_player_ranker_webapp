import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

class AddPlayer extends Component {
    constructor(props){
        super(props);
        this.state={
          player: "",
          loading: false
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
      this.setState({loading: true})
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
    componentDidMount(){
      this.setState({loading: false})
    }
    render() {
      let formStyle = {
        margin: "auto"
      }
      let btn = ""
      this.state.loading ? btn = <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button> : btn = <Button variant="primary" onClick={this.handleSubmit}>Enter</Button>
     
      return (
        <div className="add-player">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Add A Player to the List</Form.Label>
              <Form.Control className="w-50" style={formStyle} type="email" placeholder="Add A Player to the List" value={this.state.player} onChange={this.handleChange} onKeyPress={this.keyDown}/>
            </Form.Group>
            {btn}
          </Form>
        </div>
      )
    }
  }
  
  export default AddPlayer;