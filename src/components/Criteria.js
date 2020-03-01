import React, { Component } from 'react';
class Criteria extends Component {
    state = {  }
    render() {
        console.log('Criteria') 
        const style={
            border: '1px solid black',
            pfadding: '8px',
            margin: '8px'
        }
        return (
            
            <div style={style}>
                difficulty Criteria
            </div>
         );
    }
}
 
export default Criteria;