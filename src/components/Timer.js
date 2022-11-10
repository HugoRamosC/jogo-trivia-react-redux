import React, { Component } from 'react';

class Timer extends Component {
  state = {
    time: 30,
    failAnswer: false,
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
      this.setState({
        failAnswer: true,
        time: 30,
      });
    }
  }

  render() {
    const { time, failAnswer } = this.state;
    return (
      <div>
        {
          failAnswer
            ? <p>Sem Resposta</p>
            : time
        }
      </div>
    );
  }
}

export default Timer;
