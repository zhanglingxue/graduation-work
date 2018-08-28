import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png');
const cut_start = require('../../images/cut_music_start.png');
const cut_end = require('../../images/cut_music_finish.png');

export default class Audio extends React.Component {
  state = {
    isPlay: true,
    current: false // 音乐播放且有初始标记时判断是否音乐要等于初始标记时间
  };
  componentDidMount() {
    const { callBack } = this.props;
    this.onChangeCutPosition(this.props);
    callBack(this.refs.audio);
  }
  componentWillReceiveProps(newProps) {
    this.onChangeCutPosition(newProps);
  }
  onChangeCutPosition = props => {
    const { state, allState } = props;
    const startTime = state.entities[allState.array[0]].bmt;
    const endTime = state.entities[allState.array[0]].emt;
    const allTime = state.entities[allState.array[0]].du;
    this.refs.cutStart.style.left = `${(startTime / allTime) * 100}%`;
    this.refs.cutEnd.style.left = `${(endTime / allTime) * 100}%`;
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
  onTouchControlEnd = e => {
    const { state, allState } = this.props;
    const audio = this.refs.audio;
    this.endX = e.changedTouches[0].clientX;
    const startTime = state.entities[allState.array[0]].bmt;
    const allTime = state.entities[allState.array[0]].du;
    const endTime = state.entities[allState.array[0]].emt;
    const width = window.screen.width; // 当前展示的页面宽度
    const margin_width = width * 0.17;
    const pressWidth = width * 0.73;
    const time = (this.endX - margin_width) / pressWidth;
    if (time < (startTime / allTime)) {
      audio.currentTime = startTime;
      this.refs.control.style.left = `${(startTime / allTime) * 100}%`;
      this.refs.played.style.width = '0%';
    } else if (time > (endTime / allTime) && endTime !== 0) {
      audio.currentTime = startTime;
      this.refs.control.style.left = `${(startTime / allTime) * 100}%`;
      this.refs.played.style.width = '0%';
    } else {
      audio.currentTime = time * allTime;
      this.refs.control.style.left = `${time * 100}%`;
      this.refs.played.style.width = `${(time - (startTime / allTime)) * 100}%`;
    }
  }
  onTouchControlMove = e => {
    const { state, allState } = this.props;
    this.moveX = e.changedTouches[0].clientX;
    const startTime = state.entities[allState.array[0]].bmt;
    const allTime = state.entities[allState.array[0]].du;
    const endTime = state.entities[allState.array[0]].emt;
    const width = window.screen.width; // 当前展示的页面宽度
    const margin_width = width * 0.17;
    const pressWidth = width * 0.73;
    const time = (this.moveX - margin_width) / pressWidth;
    if (time < (startTime / allTime)) {
      this.refs.played.style.width = '0%';
    } else if (time > (endTime / allTime) && endTime !== 0) {
      this.refs.played.style.width = `${((endTime - startTime) / allTime) * 100}%`;
    } else {
      this.refs.played.style.width = `${(time - (startTime / allTime)) * 100}%`;
    }
    this.refs.control.style.left = `${time * 100}%`;
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
      return 'cut_start cut_end';
    }
    return 'cut_start cut_none';
  }
  controls = () => {
    const { state, allState, changeTime } = this.props;
    const startTime = state.entities[allState.array[0]].bmt;
    const endTime = state.entities[allState.array[0]].emt;
    const allTime = state.entities[allState.array[0]].du;
    const audio = this.refs.audio;
    if (!this.state.current && startTime !== 0) {
      this.setState({
        current: true
      });
      audio.currentTime = startTime;
    } else {
      this.refs.played.style.width = `${((audio.currentTime - startTime) / allTime) * 100}%`;
      this.refs.control.style.left = `${(audio.currentTime / allTime) * 100}%`;
      this.refs.played.style.left = `${(startTime / allTime) * 100}%`;
      if (startTime !== 0) {
        if (parseInt(this.refs.control.style.left) < parseInt(this.refs.cutStart.style.left)) {
          audio.currentTime = startTime;
          this.refs.played.style.width = '0%';
        }
      }
      if (endTime !== 0) {
        if (parseInt(this.refs.control.style.left) >= parseInt(this.refs.cutEnd.style.left)) {
          audio.currentTime = startTime;
          this.refs.played.style.width = '0%';
        }
      }
    }
    const totalTime = this.transTime(allTime);
    const playTime = this.transTime(audio.currentTime);
    changeTime(`${playTime}/${totalTime}`);
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
      formatTime += s[i].length === 1 ? (`0${s[i]}`) : s[i];
      formatTime += ':';
    }
    formatTime += s[i].length === 1 ? (`0${s[i]}`) : s[i];
    return formatTime;
  }
  render() {
    const { allState, state } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    const url = entities[music].m_url;
    return (
      <div className="musicName">
        <div className="img_button">
          { this.state.isPlay ?
            <img
              src={icon_play}
              onClick={this.onChangeState}
              className="musicName_img"
              alt=""
            />
          : <img
            src={icon_pause}
            onClick={this.onChangeState}
            className="musicName_img"
            alt=""
          /> }
        </div>
        <div
          className="player"
          ref="playcontainer"
          onTouchEnd={this.onTouchControlEnd}
        >
          <div className="slider">
            <div className="processor" ref="played" />
            <div
              className="controller"
              ref="control"
              onTouchMove={this.onTouchControlMove}
            />
            <img src={cut_start} ref="cutStart" className={this.onShowCutStart()} alt="" />
            <img src={cut_end} ref="cutEnd" className={this.onShowCutEnd()} alt="" />
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
