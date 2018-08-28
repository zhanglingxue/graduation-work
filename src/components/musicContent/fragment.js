import React from 'react';
import AudioView from './audioView';
import '../music.css';

const mark_start = require('../../images/button_cut_music_start.png');
const mark_end = require('../../images/button_cut_music_finish.png');
const mark_start_gray = require('../../images/button_cut_music_start_gray.png');
const mark_end_gray = require('../../images/button_cut_music_finish_gray.png');
const clear_gray = require('../../images/button_cut_music_clear_gray.png');
const clear = require('../../images/button_cut_music_clear.png');

export default class Fragment extends React.Component {
  state = {
    mark_first: false,
    Audio: ''
  };
  onChanceFragment = () => {
    const { onCloseDialog } = this.props;
    onCloseDialog();
  }
  onMarkPointStart = () => {
    const { state, allState } = this.props;
    const audio = this.state.Audio;
    state.graduactions.fetchMarkStart(audio.currentTime, allState.array[0]);
  }
  onClearMark = () => {
    const { state, allState } = this.props;
    state.graduactions.fetchMarkClear(allState.array[0]);
  }
  onMarkPointEnd = () => {
    const { state, allState } = this.props;
    const audio = this.state.Audio;
    if (state.entities[allState.array[0]].bmt !== 0) {
      state.graduactions.fetchMarkEnd(audio.currentTime, allState.array[0]);
    } else {
      setTimeout(() => {
        this.setState({
          mark_first: false
        });
      }, 1000);
      this.setState({
        mark_first: true
      });
    }
  }
  onMarkleftPoint = () => {
    if (this.state.mark_first) {
      return 'mark_start_first';
    }
    return 'cut_none';
  }
  onChangeTime = value => {
    this.refs.time.innerHTML = value;
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
  showAudioContent = audio => {
    this.setState({
      Audio: audio
    });
  }
  render() {
    const { allState, state, onCloseDialog } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    this.startTime = this.transTime(entities[music].bmt);
    this.endTime = this.transTime(entities[music].emt);
    this.allTime = this.transTime(entities[music].du);
    return (
      <div>
        <div className="backgroundLyaer" onClick={onCloseDialog} />
        {
        allState.buttonName === '' ?
          <div className="fragmentBox" /> :
          <div className="fragmentBox showFragment">
            <div className="mark">
              <div>
                { entities[music].bmt === 0 ?
                  <img src={mark_start} onClick={this.onMarkPointStart} alt="" /> :
                  <img src={mark_start_gray} alt="" /> }
                <p>标记起点</p>
                <p>{this.startTime}</p>
              </div>
              <div>
                { entities[music].bmt === 0 && entities[music].emt === 0 ?
                  <img src={clear_gray} onClick={this.onClearMark} alt="" /> :
                  <img src={clear} onClick={this.onClearMark} alt="" /> }
                <p>清除</p>
              </div>
              <div>
                { entities[music].emt === 0 ?
                  <img src={mark_end} onClick={this.onMarkPointEnd} alt="" /> :
                  <img src={mark_end_gray} alt="" /> }
                <p>标记终点</p>
                <p>
                  {
                    entities[music].emt === 0 ? `${this.allTime}` : `${this.endTime}`
                  }
                </p>
              </div>
            </div>
            <AudioView
              allState={allState}
              state={state}
              changeTime={this.onChangeTime}
              callBack={this.showAudioContent}
            />
            <div className="musicTime" ref="time">/</div>
            <div className="completeChancefeagment" onClick={this.onChanceFragment}>
              完成
            </div>
          </div>
        }
        <div className={this.onMarkleftPoint()}>请先标记起点哦!</div>
      </div>

    );
  }
}
