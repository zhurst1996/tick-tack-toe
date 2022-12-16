import React from 'react';
import Board from './components/board';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render () {
    return (
      <div className="App h-100">
        <Board />
      </div>
    );
  }
}

export default App;
