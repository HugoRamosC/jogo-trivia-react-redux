import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { finishTime } from '../redux/action/actions';

class Timer extends Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prev) => ({ time: prev.time - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      const { dispatch } = this.props;
      dispatch(finishTime());
    }
  }

  render() {
    const { time } = this.state;
    const { answerActive } = this.props;
    return (
      <div>
        {
          answerActive
            ? <p>Tempo esgotado!</p>
            : time
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
});

export default connect(mapStateToProps)(Timer);
