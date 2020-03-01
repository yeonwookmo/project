import React, { Component } from 'react';
import Reset from '../images/reset.svg';
import '../css/Starrate.css';

class Starrate extends Component {
    constructor(props){
        super(props);
        this.state={
            update:this.props.update
        }
        this._resetRating = this._resetRating.bind(this);
    }
    componentDidUpdate(prevProps){
        if(this.props.update !==prevProps.update){
            this.setState({
                update:this.props.update
            })
        }
    }
    _modeSetting=()=>{
        const{update}=this.state
        if(update){
            return(<div className="reset__btn">
                    <img src={Reset} alt="reset" onClick={(e)=>{this._resetRating(e)}} />
                </div>)
        }
    }

    _resetRating(e){
        if(e.type === "mouseleave" || e.type === "onTouchEnd"){        
            this.props.onChange(this.props.starsIdx,this.props.starsRating);
        }else if(e.type === "click"){
            this.props.onChange(0,0);
        }    
    }

    _makeStars(){
        let stars = [];
        for(let i = 0; i < 10; i+=2){
            let starClass = "star__rate";
            
             if(this.props.rating !== 0){
                if (i <= this.props.idx) {               
                    if(this.props.idx === i && this.props.rating % 2 !== 0){
                        starClass += ' is-half-selected';
                    }else{
                        starClass += ' is-selected';
                    }
                }
            }else if(this.props.starsRating !== 0){
                if (i <= this.props.starsIdx) {            
                    if(this.props.starsIdx === i && this.props.starsRating % 2 !== 0){
                        starClass += ' is-half-selected';
                    }else{
                        starClass += ' is-selected';
                    }
                }
            }
            if(this.state.update){
            stars.push(
                <label key={i} 
                    className={starClass} 
                    onClick={()=>{this.props.onChange(this.props.idx,this.props.rating)}}
                    onMouseOver={(e)=>{this.props._mouseOver(e,i)}}
                    onMouseMove={(e)=>{this.props._mouseOver(e,i)}}
                    onMouseLeave={(e)=>{this._resetRating(e)}}                    
                    onTouchMove={(e)=>{this.props._mouseOver(e,i)}}
                    onTouchStart={(e)=>{this.props._mouseOver(e,i)}}
                    onTouchEnd={(e)=>{this._resetRating(e)}}
                >
                </label>
            )
            }else{
                stars.push(
                    <label key={i} className={starClass}></label>
                )
            }
        }
        return stars;
    }

    render() {
        return (
            <div className="starRate__wrap">
                {this._makeStars()}       
            </div>
        );
    }
}

export default Starrate;