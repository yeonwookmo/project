import React, { Component, createContext } from 'react';
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Context = createContext();
const { Provider, Consumer: InfoConsumer } = Context;

class InfoProvider extends Component {
    state = {
        userInfo: {
            userId: '',
            name: '',
            image: '',

        },
        songInfo: [],
        comment: [{
            userId: 'Nan',
            text: '',
            starsIdx: 6,
            starsRating: 2
        }],
        difficulty:0
    }
    actions = {
        setUserInfo: (data) => {
            this.setState({
                userInfo: data
            })
        },
        // setSongInfo의 concat 부분은 백으로만 구동시 수정=>songInfo:data
        setSongInfo: (data) => {
            this.setState({
                songInfo: [data[0]]
            })
        },
        setComment: (data) => {
            this.setState({
                comment: [].concat(data)
            },
            )
        },
        setDifficulty : async () => {
            await axios.get("/api/comment/", {
                params: {
                    song: this.state.songInfo[0].id
                }
            }).then(function(res){
                var rating=0
                for(var i in res.data){
                    rating=rating+res.data[i].starsIdx+res.data[i].starsRating
                }
                this.setState({difficulty : (rating/res.data.length).toFixed(2)})
                console.log("calculate difficulty")
            }.bind(this)    
            ).catch(e => console.log(e))
            return true
        }
        //setDifficulty: (data) => {
        //   this.setState({
        //        difficulty : data
        //    })
       // }
    }
    render() {
        const { state, actions } = this;
        const value = { state, actions };
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}
function useConsumer(WrappedComponent) {
    return function useConsumer(props) {
        return (
            <InfoConsumer>
                {
                    ({ state, actions }) => (
                        <WrappedComponent
                            {...props}
                            userInfo={state.userInfo}
                            songInfo={state.songInfo}
                            comment={state.comment}
                            difficulty={state.difficulty}
                            setId={actions.setId}
                            setSongInfo={actions.setSongInfo}
                            setComment={actions.setComment}
                            setUserInfo={actions.setUserInfo}
                            setDifficulty={actions.setDifficulty}
                        />
                        //{..props}는 parents props, 나머지는 context props를 의미
                    )
                }
            </InfoConsumer>
        )
    }
}

export {
    InfoConsumer,
    InfoProvider,
    useConsumer
}