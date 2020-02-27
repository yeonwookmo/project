import React, {Component } from 'react';

import Textlist from './Textlist';
import { useConsumer } from '../context/context';
import Login from './Login';

class Textresult extends Component {
    state = {difficultyUpdate : 0}

    onModeComment=()=>{
        this.props.onMode('comment')
    }
    onModeSearch=()=>{
        this.props.onMode('search')
    }
    setDifficultyUpdate=(data)=>{
        this.setState({difficultyUpdate : data})
    }
    render() {
        
        return ( 
        <div>
            
            <div>총 {this.props.comment.length}명이 평가하였습니다.</div>
            
            <Textlist onMode = {this.props.onMode}></Textlist>
            
            <Login onModeComment={this.onModeComment}></Login>
            <button type="button" onClick={this.onModeSearch}> 뒤로 </button>
        </div>
         );
    }
}
 
export default useConsumer(Textresult);