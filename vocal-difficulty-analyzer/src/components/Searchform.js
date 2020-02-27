import React, { Component } from 'react';
import Criteria from './Criteria'
import Guide from './Guide';
import Songlist from './Songlist';
import axios from "axios";
import CreateForm from './CreateForm';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
class SearchForm extends Component {
    state = {
        songname: '',
        rawsongname: '',
        show: '',
        songList: [{}]
    }
    showContent = () => {
        const { show } = this.state;
        if (show === 'criteria') {
            return <Criteria></Criteria>
        } else if (show === 'guide') {
            return <Guide></Guide>
        } else if (show === 'list') {
            return (
                <div>
                    <Songlist onMode={this.modeUpdate} songList={this.state.songList}></Songlist>
                    <CreateForm onMode={this.backToSearch}></CreateForm>
                </div>
            )
        } else if (show === 'create') {
            return <CreateForm onMode={this.backToSearch}></CreateForm>
        }
        else {
            return <div></div>
        }

    }
    backToSearch = async (title) =>{
        await axios.get("/api/song/", {
            params: {
                title: title
            }
        }).then(res => this.setState({
            show : 'list',
            songList: res.data
        }))
    }
    modeUpdate = () => {
        this.props.onMode('result')
    }
    handleChange = (e) => {
        e.preventDefault();
        let rawtext = e.target.value
        let text = rawtext.toLowerCase().replace(/(\s*)/g, "");
        this.setState({
            rawsongname: rawtext,
            songname: text,
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        await axios.get("/api/song/", {
            params: {
                title: this.state.songname
            }
        }).then(res => this.setState({
            songList: res.data
        }))
        if (this.state.songList.length === 0) {
            this.setState({
                show: 'create'
            })
        } else {
            this.setState({
                show: 'list'
            })
        }
    }
    handleshowCri = () => {
        this.setState({
            show: 'criteria'
        })
    }
    handleshowGui = () => {
        this.setState({
            show: 'guide'
        })
    }
    handleshowSrch = () => {
        this.setState({
            show: 'list'
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name='rawsongname'
                        placeholder='노래 제목을 입력하세요'
                        onChange={this.handleChange}
                        value={this.state.rawsongname}
                    ></input>
                    <button type='submit'>search</button>
                </form>
                <button type="submit" onClick={this.handleshowGui}>도움말</button>
                <button type="submit" onClick={this.handleshowCri}>난이도</button>
                {this.showContent()}
            </div>
        );
    }
}

export default SearchForm;