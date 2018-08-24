import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png');

export default class MusicProgress extends React.Component {
  state = {
    isPlay: false
  };
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
  controls = () => {
    const audio = this.refs.audio;
    const time = audio.currentTime / audio.duration;
    this.refs.played.style.width = `${time * 100}%`;
    this.refs.control.style.left = `${time * 100}%`;
    const allTime = (audio.duration / 60).toFixed(2);
    const currTime = ((time * audio.duration) / 60).toFixed(2);
    const allArray = allTime.split('.');
    const currArray = currTime.split('.');
    this.refs.time.innerHTML = `0${currArray[0]}:${currArray[1]} / 0${allArray[0]}:${allArray[1]}`;
  }
  render() {
    const { allState, state, onCloseDialog } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    const url = entities[music].m_url;
    return (
      <div className="backgroundLyaer">
        {
          allState.buttonName === '' ?
            <div className="progressBox" /> :
            <div className="progressBox showBox">
              <div className="closeBox">
                <span onClick={onCloseDialog}>关闭</span>
              </div>
              <div className="musicName">{entities[music].name}</div>
              <div className="musicName" ref="time">/</div>
              <div className="musicName">
                {
                  this.state.isPlay ?
                    <img src={icon_play} onClick={this.onChangeState} />
                    :
                    <img src={icon_pause} onClick={this.onChangeState} />
                }
                <div
                  className="player"
                  onTouchMove={this.onTouchControlMove}
                  onTouchEnd={this.onTouchControlEnd}
                >
                  <div className="slider">
                    <div
                      className="processor"
                      style={{ width: '0%' }}
                      ref="played"
                    />
                    <div
                      className="controller"
                      style={{ left: '0%' }}
                      ref="control"
                      onTouchStart={this.onTouchControlStart}
                    />
                  </div>
                </div>
                <audio
                  ref="audio"
                  src={url}
                  preload="auto"
                  hidden
                  loop
                  controls="controls"
                  onTimeUpdate={this.controls}
                />
              </div>
            </div>
        }
      </div>
    );
  }
}
