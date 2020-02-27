import React, { Component } from 'react';
import Songinfo from './Songinfo';
import Text from './Text';
import { useConsumer } from '../context/context';
class Textlist extends Component {
    state = { index: 0 }
    difficulty = 0
    moreReview = () => {
        this.setState({ index: this.state.index + 5 })
    }
    pastReview = () => {
        this.setState({ index: this.state.index-5})
    }
    render() {
        const { comment } = this.props
        const list = comment.map(
            function (info, index, array) {
                this.difficulty = info.starsIdx + info.starsRating
                if ((index > array.length - this.state.index - 5)
                &&(index<array.length-this.state.index)) {
                    return (
                        <div key={index}>
                            <Text info={info} onMode={this.props.onMode} setCommentUpdate = {this.props.setCommentUpdate}></Text>
                        </div>
                    )
                }
            }.bind(this)
            // 같은 song 내 comment 별 id가 필요할 수도 있음. 
        )
        const{songInfo}=this.props
        this.difficulty = this.difficulty/comment.length
        return (
            <div>
                <div>{this.difficulty}</div>
                <Songinfo song={songInfo[0]}></Songinfo>
                <div>{list}</div>
                <button type="submit" onClick={this.moreReview}
                >more review</button>
                <button type="submit" onClick={this.pastReview}
                >past review</button>
            </div>
        );
    }
}

export default useConsumer(Textlist);