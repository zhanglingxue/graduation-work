import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png');
const mark_start = require('../../images/button_cut_music_start.png');
const mark_end = require('../../images/button_cut_music_finish.png');
const mark_start_gray = require('../../images/button_cut_music_start_gray.png');
const mark_end_gray = require('../../images/button_cut_music_finish_gray.png');
const clear_gray = require('../../images/button_cut_music_clear_gray.png');
const clear = require('../../images/button_cut_music_clear.png');
const cut_start = require('../../images/cut_music_start.png');
const cut_end = require('../../images/cut_music_finish.png');

export default class Fragment extends React.Component {
  state = {
    isPlay: false,
    startTime: 0,
    endTime: 0
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
  onChanceFragment = () => {
    const { onCloseDialog } = this.props;
    onCloseDialog();
  }
  onMarkPointStart = () => {
    const { state, allState } = this.props;
    const audio = this.refs.audio;
    const curr = audio.currentTime / audio.duration;
    this.setState({
      startTime: curr
    });
    if (curr !== 0) {
      state.graduactions.fetchMarkStart(audio.currentTime, allState.array[0]);
      // this.refs.played.style.left = `${curr * 260}px`;
      // this.refs.cutStart.style.left = `${curr * 260}px`;
    }
  }
  onClearMark = () => {
    const audio = this.refs.audio;
  }
  onMarkPointEnd = () => {
    const audio = this.refs.audio;
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
      this.refs.cutStart.style.left = `${curr * 260}px`;
    }
    if (endTime !== 0) {
      const curr = endTime / audio.duration;
      this.refs.cutEnd.style.left = `${curr * 260}px`;
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
      <div className="backgroundLyaer">
        {
          allState.buttonName === '' ?
            <div className="fragmentBox" /> :
            <div className="fragmentBox showFragment">
              <div className="mark">
                <div>
                  {
                    entities[music].bmt === 0 ?
                      <img
                        src={mark_start}
                        onClick={this.onMarkPointStart}
                      /> :
                      <img src={mark_start_gray} />
                  }
                  <p>标记起点</p>
                </div>
                <div>
                  {
                    entities[music].bmt === 0 && entities[music].emt === 0 ?
                      <img
                        src={clear_gray}
                        onClick={this.onClearMark}
                      /> :
                      <img
                        src={clear}
                        onClick={this.onClearMark}
                      />
                  }
                  <p>清除</p>
                </div>
                <div>
                  {
                    entities[music].emt === 0 ?
                      <img
                        src={mark_end}
                        onClick={this.onMarkPointEnd}
                      /> :
                      <img src={mark_end_gray} />
                  }
                  <p>标记终点</p>
                </div>
              </div>
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
                      ref="played"
                    />
                    <div
                      className="controller"
                      ref="control"
                      onTouchStart={this.onTouchControlStart}
                    />
                    <img
                      src={cut_start}
                      ref="cutStart"
                      className={this.onShowClassName()}
                    />
                    <img
                      src={cut_end}
                      ref="cutEnd"
                      className={this.onShowClassNameEnd()}
                    />
                  </div>
                </div>
                <div className="musicTime" ref="time">/</div>
                <div
                  className="completeChancefeagment"
                  onClick={this.onChanceFragment}
                >
                  完成
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
