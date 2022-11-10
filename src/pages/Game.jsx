import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
    };
  }

  componentDidMount() {
    this.fetchImg();
  }

  fetchImg = async () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const imgUrl = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    this.setState({ img: imgUrl.url });
    // return imgUrl;
  };

  render() {
    const { name, score } = this.props;
    const { img } = this.state;
    // console.log(img);
    return (
      <header>
        <img src={ img } data-testid="header-profile-picture" alt="Img" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
