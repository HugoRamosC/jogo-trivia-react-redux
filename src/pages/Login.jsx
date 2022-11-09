import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import triviaTokenApi from '../services/tokenApi';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      btnCheck: true,
    };
  }

  redirectToGame = async () => {
    const { history } = this.props;
    const getToken = await triviaTokenApi();
    localStorage.setItem('token', getToken.token);
    history.push('/game');
  };

  validateCredentials = () => {
    const { name, email } = this.state;
    const validateName = name.length > 0;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);
    return (validateEmail && validateName)
      ? this.setState({ btnCheck: false })
      : this.setState({ btnCheck: true });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateCredentials());
  };

  render() {
    const { email, name, btnCheck } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                value={ email }
                type="text"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </label>
            <label htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                value={ name }
                type="text"
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              disabled={ btnCheck }
              onClick={ this.redirectToGame }
            >
              Entrar
            </button>
          </form>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
