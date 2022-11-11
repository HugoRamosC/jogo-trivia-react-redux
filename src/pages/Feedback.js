import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Feedbackmessage from '../components/Feedbackmessage';
import Header from '../components/Header';
import { restartScore } from '../redux/action/actions';

class Feedback extends React.Component {
  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  reloadStart = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(restartScore());
  };

  render() {
    return (
      <>
        <Header reloadStart={ this.reloadStart } />
        <div data-testid="feedback-text" />
        <button
          type="button"
          onClick={ this.redirectToRanking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
        <Feedbackmessage />
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Feedback);
