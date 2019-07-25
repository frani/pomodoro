import React, { Component } from 'react';
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import Header from './Header';
import isotipo from '../images/isotipo.svg';

export default class Timer extends Component {
    state = {
        countDown: '',
        pomodoro: 1500,
        longBreak: 900,
        shortBreak: 300,
        currentCountDown: 0,
        play: false,
    }

    componentWillMount() {
        if(!this.state.countDown) {
            this.setState({countDown: this.state.pomodoro, currentCountDown: this.state.pomodoro })
        }
    }

    componentDidMount() {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }

    // ------------------------------------------------------------------------------------- 
    // ---------------------------- Functions ----------------------------------------------
    // -------------------------------------------------------------------------------------

    formatTime = seconds => {
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        return timeFormated;
    }

    elapseTime = () => {
        if (this.state.countDown === 0) {
            this.alert();
            this.reset();
        }
        if (this.state.play === true) {
            let newState = this.state.countDown - 1;
            this.setState({ countDown: newState });
        }
    }

    reset = () => {
        this.restartInterval();
        if (this.state.countDown === 0) {
            if (this.state.currentCountDown === 1500) {
                let pomodoros = Number(localStorage.getItem('pomodoro-tech-pomodoros')) || 0;
                if (pomodoros === 3) {
                    localStorage.setItem('pomodoro-tech-pomodoros', 0);
                    this.setState({ play: false, countDown: this.state.longBreak, currentCountDown: this.state.longBreak })
                } else {
                    localStorage.setItem('pomodoro-tech-pomodoros', pomodoros + 1);
                    this.setState({ play: false, countDown: this.state.shortBreak, currentCountDown: this.state.shortBreak })
                }
            } else {
                this.setState({ play: false, countDown: this.state.pomodoro, currentCountDown: this.state.pomodoro })
            }
        } else {
            this.setState({ countDown: this.state.currentCountDown });
        }
    }

    restartInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(this.elapseTime, 1000);
    }

    alert() {
        // audio
        let audio = new Audio('http://adobewordpress.com/tasarim/include/gold-sound.mp3');
        audio.play();
        setTimeout(() => audio.pause(), 1400);
        // notification
        if (Notification.permission === "granted") {
            if (this.state.currentCountDown === 1500) {
                new Notification("Pomodoro is Done!", {
                    icon: "img/coffee.png",
                    lang: "en",
                    body: "Time to Relax!"
                });
            } else {
                new Notification("The time is over!", {
                    icon: "img/code.png",
                    lang: "en",
                    body: "Hey, back to work!"
                });
            }
        }
    }
    
    // ------------------------------------------------------------------------------------- 
    // ---------------------------- Handlers -----------------------------------------------
    // -------------------------------------------------------------------------------------

    handlePlayAndPause = e => {
        e.preventDefault();
        let { play } = this.state;
        if(play) {
            this.setState({play: false})
        } else {
            this.restartInterval();
            this.setState({play: true})
            this.elapseTime();
        }
    }

    handleChangeTimer = e => {
        e.preventDefault();
        this.restartInterval();
        let { name } = e.target;
        this.setState({ countDown: this.state[name], currentCountDown: this.state[name] })
    }


    render() {
        let { countDown, play, currentCountDown } = this.state;
        document.title = `${this.formatTime(this.state.countDown)} Pomodoro`;
        return (
            <>
            <Header rotating={play} />
            <div className="container">
                <Row>
                    <Col>
                        <h1 className="countDown color-primary text-centered">{this.formatTime(countDown)}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-centered">
                        <Button onClick={this.handlePlayAndPause} className="mainButton rounded-pill" variant="success">{play ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i> }</    Button>
                        <Button onClick={this.reset} className="mainButton rounded-pill" style={{ "borderColor":"transparent", "marginLeft":"20px" }} variant="outline-light"><i className="fas fa-undo-alt"></i></Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-centered">
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="light" active={currentCountDown === 1500} onClick={this.handleChangeTimer} name="pomodoro"> Pomodoro </Button>
                            <Button variant="light" active={currentCountDown === 900} onClick={this.handleChangeTimer} name="longBreak"> Long Break </Button>
                            <Button variant="light" active={currentCountDown === 300} onClick={this.handleChangeTimer} name="shortBreak"> Short Break </Button>
                        </ButtonGroup>
                        {/* <div className="text-centered">
                            <Button variant="light" onClick={this.handleChangeTimer} name="pomodoro" className="rounded-pill"> Pomodoro </Button>
                            <Button variant="light" onClick={this.handleChangeTimer} name="shortBreak" className="rounded-pill"> Short Break </Button>
                            <Button variant="light" onClick={this.handleChangeTimer} name="longBreak" className="rounded-pill"> Long Break </Button>
                        </div> */}
                    </Col>
                </Row>
                <Row>
                    <Col className="text-centered">
                        <img className={play ? 'headerLogo rotate' : 'headerLogo rotate paused'} style={{"height":"50px","filter":"brightness(.8)"}} src={isotipo} alt="pomodoro technique" />
                        <span className="pomodoros-counter">{Number(localStorage.getItem('pomodoro-tech-pomodoros')) || 0}</span>
                    </Col>
                    
                </Row>
            </div>
            </>
        )
    }
}
