'use client'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
:root {

    --blue-900: #03045E;
    --blue-700: #023E8A;
    --blue-500: #0077B6;
    --blue-400: #0096C7;
    --blue-300: #00B4D8;
    --blue-250: #48CAE4;
    --blue-200: #90E0EF;
    --blue-100: #CAF0F8;

    --text-title: #363F5F;

    --gray: #f7f5f5;

    --green: #33CC95;
    --red: #E52E4D;

    --background: #FFFFFF;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    @media (max-width: 1080px) {
        font-size: 93.75%
    }

    @media (max-width: 720px) {
        font-size: 87.5%;
    }
}

body {
    background: var(--background);
    overflow-x: hidden;
}

body,
input,
textarea,
button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
    font-weight: 600;
}

button {
    cursor: pointer;
}

[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

`