import React from 'react';
import './Home.scss';
import { connect } from 'react-redux';

class Home extends React.Component {
  render () {

    let homeStyle = {
      color: 'white',
      fontSize: '35px',
      textAlign: 'center',
      marginTop: '20px'
    }

    return (
        <div>
          <h1 style={homeStyle}>Home</h1>
        </div>
    );
  }
}
export default connect(
    state => ({}),
    dispatch => ({})
)(Home);
