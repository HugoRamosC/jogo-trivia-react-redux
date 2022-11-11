import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <>
        <Header />
        <div data-testid="feedback-text" />
        <button
          type="button"
          onClick={ this.redirectToRanking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect()(Feedback);
