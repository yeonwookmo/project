import React, { Component } from 'react';
import { useConsumer } from '../context/context';
import Starshow from './Starshow';
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Text extends Component {
    state = {
        update: false,
        text: '',
        starsIdx: this.props.info.starsIdx,
        starsRating: this.props.info.starsRating,
    }
    authorized = false
    handleUpdate = async () => {
        const { update, text, starsIdx, starsRating } = this.state;
        const { info, comment, setComment } = this.props;
        if (update) {
            setComment(
                comment.map(item => (info.id === item.id ?
                    {
                        id: this.props.info.id,
                        text: text,
                        starsIdx: starsIdx,
                        starsRating: starsRating,
                        userId: info.userId,
                        userName: info.userName,
                        userImage: info.userImage,
                        song: this.props.songInfo[0].id
                    } : item))
            )
            await axios.put(`/api/comment/${this.props.info.id}/`, {
                id: this.props.info.id,
                text: text,
                starsIdx: starsIdx,
                starsRating: starsRating,
                userId: info.userId,
                userName: info.userName,
                userImage: info.userImage,
                song: this.props.songInfo[0].id
            }).catch(e => console.log(e.message))
        } else {
            this.setState({ text: info.text })
        }
        this.setState({
            update: !update
        })
    }
    handleRemove = async () => {
        const { setComment, comment } = this.props
        await axios.delete(`/api/comment/${this.props.info.id}`)
        setComment(comment.filter(object => object.id !== this.props.info.id))
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleUpdateStar = (data) => {
        this.setState({
            starsIdx: data.starsIdx,
            starsRating: data.starsRating
        })
    }
    render() {
        const { update } = this.state
        if (this.props.info.userId === this.props.userInfo.userId) {
            this.authorized = true
        }
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }
        return (
            <div style={style}>
                {
                    update ?
                        <div>
                            <input
                                name="text"
                                onChange={this.handleChange}
                                value={this.state.text}
                            ></input>
                        </div>
                        :
                        <div>
                            {this.props.info.text}
                        </div>
                }
                <Starshow
                    starsIdx={this.state.starsIdx}
                    starsRating={this.state.starsRating}
                    update={this.state.update}
                    starUpdate={this.handleUpdateStar}
                ></Starshow> {this.state.starsIdx + this.state.starsRating}/10
            {
                    this.authorized ?
                        <div>
                            <button
                                type="submit"
                                onClick={this.handleUpdate}
                            >{update ? "입력" : "수정"}</button>

                            <button
                                type="submit"
                                onClick={this.handleRemove}
                            >삭제</button>
                        </div>
                        :
                        <div></div>
                }
            </div>
        );
    }
}

export default useConsumer(Text);