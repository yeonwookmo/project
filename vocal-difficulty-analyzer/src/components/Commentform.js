import React, { Component } from 'react';
import Starshow from './Starshow';
import { useConsumer } from '../context/context';
import Songinfo from './Songinfo';
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Commentform extends Component {
    state = {
        userId: this.props.userInfo.userId,
        userName: this.props.userInfo.name,
        userImage: this.props.userInfo.image,
        // userId와 UserName을 백에서 추가, user 프로필 사진도 받을 수 있는데 나중에 디자인할 때 고려해봐야할듯
        song: this.props.songInfo[0].title,
        text: '',
        starsIdx: '',
        starsRating: ''
    }
    handleMode = () => {
        this.props.onMode('result')
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

    handleSubmit = async (e) => {
        const { setComment, comment } = this.props
        e.preventDefault();
        await axios.post("/api/comment/", {
            song: this.props.songInfo[0].id,
            text: this.state.text,
            starsIdx: this.state.starsIdx,
            starsRating: this.state.starsRating,
            userId: this.state.userId,
            userName: this.state.userName,
            userImage: this.state.userImage
        }).then(res => {
            setComment(comment.concat({
                id: res.data.id,
                song: this.props.songInfo[0].id,
                text: this.state.text,
                starsIdx: this.state.starsIdx,
                starsRating: this.state.starsRating,
                userId: this.state.userId,
                userName: this.state.userName,
                userImage: this.state.userImage
            }))
            console.log(res.data)
        }
        )
        this.handleMode()
        //새로운 comment 작성 후 장고로 post하는 기능 만들기
    }


    render() {
        return (
            <div>
                <Songinfo song={this.props.songInfo[0]}></Songinfo>
                <div>총 {this.props.comment.length}명이 평가하였습니다.</div>

                <form onSubmit={this.handleSubmit}>
                    <img src={this.state.userImage} alt="사용자 이미지" ></img>
                    <input
                        name="text"
                        placeholder="이곳에 의견을 남겨주세요"
                        onChange={this.handleChange}
                        value={this.state.text}
                    ></input>
                    <button type="submit"
                    >댓글 입력</button>
                    <div>
                        당신이 평가한 난이도는?
                    <Starshow update={true} starUpdate={this.handleUpdateStar} ></Starshow>
                        {this.state.starsIdx + this.state.starsRating}/10
                    {/* 점수 입력할 떄 NaN이 나오는데 나중에 수정 예정 */}
                    </div>
                </form>
                <button type="button" onClick={this.handleMode}>뒤로</button>
            </div>
        );
    }
}

export default useConsumer(Commentform);