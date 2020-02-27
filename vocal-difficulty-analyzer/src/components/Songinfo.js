import React, { Component } from 'react';
import axios from "axios";
import { useConsumer } from '../context/context';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Songinfo extends Component {
    state = {
        loading: true
    }
    getDifficulty() {
        axios.get("/api/comment/", {
            params: {
                song: this.props.song.id
            }
        }).then(function(res){
            var rating=0
            for(var i in res.data){
                rating=rating+res.data[i].starsIdx+res.data[i].starsRating
            }
            this.props.setDifficulty((rating/res.data.length).toFixed(2))
            console.log("calculate difficulty")
            console.log(this.props.difficulty)
        }.bind(this)    
        ).then(
            this.setState({ loading: false })
        ).catch(e => console.log(e))
    }

    componentDidMount(){
        console.log("?")
        this.getDifficulty()
    }
    render() {
        const { song } = this.props
        console.log(song)
        console.log(this.state.loading)
        if (this.state.loading == false) {
            return (
                <div>
                    노래제목: {song.title}   가수: {song.singer}  난이도:{this.props.difficulty}
                </div>

            );
        }else{
            return(
                <div>
                    loading..
                </div>
            )
        }
    }
}

export default useConsumer(Songinfo);