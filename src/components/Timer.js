import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { finishTime, getTimer } from '../redux/action/actions';

class Timer extends Component {
  state = {
    time: 30,
    intervalCreated: false,
  };

  componentDidMount() {
    const { timerValue } = this.props;
    this.setState({ time: timerValue });
    this.createInterval();
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { time } = this.state;
    dispatch(getTimer(time));
    if (time === 0) {
      dispatch(finishTime());
      // dispatch(getTimer(30));
      // this.createInterval();
    }
  }

  createInterval = () => {
    const { intervalCreated, time } = this.state;
    let interval = '';
    if (!intervalCreated) {
      const ONE_SECOND = 1000;
      interval = setInterval(() => {
        this.setState((prev) => ({ time: prev.time - 1 }));
      }, ONE_SECOND);
      this.setState({ intervalCreated: true });
    }
    if (time === 0) {
      clearInterval(interval);
    }
  };

  render() {
    // const { time } = this.state;
    const { answerActive, timerValue } = this.props;
    return (
      <div>
        {
          answerActive
            ? <p>Tempo esgotado!</p>
            : timerValue
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
});

export default connect(mapStateToProps)(Timer);
