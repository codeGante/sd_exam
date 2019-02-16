import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return(
            <div className="navbar fixed-bottom bg-dark text-white">
                <span>©2019 Copyright: CodeGante</span>
                <a href="https://github.com/codeGante" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-github fa-3x" style={{color: '#ffff'}}></i>
                </a>
            </div>
         )
    }
}

export default Footer;