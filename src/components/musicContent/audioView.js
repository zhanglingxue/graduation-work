import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png');
const cut_start = require('../../images/cut_music_start.png');
const cut_end = require('../../images/cut_music_finish.png');

export default class Audio extends React.Component {
  state = {
    isPlay: true
  };
  componentDidMount() {
    const { callBack } = this.props;
    callBack(this.refs.audio);
  }
  onChangeState = () => {
    const audio = this.refs.audio;
    if (audio !== null) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    this.setState({
      isPlay: !this.state.isPlay
    });
  }
  onTouchSame = touchX => {
    const width = window.screen.width;
    const margin_width = width * 0.17;
    const pressWidth = width * 0.73;
    const time = (touchX - margin_width) / pressWidth;
    this.refs.played.style.width = `${time * 100}%`;
    this.refs.control.style.left = `${time * 100}%`;
  }
  onTouchControlStart = e => {
    this.startX = e.touches[0].clientX;
    this.onTouchSame(this.startX);
  }
  onTouchControlEnd = e => {
    const { state, allState } = this.props;
    const allTime = state.entities[allState.array[0]].du;
    this.endX = e.changedTouches[0].clientX;
    const audio = this.refs.audio;
    const width = window.screen.width;
    const margin_width = width * 0.17;
    const pressWidth = width * 0.73;
    const time = (this.endX - margin_width) / pressWidth;
    this.onTouchSame(this.endX);
    audio.currentTime = time * allTime;
  }
  onTouchControlMove = e => {
    this.moveX = e.changedTouches[0].clientX;
    this.onTouchSame(this.moveX);
  }
  onShowClassName = () => {
    const { state, allState } = this.props;
    if (state.entities[allState.array[0]].bmt !== 0) {
      return 'cut_start';
    }
    return 'cut_start cut_none';
  }
  onShowClassNameEnd = () => {
    const { state, allState } = this.props;
    if (state.entities[allState.array[0]].emt !== 0) {
      return 'cut_start';
    }
    return 'cut_start cut_none';
  }
  controls = () => {
    const { state, allState, onChangeTime } = this.props;
    const startTime = state.entities[allState.array[0]].bmt;
    const endTime = state.entities[allState.array[0]].emt;
    const allTime = state.entities[allState.array[0]].du;
    const audio = this.refs.audio;
    const time = audio.currentTime / allTime;
    if (startTime === 0) { // 如果音乐没有起始标记
      this.refs.played.style.width = `${time * 100}%`;
    } else {
      const difference = audio.currentTime - startTime;
      const curr = startTime / allTime;
      this.refs.played.style.width = `${(difference / allTime) * 100}%`;
      this.refs.cutStart.style.left = `${curr * 100}%`;
      if (this.refs.control.style.left < this.refs.cutStart.style.left) {
        audio.currentTime = startTime;
        this.setState({
          isPlay: true
        });
        audio.play();
      }
    }
    if (endTime !== 0) {
      const curr = endTime / allTime;
      this.refs.cutEnd.style.left = `${curr * 100}%`;
      if (this.refs.control.style.left >= this.refs.cutEnd.style.left) {
        audio.currentTime = startTime;
        this.setState({
          isPlay: true
        });
        audio.play();
      }
    }
    this.refs.control.style.left = `${time * 100}%`;
    this.refs.played.style.left = `${(startTime / allTime) * 100}%`;
    const totalTime = this.transTime(allTime);
    const playTime = this.transTime(time * allTime);
    onChangeTime(`${playTime}/${totalTime}`);
  }
  transTime = value => {
    let transTime = '';
    const h = parseInt(value / 3600);
    value %= 3600;
    const m = parseInt(value / 60);
    const s = parseInt(value % 60);
    if (h > 0) {
      transTime = this.formatTime(`${h}:${m}:${s}`);
    } else {
      transTime = this.formatTime(`${m}:${s}`);
    }
    return transTime;
  }
  formatTime = value => {
    let formatTime = '';
    const s = value.split(':');
    let i = 0;
    for (; i < s.length - 1; i++) {
      formatTime += s[i].length == 1 ? (`0${s[i]}`) : s[i];
      formatTime += ':';
    }
    formatTime += s[i].length == 1 ? (`0${s[i]}`) : s[i];
    return formatTime;
  }
  render() {
    const { allState, state } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    const url = entities[music].m_url;
    return (
      <div className="musicName">
        <div className="img_button">{ this.state.isPlay ? <img
          src={icon_play}
          onClick={this.onChangeState}
          className="musicName_img"
        />
          : <img
            src={icon_pause}
            onClick={this.onChangeState}
            className="musicName_img"
          /> }
        </div>
        <div
          className="player"
          ref="playcontainer"
          onTouchMove={this.onTouchControlMove}
          onTouchEnd={this.onTouchControlEnd}
        >
          <div className="slider">
            <div className="processor" ref="played" />
            <div
              className="controller"
              ref="control"
              onTouchStart={this.onTouchControlStart}
            />
            <img src={cut_start} ref="cutStart" className={this.onShowClassName()} />
            <img src={cut_end} ref="cutEnd" className={this.onShowClassNameEnd()} />
          </div>
        </div>
        <audio
          ref="audio"
          src={url}
          autoPlay
          // preload="auto"
          loop
          onTimeUpdate={this.controls}
        />
      </div>
    );
  }
}
