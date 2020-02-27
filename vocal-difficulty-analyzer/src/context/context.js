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
                            setId={actions.setId}
                            setSongInfo={actions.setSongInfo}
                            setComment={actions.setComment}
                            setUserInfo={actions.setUserInfo}
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