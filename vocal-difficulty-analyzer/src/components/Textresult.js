import React, {Component } from 'react';
import Songinfo from './Songinfo';
import Textlist from './Textlist';
import { useConsumer } from '../context/context';
import Login from './Login';

class Textresult extends Component {
    state = {  }

    onModeComment=()=>{
        this.props.onMode('comment')
    }
    onModeSearch=()=>{
        this.props.onMode('search')
    }
    render() {
        const{songInfo}=this.props
        return ( 
        <div>
            <Songinfo song={songInfo[0]}></Songinfo>
            <div>총 {this.props.comment.length}명이 평가하였습니다.</div>
            
            <Textlist onMode = {this.props.onMode}></Textlist>
            
            <Login onModeComment={this.onModeComment}></Login>
            <button type="button" onClick={this.onModeSearch}> 뒤로 </button>
        </div>
         );
    }
}
 
export default useConsumer(Textresult);