import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddPlayer extends Component {
    constructor(props){
        super(props);
        this.state={
          player: '',
          loading: false
        }
      }
    handleChange = (e) => {
        this.setState({player: e.target.value})
    }
    preventSubmit = (e) => {
      e.preventDefault();
      this.handleSubmit();
    }
    handleSubmit = () => {
      if (this.state.player === ''){
        return null
      }
      this.setState({loading: true})
      fetch(`http://127.0.0.1:5000/add?name=${this.state.player}`)
      .then(results => {
          return results.json()
      }).then(data => {
        if (data.error) {
            return (this.setState({player: '', loading: false}, () => alert(data.error)))
        }
        this.setState({player: data.name}, () => {
            this.props.openSelectPic(this.state.player)
            setTimeout(
              function() {
                  this.setState({loading: false, player: ''});
              }
              .bind(this),
              3000
            )
        })
      })
    }
    componentDidMount(){
      this.setState({loading: false})
    }
    render() {
      let formStyle = {
        margin: 'auto'
      }
      let btn = ''
      this.state.loading ? 
      btn = <Button variant="primary" disabled>
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span> Loading...</span>
            </Button> : 
      btn = <Button variant="primary" onClick={this.handleSubmit}>Enter</Button>
     
      return (
        <div className="add-player">
          <Form onSubmit={this.preventSubmit}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Add A Player to the List</Form.Label>
              <Form.Control className="w-50" style={formStyle} type="text" placeholder="Add A Player to the List" value={this.state.player} onChange={this.handleChange} />
            </Form.Group>
            {btn}
          </Form>
        </div>
      )
    }
  }
  
export default AddPlayer;