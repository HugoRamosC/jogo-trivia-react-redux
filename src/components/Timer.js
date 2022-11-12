import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionNoResetTimerFlag, finishTime, getTimer } from '../redux/action/actions';

class Timer extends Component {
  state = {
    time: 30,
    // intervalCreated: false,
    interval: '',
  };

  componentDidMount() {
    const { timerValue } = this.props;
    this.setState({ time: timerValue });
    this.createInterval();
  }

  componentDidUpdate() {
    const { dispatch, resetTimer } = this.props;
    const { time } = this.state;
    dispatch(getTimer(time));
    if (time === 0) {
      dispatch(finishTime());
      // dispatch(getTimer(30));
      // this.createInterval();
    }
    if (resetTimer) {
      dispatch(actionNoResetTimerFlag());
      this.setState({ time: 30 });
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  createInterval = () => {
    // const { intervalCreated } = this.state;
    // let interval = '';
    // if (!intervalCreated) {
    const ONE_SECOND = 1000;
    const int = setInterval(() => {
      this.setState((prev) => ({ /* intervalCreated: true, */ time: prev.time - 1 }));
    }, ONE_SECOND);
    this.setState({ interval: int });
    // }
    // if (time === 0) {
    //   clearInterval(interval);
    // }
  };

  render() {
    // const { time } = this.state;
    const { answerActive, timerValue } = this.props;
    return (
      <div>
        {
          answerActive
            ? <p>Tempo esgotado!</p>
            : <p data-testid="timer">{timerValue}</p>
        }
      </div>
    );
  }
}

Timer.propTypes = {
  answerActive: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  answerActive: state.time.timeIsOver,
  timerValue: state.time.timerValue,
  resetTimer: state.time.resetTimer,
});

export default connect(mapStateToProps)(Timer);
