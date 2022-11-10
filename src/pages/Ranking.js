import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <button
            type="button"
            onClick={ this.redirectToHome }
            data-testid="btn-go-home"
          >
            Play Again!
          </button>
        </div>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
