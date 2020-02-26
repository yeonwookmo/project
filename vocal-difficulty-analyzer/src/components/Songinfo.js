import React, { Component } from 'react';
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Songinfo extends Component {
    state = {
        loading: true,
        difficulty: 0
    }
    getDifficulty() {
        axios.get("/api/comment/", {
            params: {
                song: this.props.songInfo.id
            }
        }).then(function(res){
            var rating=0
            for(var i in res.data){
                rating=rating+res.data[i].starsIdx+res.data[i].starsRating
            }
            this.setState({difficulty : (rating/res.data.length).toFixed(2)})
        }.bind(this)    
        ).then(
            this.setState({ loading: false })
        ).catch(e => console.log(e))
    }

    render() {
        const { songInfo } = this.props
        console.log(songInfo)
        if (this.state.loading == false) {
            return (
                <div>
                    노래제목: {songInfo.title}   가수: {songInfo.singer}  난이도:{this.state.difficulty}
                </div>

            );
        }else{
            this.getDifficulty()
            return(
                <div>
                    loading..
                </div>
            )
        }
    }
}

export default Songinfo