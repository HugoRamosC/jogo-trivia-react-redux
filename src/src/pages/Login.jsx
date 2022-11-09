import React from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      btnCheck: true,
    };
  }

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
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form className="login-form">
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
              onClick={ this.validateCredentials }
            >
              Entrar
            </button>
          </form>

        </header>
      </div>
    );
  }
}

export default connect()(Login);
