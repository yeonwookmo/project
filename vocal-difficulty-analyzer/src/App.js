import React, { Component } from 'react';
import SearchForm from './components/Searchform';
import Textresult from './components/Textresult';
import Commentform from './components/Commentform';
import { InfoProvider } from './context/context';
class App extends Component {
  state = { 
    mode:''
  }
  handleMode=(mode)=>{
    this.setState({
      mode:mode
    })
  }
  chooseContent=()=>{
    const{mode}=this.state
    if (mode==='result'){
      return (<Textresult onMode={this.handleMode}></Textresult>)
    }else if(mode==='comment'){
      return (<Commentform onMode={this.handleMode}></Commentform>)
    }else{
      return (<SearchForm onMode={this.handleMode}></SearchForm>)
    }
  }
  render() { 
    console.log('app')
    console.log(this.state.mode)
    return (  
      <InfoProvider>
        {this.chooseContent()}
      </InfoProvider>
    );
  }
}
 
export default App;
