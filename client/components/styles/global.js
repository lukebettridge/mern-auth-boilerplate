import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, :before, :after {
        box-sizing: border-box;
    }

    body {
        background-color: #fcfcfc;
        font-family: 'Lato', sans-serif;
        margin: 0;
        position: relative;
        
        &.ReactModal__Body--open {
            overflow: hidden;
        }
    }

    ul {
        list-style: none;
        margin-top: 0;
        padding-left: 0;
    }

    hr {
        border: 0;
        border-top: 1px solid #ffffff;
        margin: 16px 0;
    }

    .ReactModal__Overlay {
        background-color: rgba(0, 0, 0, 0.3) !important;
        opacity: 0;
        transition: opacity .5s;
        z-index: 1;
    } 
    
    .ReactModal__Overlay--after-open {
        opacity: 1;
    }
`;

module.exports = GlobalStyle;
