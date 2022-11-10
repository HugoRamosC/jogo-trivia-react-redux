import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
    };
  }

  async componentDidMount() {
    this.fetchImg();
  }

  fetchImg = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({ img: hash });
  };

  render() {
    const { name, score, history } = this.props;
    const { img } = this.state;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${img}` } data-testid="header-profile-picture" alt="Img" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">
          <h2>Pontos:</h2>
          {' '}
          { score }
        </h2>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default withRouter(connect(mapStateToProps)(Header));
