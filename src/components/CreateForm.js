import React, { Component } from 'react';
import axios from "axios";
import "../css/CreateForm.css";
import '../css/button.css'
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
class CreateForm extends Component {
    state = {
        mode: 'default',
        title: '',
        singer: ''
    }
    handleMode = () => {
        this.props.onMode('search')
    }
    createSong = () => {
        this.setState({
            mode: 'create'
        })
    }
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("/api/song/", {
            title: this.state.title,
            singer: this.state.singer
        })
        this.props.onMode(this.state.title)

    }

    render() {
        if (this.state.mode === 'default') {
            return (
                <div className="default">
                    <div style={{"margin-top":"4vh"}}
                    ><h4>찾으시는 노래가 없나요? </h4></div>
                    <div style={{"margin-top":"1vh"}}><h4> 다른 사용자를 위해 노래 정보를 입력해주세요.</h4></div>
                    <button id={"submitsong"}className={"blue"} onClick={this.createSong}
                    >노래정보 입력</button>
                    <button id={"backsonglist"} className={"blue"} type="button" onClick={this.props.handleshowSrch}>뒤로</button>
                </div>
            );
        }
        if (this.state.mode === 'create') {
            return (
                <div className="create">
                    <form onSubmit={this.handleSubmit}>
                        <div className="title">
                        <input
                            name="title"
                            type="text"
                            placeholder="제목"
                            onChange={this.handleChange}
                            value={this.state.title}
                        ></input>
                        </div>
                        <div className="singer">
                        <input
                            name="singer"
                            type="text"
                            placeholder="가수"
                            onChange={this.handleChange}
                            value={this.state.singer}
                        ></input>
                        </div>
                        <button className={"blue"} type="submit"
                        >노래 추가</button>
                    </form>
                </div>
            )
        }
    }
}

export default CreateForm;