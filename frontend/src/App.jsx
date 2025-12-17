import React from 'react';
import './App.css';

const App = () => {
  return React.createElement(
    'div',
    { className: 'content' },
    React.createElement('h1', null, 'Rsbuild with React'),
    React.createElement('p', null, 'Start building amazing things with Rsbuild.'),
  );
};

export default App;
