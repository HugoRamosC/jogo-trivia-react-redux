import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Game.css';
import Timer from '../components/Timer';
import { finishTime,
  actionUpdateScore, actionNextQuestion } from '../redux/action/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      img: '',
      currentQuestion: 0,
      sortedQuestions: [],
      answerActive: false,
      answered: false,
    };
  }

  async componentDidMount() {
    const { answerActive } = this.props;
    const { currentQuestion } = this.state;
    this.fetchImg();
    const data = await this.fetchQuestions();
    // console.log(data.results);
    const question = data.results[currentQuestion];
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
    this.setState({ questions: data.results,
      sortedQuestions: newArr,
      question,
      correctAnswer,
      answerActive,
    });
  }

  updateQuestion = () => {
    const { currentQuestion, questions } = this.state;
    const question = questions[currentQuestion];
    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.incorrect_answers;
    // spreadando respostas erradas e adicionando a correta
    const newArr = [...incorrectAnswers, correctAnswer];
    this.shuffleArray(newArr);
    this.setState({ sortedQuestions: newArr,
      question,
      correctAnswer });
  };

  fetchImg = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({ img: hash });
  };

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

  checkAnswer = (answer) => {
    // pegar o tempo do timmer
    const { correctAnswer, question } = this.state;
    const { score, dispatch, timerValue } = this.props;
    dispatch(finishTime());
    const ten = 10;
    const three = 3;
    let difficulty = 1;
    switch (question.difficulty) {
    case 'easy':
      difficulty = 1;
      break;
    case 'medium':
      difficulty = 2;
      break;
    case 'hard':
      difficulty = three;
      break;
    default:
      break;
    }
    if (answer === correctAnswer) {
      const updatedScore = score + (ten + (timerValue * difficulty));
      dispatch(actionUpdateScore(updatedScore));
    }
    this.setState({ answerActive: true, answered: true });
  };

  checkClass = (a) => {
    const { questions, currentQuestion } = this.state;
    const correctAnswer = questions[currentQuestion].correct_answer;

    return a === correctAnswer
      ? 'right-answer' : 'wrong-answer';
  };

  nextQuestion = () => {
    const { currentQuestion } = this.state;
    const { dispatch } = this.props;
    const three = 3;
    if (currentQuestion <= three) {
      this.setState(
        (prev) => ({ currentQuestion: prev.currentQuestion + 1,
          answered: false,
          answerActive: false }),
        () => {
          this.updateQuestion();
          dispatch(actionNextQuestion());
        },
      );
    } else {
      // colocar o redirecionamento p/ feedback
    }
  };

  shuffleArray(inputArray) {
    if (inputArray.length > 0) {
      const zeroFive = 0.5;
      const arr = inputArray.sort(() => Math.random() - zeroFive);
      return arr;
    }
  }

  render() {
    const { name, score, answerActive: timerActive } = this.props;
    const {
      img,
      answerActive,
      sortedQuestions,
      question,
      correctAnswer,
      answered } = this.state;
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
                {sortedQuestions.length > 0 ? sortedQuestions.map((a, index) => (
                  <button
                    className={ answerActive ? this.checkClass(a) : '' }
                    data-testid={ a === correctAnswer
                      ? 'correct-answer'
                      : `wrong-answer-${index}` }
                    type="button"
                    key={ a }
                    disabled={ timerActive }
                    onClick={ () => this.checkAnswer(a) }
                  >
                    {a}
                  </button>
                )) : null }
              </div>
              <Timer />
            </>
          ) : null}
          { answered === true
            ? (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            ) : null }
        </main>
      </>
    );
  }
}

Game.propTypes = {
  answerActive: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timerValue: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  answerActive: state.time.timeIsOver,
  timerValue: state.time.timerValue,
});

export default connect(mapStateToProps)(Game);
