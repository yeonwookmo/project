import React, { Component } from 'react';
import axios from "axios";
import "../css/Songinfo.css"
import { useConsumer } from '../context/context';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Songinfo extends Component {
    state = {
        loading: true,
        difficulty : 0
    }

    componentDidUpdate(prevProps){
        if(this.props.difficulty !== prevProps.difficulty){ 
            this.setState({
                difficulty:this.props.difficulty
            })
        }
    }

    setDifficulty = async () => {
        await axios.get("/api/comment/", {
            params: {
                song: this.props.song.id
            }
        }).then(function(res){
            var rating=0
            for(var i in res.data){
                rating=rating+res.data[i].starsIdx+res.data[i].starsRating
            }
            this.setState({difficulty : (rating/res.data.length).toFixed(2)})
            console.log("calculate difficulty")
        }.bind(this)    
        ).then(
            this.setState({loading : false})
        ).catch(e => console.log(e))
        return true
    }

    render() {
        const { song } = this.props
        if ((this.state.loading === false)) {
            return (
                <div className="container3" >
                    <div className='label1'>제목</div>
                    <div className='label2'>가수</div>
                    <div className="title"> {song.title}</div>
                    <div className="singer"> {song.singer}</div>
                    <div className="difficulty"> 난이도<h2 style={{"margin":"auto"}}>{this.state.difficulty}</h2></div>
                    <div className="ratenumber">{this.props.comment.length}명이 평가</div> 
                </div>
            );
        }else{
            this.setDifficulty()
            return(
                <div>
                    loading..
                </div>
            )
        }
    }
}

export default useConsumer(Songinfo);