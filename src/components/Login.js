import React from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { useConsumer } from "../context/context";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name:'',
      image:'',
      }
  }

  responseComment = async (res)=>{
    const {userInfo,setUserInfo}=this.props
    setUserInfo({
      userId:res.googleId,
      name:res.profileObj.name,
      image:res.profileObj.imageUrl
    })
    if (userInfo.userId!==0){
      this.props.onModeComment()
    }
  }
  responseLogin = async (res)=>{
    const {setUserInfo}=this.props
    setUserInfo({
      userId:res.googleId,
      name:res.profileObj.name,
      image:res.profileObj.imageUrl
    })
  }

  responseFail =(err)=>{
    console.error(err);
  }
  responseLogout=()=>{
    const {setUserInfo}=this.props
    alert('로그아웃 되었습니다.')
    setUserInfo({
      userId:'',
      name:'',
      image:'',
    })
    console.log('logout')
  }

  showButton=()=>{
    if(!this.props.userInfo.userId){
      return(
      <div>
          <GoogleLogin
            clientId="759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com"
            buttonText="댓글 쓰기"
            onSuccess={this.responseComment} 
            onFailure={this.responseFail}
            cookiePolicy={'single_host_origin'}
          />
          <GoogleLogin
            clientId="759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com"
            buttonText="로그인"
            onSuccess={this.responseLogin} 
            onFailure={this.responseFail}
            cookiePolicy={'single_host_origin'}
            />
      </div>
      )
    }else{
      return(
      <div>
        <GoogleLogout
        clientId="759462615946-ok4nmhfk4j05bv53s7mbgfs22fm0d4og.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={this.responseLogout}
        ></GoogleLogout>
       
      </div>
      )
    }
  }


  render() {
    console.log(this.props.userInfo)
    return (
        <div>
        {this.showButton()}
        </div>
      );
  }
}

export default useConsumer(Login);
