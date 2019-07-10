import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button'

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
          interval={null}
        >
            {this.props.payload.map(function(item,idx){
                return(
                    <Carousel.Item className="react-player-wrapper" key={idx + 1}>
                      <div className='player-wrapper'>
                        <ReactPlayer className='react-player' url={item} playing={false} width='100%' height='100%'/>
                      </div>
                    </Carousel.Item>
                )
            })}
        </Carousel>
      );
    }
  }
  
  export default ControlledCarousel;