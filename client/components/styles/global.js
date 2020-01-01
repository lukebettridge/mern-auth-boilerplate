import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, :before, :after {
        box-sizing: border-box;
    }

    body {
        font-family: 'Lato', sans-serif;
        margin: 0;
        background-color: #fcfcfc;

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
`;

module.exports = GlobalStyle;
