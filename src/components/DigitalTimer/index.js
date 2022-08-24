// Write your code here
import {Component} from 'react'
import './index.css'

const intialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timerElpasedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = intialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerContainer = () => {
    const {timerElpasedInSeconds, timerLimitInMinutes} = this.state
    const isDisabled = timerElpasedInSeconds > 0

    return (
      <div className="setting-timer-container">
        <p className="timer-container-header">Set Timer Limit</p>
        <div className="incrementAndDecrement-container">
          <button
            className="decrement-option"
            type="button"
            onClick={this.onDecreaseTimerInMinutes}
            disabled={isDisabled}
          >
            -
          </button>
          <div className="timer-setter">
            <p className="timer-setter-content">{timerLimitInMinutes}</p>
          </div>
          <button
            className="decrement-option"
            type="button"
            onClick={this.onIncreaseTimerInMinutes}
            disabled={isDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(intialState)
  }

  incrementTimeElpasedInSeconds = () => {
    const {timerElpasedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timerElpasedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElpasedInSeconds: prevState.timerElpasedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      timerElpasedInSeconds,
      timerLimitInMinutes,
      isTimerRunning,
    } = this.state
    const isTimerCompleted = timerElpasedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElpasedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElpasedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderOperationalContainer = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const timerStatus = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="operational-container">
        <button
          className="button-icon"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="timer-icon"
          />
          <p className="timer-icon-content">{timerStatus}</p>
        </button>
        <button
          className="button-icon"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-icon"
          />
          <p className="timer-icon-content">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerElpasedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timerElpasedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const status = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="time-container">
          <div className="digital-timer-container">
            <div className="timer-content">
              <h1 className="timer-header">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="setter-container">
            {this.renderOperationalContainer()}
            {this.renderTimerContainer()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
