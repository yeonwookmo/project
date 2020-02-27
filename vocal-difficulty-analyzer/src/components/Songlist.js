import React, { Component } from 'react';
import { useConsumer } from '../context/context';
import Songinfo from './Songinfo'
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Songlist extends Component {

    chooseSong=async(e)=>{
        const{setSongInfo,setComment,onMode}=this.props
        const data = this.props.songList.filter(
            item=>item.id===parseInt(e.target.id)
        )
        console.log(data)
        setSongInfo(data);
        await axios.get("/api/comment/",{
            params:{
                song:e.target.id
            }
        }).then(res=>{
            setComment(res.data)
        }).then(onMode())
    }
    render() { 

        const style={
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        const {songList}=this.props
        let list=songList.map(
            (info)=>(
            <div key={info.id} style={style}>
            <Songinfo song={info} calculate={false}></Songinfo>
            <button id ={info.id} onClick={this.chooseSong}>평가</button>
            </div>
            
        ));
        return ( 
            <div>{list}</div>

        );
    }
}
 
 
export default useConsumer(Songlist);