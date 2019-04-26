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
      }, () =>  this.props.click(this.state.index));
    }

  
    render() {
        const { index, direction } = this.state;
        let picStyle = {
            "maxHeight": "25em"
        }
        return (
            <div className="select-pic-container">
                <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                keyboard={true}
                fade={true}
                wrap={true}
                slide={true}
                className="mw-100"
                >
                    {this.props.payload.map(function(item,idx){
                        return(
                            <Carousel.Item key={idx + 1} >
                                <div className="picture">
                                    <img
                                        style={picStyle}
                                        className="mw-100"
                                        src={item}
                                        alt={`slide ${idx}`}
                                    />
                                </div>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        );
    }
  }
  
  export default PicCarousel;