import React, { Component } from 'react'

const INTERVAL_TIME = 1
enum TIME_OF_ONE {
  SECOND = 1000,
  MINUTE = 60 * 1000,
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000
}

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      miliseconds: 0,
      intervalId: null
    }
    this.tick = this.tick.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.reset = this.reset.bind(this)
    this.format = this.format.bind(this)
  }

  tick(): void {
    const num = this.state.miliseconds + 1
    this.setState({
      miliseconds: num
    })
  }

  start(): void {
    if (this.state.intervalId) {
      return
    }

    const id = setInterval(this.tick, INTERVAL_TIME)
    this.setState({
      intervalId: id
    })
  }

  stop(): void {
    clearInterval(this.state.intervalId)
    this.setState({
      intervalId: null
    })
  }

  reset(): void {
    this.stop()
    this.setState({
      miliseconds: 0
    })
  }

  // TODO refatorar este método para maior legibilidade
  format(input: number): string[] {
    let number = input

    const days = Math.floor(number / TIME_OF_ONE.DAY)
    number %= TIME_OF_ONE.DAY
    const hours = Math.floor(number / TIME_OF_ONE.HOUR)
    number %= TIME_OF_ONE.HOUR
    const minutes = Math.floor(number / TIME_OF_ONE.MINUTE)
    number %= TIME_OF_ONE.MINUTE
    const seconds = Math.floor(number / TIME_OF_ONE.SECOND)
    number %= TIME_OF_ONE.SECOND
    const miliseconds = Math.floor(number)

    return [
      ('0' + days).slice(-2),
      ('0' + hours).slice(-2),
      ('0' + minutes).slice(-2),
      ('0' + seconds).slice(-2),
      ('00' + miliseconds).slice(-3)
    ]
  }

  componentWillUnmount(): void {
    this.stop()
  }

  render(): JSX.Element {
    const time = this.format(this.state.miliseconds).join(':')

    return (
      <div>
        <h2>{time}</h2>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

export default Timer
