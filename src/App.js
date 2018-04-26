import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import MainSection from './MainSection';
import 'font-awesome/scss/font-awesome.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className="page-heading">Meal delivery</div>
        <MainSection /> 
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
