import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png');
const cut_start = require('../../images/cut_music_start.png');
const cut_end = require('../../images/cut_music_finish.png');

export default class Audio extends React.Component {
  state = {
    isPlay: true,
    current: false,
    isMove: false
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
    const { state, allState } = this.props;
    const startTime = state.entities[allState.array[0]].bmt;
    const allTime = state.entities[allState.array[0]].du;
    const endTime = state.entities[allState.array[0]].emt;
    const audio = this.refs.audio;
    const width = window.screen.width;
    const margin_width = width * 0.17;
    const pressWidth = width * 0.73;
    const time = (touchX - margin_width) / pressWidth; // 当前坐标占进度条的百分比(小数)
    if (startTime === 0) {
      if (this.state.isMove) {
        audio.pause();
      }
      this.refs.played.style.width = `${time * 100}%`;
      this.refs.control.style.left = `${time * 100}%`;
      audio.currentTime = time * allTime;
    } else if (startTime !== 0) {
      if (time < (startTime / allTime)) {
        if (this.state.isMove) {
          audio.pause();
        }
        this.refs.control.style.left = `${(startTime / allTime) * 100}%`;
        this.refs.played.style.width = '0%';
        audio.currentTime = startTime;
      }
    }
    if (endTime === 0) {
      if (this.state.isMove) {
        audio.pause();
      }
      this.refs.played.style.width = `${(time - (startTime / allTime)) * 100}%`;
      this.refs.control.style.left = `${time * 100}%`;
      audio.currentTime = time * allTime;
    } else if (time > (endTime / allTime)) {
      if (this.state.isMove) {
        audio.pause();
        this.refs.played.style.width = `${((endTime - startTime) / allTime) * 100}%`;
        this.refs.control.style.left = `${(endTime / allTime) * 100}%`;
        audio.currentTime = endTime;
      } else {
        this.refs.played.style.width = '0%';
        this.refs.control.style.left = `${(startTime / allTime) * 100}%`;
        audio.currentTime = startTime;
      }
    } else {
      if (this.state.isMove) {
        audio.pause();
      }
      this.refs.played.style.width = `${(time - (startTime / allTime)) * 100}%`;
      this.refs.control.style.left = `${time * 100}%`;
      audio.currentTime = time * allTime;
    }
  }
  onTouchControlStart = e => {
    this.startX = e.touches[0].clientX;
    this.onTouchSame(this.startX);
  }
  onTouchControlEnd = e => {
    const audio = this.refs.audio;
    this.endX = e.changedTouches[0].clientX;
    this.onTouchSame(this.endX);
    this.setState({
      isMove: false
    });
    if (this.state.isPlay) {
      audio.play();
    }
  }
  onTouchControlMove = e => {
    this.moveX = e.changedTouches[0].clientX;
    this.setState({
      isMove: true
    });
    this.onTouchSame(this.moveX);
  }
  onShowCutStart = () => {
    const { state, allState } = this.props;
    if (state.entities[allState.array[0]].bmt !== 0) {
      return 'cut_start';
    }
    return 'cut_start cut_none';
  }
  onShowCutEnd = () => {
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
    if (!this.state.current) {
      this.setState({
        current: true
      });
      audio.currentTime = startTime;
    } else {
      this.refs.played.style.width = `${((audio.currentTime - startTime) / allTime) * 100}%`;
      this.refs.control.style.left = `${(audio.currentTime / allTime) * 100}%`;
      this.refs.played.style.left = `${(startTime / allTime) * 100}%`;
      if (startTime !== 0) {
        this.refs.cutStart.style.left = `${(startTime / allTime) * 100}%`;
        if (parseInt(this.refs.control.style.left) < parseInt(this.refs.cutStart.style.left)) {
          audio.currentTime = startTime;
          this.refs.played.style.width = '0%';
          this.setState({
            isPlay: true
          });
          audio.play();
        }
      }
      if (endTime !== 0) {
        this.refs.cutEnd.style.left = `${(endTime / allTime) * 100}%`;
        if (parseInt(this.refs.control.style.left) >= parseInt(this.refs.cutEnd.style.left)) {
          audio.currentTime = startTime;
          this.refs.played.style.width = '0%';
          this.setState({
            isPlay: true
          });
          audio.play();
        }
      }
    }
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
          onTouchEnd={this.onTouchControlEnd}
          onTouchMove={this.onTouchControlMove}
        >
          <div className="slider">
            <div className="processor" ref="played" />
            <div
              className="controller"
              ref="control"
              onTouchStart={this.onTouchControlStart}
            />
            <img src={cut_start} ref="cutStart" className={this.onShowCutStart()} />
            <img src={cut_end} ref="cutEnd" className={this.onShowCutEnd()} />
          </div>
        </div>
        <audio
          ref="audio"
          src={url}
          autoPlay
          loop
          onTimeUpdate={this.controls}
        />
      </div>
    );
  }
}
