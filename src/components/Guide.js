import React, { Component } from 'react';
class Guide extends Component {
    state = {  }
    render() {
        console.log('Guide')
        const style={
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }
        return (
            <div style={style}>
                This extension is to help users to calibrate vocal difficulty
            </div>
         );
    }
}
 
export default Guide;