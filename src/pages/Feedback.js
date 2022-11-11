import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="feedback-text" />
      </>
    );
  }
}

export default connect()(Feedback);
