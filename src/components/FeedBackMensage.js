import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FeedBackMensage.css';
import { connect } from 'react-redux';

class FeedBackMensage extends Component {
  render() {
    const { score, assertions } = this.props;
    const totalAssertions = 3;
    return (
      <div
        className="feedBack-msg"
      >
        {
          (assertions >= totalAssertions) ? (
            <div className="positive-feedBack-msg">
              <img
                src="https://i.kym-cdn.com/photos/images/original/001/701/625/240.jpg"
                alt="foto"
                width={ 200 }
              />
              <h1
                className="positive-title"
                data-testid="feedback-text"
              >
                Well Done!
              </h1>
              <p>{`voce acertou ${assertions} questões!`}</p>
              <p>{`Um total de ${score} pontos`}</p>
            </div>
          ) : (
            <div className="negative-feedBack-msg">
              <img
                src="https://i.kym-cdn.com/photos/images/original/001/701/625/240.jpg"
                alt="foto"
                width={ 200 }
              />
              <h1
                className="negative-title"
                data-testid="feedback-text"
              >
                Could be better...
              </h1>
              <p>{`voce acertou ${assertions} questões!`}</p>
              <p>{`Um total de ${score} pontos`}</p>
            </div>
          )
        }
      </div>
    );
  }
}

FeedBackMensage.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(FeedBackMensage);
