import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { restartScore } from '../redux/action/actions';

class Ranking extends Component {
  state = {
    imgGrvtr: 0,
    playersArr: [],
  };

  componentDidMount() {
    this.fetchGravatarImg();
    this.savePlayer();
  }

  fetchGravatarImg = () => {
    const { gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();
    this.setState({ imgGrvtr: hash });
  };

  savePlayer = () => {
    const { imgGrvtr } = this.state;
    const { name, score } = this.props;
    const newPlyr = { name, score, imgGrvtr };
    // const newArr = [...playersArr, newPlyr];
    if (!JSON.parse(localStorage.getItem('players'))) {
      this.setState(
        (prev) => (
          { playersArr: [...prev.playersArr, newPlyr] }),
        () => {
          const { playersArr } = this.state;
          localStorage.setItem('players', JSON.stringify(playersArr));
        },
      );
    } else {
      const players = JSON.parse(localStorage.getItem('players'));
      this.setState(
        { playersArr: [...players, newPlyr] },
        () => {
          const { playersArr } = this.state;
          localStorage.setItem('players', JSON.stringify(playersArr));
        },
      );
    }
  };

  redirectToHome = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(restartScore());
  };

  render() {
    // const arrPlayers = JSON.parse(localStorage.getItem('players'))
    //   ? JSON.parse(localStorage.getItem('players'))
    //   : ['test'];
    const { playersArr } = this.state;
    const orderArr = playersArr.sort((a, b) => b.score - a.score);
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.redirectToHome }
          data-testid="btn-go-home"
        >
          Play Again!
        </button>
        <ol>
          { orderArr.length > 0
            ? orderArr.map((player, index) => (
              <li key={ index }>
                <img src={ `https://www.gravatar.com/avatar/${player.imgGrvtr}` } alt="avatarImage" />
                <h3 data-testid={ `player-name-${index}` }>{ player.name }</h3>
                <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
              </li>
            ))
            : null}
        </ol>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
