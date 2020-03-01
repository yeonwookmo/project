import React, { Component } from 'react';
import { useConsumer, InfoConsumer } from '../context/context';
import Songinfo from './Songinfo'
import '../css/Songlist.css';
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


        const {songList}=this.props
        let list=songList.map(
            (info)=>(
            <div key={info.id} className="songList">
             <div className="container2" >
                    <div className='label1'>제목</div>
                    <div className='label2'>가수</div>
                    <div className="title"> {info.title}</div>
                    <div className="singer"> {info.singer}</div>
            <button id ={info.id} className="goldenrod" onClick={this.chooseSong}>선택</button>
            </div>
            </div>
            
        ));
        return ( 
            <div>{list}</div>

        );
    }
}
 
 
export default useConsumer(Songlist);