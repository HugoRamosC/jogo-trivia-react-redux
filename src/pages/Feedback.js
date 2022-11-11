import React from 'react';
import { connect } from 'react-redux';
import Feedbackmessage from '../components/Feedbackmessage';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Feedbackmessage />
      </>
    );
  }
}

export default connect()(Feedback);
