import React, { Component } from 'react'
import styles from 'styles/timer.module.css'

const INTERVAL_TIME = 1
enum TIME_OF_ONE {
  SECOND = 1000,
  MINUTE = 60 * 1000,
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000
}

interface myState {
  miliseconds: number
  intervalId: NodeJS.Timeout
  leaps: number[]
}

class Timer extends Component<{}, myState> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(props) {
    super(props)
    this.state = {
      miliseconds: 0,
      intervalId: null,
      leaps: []
    }
    this.tick = this.tick.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.reset = this.reset.bind(this)
    this.format = this.format.bind(this)
    this.saveLeap = this.saveLeap.bind(this)
    this.clearLeaps = this.clearLeaps.bind(this)
  }

  saveLeap(): void {
    this.setState((state) => {
      state.leaps.push(state.miliseconds)
    })
  }

  clearLeaps(): void {
    this.setState((state) => {
      while (state.leaps.length > 0) {
        state.leaps.pop()
      }
    })
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

    /* const days = Math.floor(number / TIME_OF_ONE.DAY)
    number %= TIME_OF_ONE.DAY */
    const hours = Math.floor(number / TIME_OF_ONE.HOUR)
    number %= TIME_OF_ONE.HOUR
    const minutes = Math.floor(number / TIME_OF_ONE.MINUTE)
    number %= TIME_OF_ONE.MINUTE
    const seconds = Math.floor(number / TIME_OF_ONE.SECOND)
    number %= TIME_OF_ONE.SECOND
    const miliseconds = Math.floor(number)

    return [
      // ('0' + days).slice(-2),
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
    const leaps = this.state.leaps
      .sort((a, b) => b - a)
      // TODO tenho que rever se é uma boa ideia usar o próprio leap como key
      .map((leap) => (
        <div key={leap} className={styles.leap}>
          {this.format(leap).join(':')}
        </div>
      ))

    return (
      <div className={styles.container}>
        <div className={styles.watch}>{time}</div>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.reset}>Reset</button>
        <br />
        <button onClick={this.saveLeap}>New Leap</button>
        <button onClick={this.clearLeaps}>Clear Leaps</button>
        <div className={styles.leapBox}>{leaps}</div>
      </div>
    )
  }
}

export default Timer
