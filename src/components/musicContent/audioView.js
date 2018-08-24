import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png');
const cut_start = require('../../images/cut_music_start.png');
const cut_end = require('../../images/cut_music_finish.png');

export default class Audio extends React.Component {
  state = {
    isPlay: false
  };
  onChangeState = () => {
    const { state, allState } = this.props;
    const startTime = state.entities[allState.array[0]].bmt;
    const audio = this.refs.audio;
    if (audio !== null) {
      if (startTime === 0) {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      } else if (audio.paused) {
        audio.currentTime = startTime;
        audio.play();
      } else {
        audio.pause();
      }
    }
    this.setState({
      isPlay: !this.state.isPlay
    });
  }
  onTouchControlStart = e => {
    this.startX = e.touches[0].clientX;
    const time = (this.startX - 65) / 260;
    this.refs.played.style.width = `${time * 100}%`;
    this.refs.control.style.left = `${time * 100}%`;
  }
  onTouchControlEnd = e => {
    this.endX = e.changedTouches[0].clientX;
    const audio = this.refs.audio;
    const time = (this.endX - 65) / 260;
    this.refs.played.style.width = `${time * 100}%`;
    this.refs.control.style.left = `${time * 100}%`;
    audio.currentTime = time * audio.duration;
  }
  onTouchControlMove = e => {
    this.moveX = e.changedTouches[0].clientX;
    const time = (this.moveX - 65) / 260;
    this.refs.played.style.width = `${time * 100}%`;
    this.refs.control.style.left = `${time * 100}%`;
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
    const { state, allState } = this.props;
    const startTime = state.entities[allState.array[0]].bmt;
    const endTime = state.entities[allState.array[0]].emt;
    const audio = this.refs.audio;
    const time = audio.currentTime / audio.duration;
    if (startTime === 0) {
      this.refs.played.style.width = `${time * 100}%`;
    } else {
      const difference = audio.currentTime - startTime;
      const curr = startTime / audio.duration;
      this.refs.played.style.width = `${(difference / audio.duration) * 100}%`;
      this.refs.cutStart.style.left = `${curr * 100}%`;
      if (this.refs.control.style.left < this.refs.cutStart.style.left) {
        audio.currentTime = startTime;
        audio.play();
      }
    }
    if (endTime !== 0) {
      const curr = endTime / audio.duration;
      this.refs.cutEnd.style.left = `${curr * 100}%`;
      if (this.refs.control.style.left >= this.refs.cutEnd.style.left) {
        audio.currentTime = startTime;
        audio.play();
      }
    }
    this.refs.control.style.left = `${time * 100}%`;
    this.refs.played.style.left = `${(startTime / audio.duration) * 100}%`;
    const allTime = (audio.duration / 60).toFixed(2);
    const currTime = ((time * audio.duration) / 60).toFixed(2);
    const allArray = allTime.split('.');
    const currArray = currTime.split('.');
    this.refs.time.innerHTML = `0${currArray[0]}:${currArray[1]} / 0${allArray[0]}:${allArray[1]}`;
  }
  render() {
    const { allState, state } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    const url = entities[music].m_url;
    return (
      <div className="musicName">
        { this.state.isPlay ? <img src={icon_play} onClick={this.onChangeState} />
          : <img src={icon_pause} onClick={this.onChangeState} /> }
        <div
          className="player"
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
          preload="auto"
          loop
          onTimeUpdate={this.controls}
        />
      </div>
    );
  }
}
