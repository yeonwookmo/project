import React, { Component } from 'react';
import Text from './Text';
import { useConsumer } from '../context/context';
class Textlist extends Component {
    state = { index: 0 }
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
                if ((index > array.length - this.state.index - 5)
                &&(index<array.length-this.state.index)) {
                    return (
                        <div key={index}>
                            <Text info={info} setComment={this.props.setComment}></Text>
                        </div>
                    )
                }
            }.bind(this)
            // 같은 song 내 comment 별 id가 필요할 수도 있음. 
        )

        return (
            <div>
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