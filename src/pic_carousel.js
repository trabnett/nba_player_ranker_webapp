import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class PicCarousel extends Component {
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
  
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
            {this.props.payload.map(function(item,idx){
                return(
                    <Carousel.Item key={idx + 1}>
                        <img
                            className="d-block w-100"
                            src={item}
                            alt={`slide ${idx}`}
                        />
                    </Carousel.Item>
                )
            })}
        </Carousel>
      );
    }
  }
  
  export default PicCarousel;