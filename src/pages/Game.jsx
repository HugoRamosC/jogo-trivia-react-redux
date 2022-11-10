import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
      currentQuestion: 0,
      questions: [],
      answerActive: false,
    };
  }

  async componentDidMount() {
    this.fetchImg();
    const data = await this.fetchQuestions();
    this.setState({ questions: data.results });
  }

  fetchImg = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({ img: hash });
  };

  // checkToken = () => {
  //   const { history } = this.props;
  //   const token = localStorage.getItem('token');
  //   console.log(token);
  //   if (token === '') {
  //     console.log(1);
  //     localStorage.removeItem('token');
  //     history.push('/');
  //   }
  // };

  // problema era que o erro não estava sendo tratado no fetch
  // não estavamos passando o erro que vinha do fetch e sim simulando um erro
  fetchQuestions = async () => {
    // await this.checkToken();
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await request.json();
    const code = 3;
    // response_code é um paramentro da API que diz se deu erro (3) ou tudo ok (0)
    if (data.response_code === code) {
      localStorage.removeItem('token');
      history.push('/');
    }
    return data;
  };

  // guardando a função para uso futuro
  checkAnswer = () => {
    this.setState({ answerActive: true });
  };

  shuffleArray(inputArray) {
    if (inputArray.length > 0) {
      const zeroFive = 0.5;
      const arr = inputArray.sort(() => Math.random() - zeroFive);
      return arr;
    }
  }

  render() {
    const { name, score } = this.props;
    const { img, questions, currentQuestion, answerActive } = this.state;
    console.log(questions);
    const question = questions[currentQuestion];
    let incorrectAnswers = [];
    let correctAnswer = '';
    if (question) {
      // settando qual resposta é a certa
      correctAnswer = question.correct_answer;
      incorrectAnswers = question.incorrect_answers;
    }
    // spreadando respostas erradas e adicionando a correta
    const newArr = [...incorrectAnswers, correctAnswer];
    this.shuffleArray(newArr);
    return (
      <>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${img}` } data-testid="header-profile-picture" alt="Img" />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
        <main>
          {question ? (
            <>
              <p data-testid="question-category">{question.category}</p>
              <p data-testid="question-text">{question.question}</p>
              <div data-testid="answer-options">
                {newArr.length > 0 ? newArr.map((a, index) => (
                  <button
                    className={ a === correctAnswer && answerActive
                      ? 'right-answer' : 'wrong-answer' }
                    data-testid={ a === correctAnswer
                      ? 'correct-answer'
                      : `wrong-answer-${index}` }
                    type="button"
                    key={ a }
                    onClick={ this.checkAnswer }
                  >
                    {a}
                  </button>
                )) : null }
              </div>
            </>
          ) : null}
        </main>
      </>
    );
  }
}

Game.propTypes = {
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

export default connect(mapStateToProps)(Game);
