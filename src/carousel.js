import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import ReactPlayer from 'react-player';

class ControlledCarousel extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
    //   const playing = this.props.playing
  
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
            {this.props.payload.map(function(item,idx){
                return(
                    <Carousel.Item key={idx + 1}>
                       <ReactPlayer url={item} playing={false}/>
                    </Carousel.Item>
                )
            })}
        </Carousel>
      );
    }
  }
  
  export default ControlledCarousel;