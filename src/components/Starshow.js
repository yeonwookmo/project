import React, { Component } from 'react';
import Starrate from './Starrate';

class Starshow extends Component {
  static defaultProp={
    starsIdx:0,
    starsRating:0,
  }
  state = {
    idx:0,
    rating: 0,    
    starsIdx: this.props.starsIdx,
    starsRating: this.props.starsRating,
  }

  _mouseOver = (e,i) => {
    e.persist()
    let offsetX = e.nativeEvent.offsetX; 
    let clientX = e.target.clientWidth;

    if(offsetX > clientX / 2){
      let value = 2;
      this.setState({
        idx:i,
        rating:value
      });
    }else{
      let value = 1;
      this.setState({
        idx:i,
        rating:value
      });
    }
  }

  handleChange = (i,v) => {
    this.setState({
      idx:0,
      rating:0,
      starsIdx:i,
      starsRating:v
    });
    this.props.starUpdate(this.state)
  }

  render() {
    return (
      <Starrate 
        _mouseOver={this._mouseOver}
        onChange={this.handleChange} 
        idx={this.state.idx} 
        rating={this.state.rating}         
        starsIdx={this.state.starsIdx}         
        starsRating={this.state.starsRating}
        update={this.props.update}
      />
    );
  }
}

export default Starshow;