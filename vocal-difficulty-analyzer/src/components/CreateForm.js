import React, { Component } from 'react';
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
class CreateForm extends Component {
    state = {
        mode: 'default',
        title: '',
        singer: ''
    }
    handleMode = () => {
        this.props.onMode('result')
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
                <div>
                    <div>찾으시는 노래가 없나요?</div>
                    <button onClick={this.createSong}
                    >다른 사용자를 위해 노래 정보를 입력해주세요</button>
                    <button type="button" onClick={this.handleMode}>뒤로</button>
                </div>
            );
        }
        if (this.state.mode === 'create') {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="title"
                            type="text"
                            placeholder="제목"
                            onChange={this.handleChange}
                            value={this.state.title}
                        ></input>
                        <input
                            name="singer"
                            type="text"
                            placeholder="가수"
                            onChange={this.handleChange}
                            value={this.state.singer}
                        ></input>
                        <button type="submit"
                        >노래 정보 제출</button>
                    </form>
                </div>
            )
        }
    }
}

export default CreateForm;