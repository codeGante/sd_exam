import React, { Component } from 'react';

class Error extends Component {
    render() {
        return(
            <div id="error">
                <h1 className="title">Whoops!</h1>
                <p>Something went wrong</p>
            </div>
        )
    }
}

export default Error