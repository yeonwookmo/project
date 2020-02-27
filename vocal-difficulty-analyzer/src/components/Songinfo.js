import React, { Component } from 'react';
import axios from "axios";
import { useConsumer } from '../context/context';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Songinfo extends Component {
    state = {
        loading: true
    }

    componentDidMount(){
        if(this.props.setDifficulty()){
            this.setState({loading : false})
        }
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