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
  changeTime = value => {
    this.refs.time.innerHTML = value;
  }
  showAudioContent = audio => {
    this.setState({
      Audio: audio
    });
  }
  render() {
    const { allState, state } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    const startTime = (entities[music].bmt / 60).toFixed(2);
    const endTime = (entities[music].emt / 60).toFixed(2);
    const allTime = (entities[music].du / 60).toFixed(2);
    const endArray = endTime.split('.');
    const allArray = allTime.split('.');
    const currArray = startTime.split('.');
    return (
      <div className="backgroundLyaer">
        {
          allState.buttonName === '' ?
            <div className="fragmentBox" /> :
            <div className="fragmentBox showFragment">
              <div className="mark">
                <div>
                  { entities[music].bmt === 0 ?
                    <img src={mark_start} onClick={this.onMarkPointStart} /> :
                    <img src={mark_start_gray} /> }
                  <p>标记起点</p>
                  <p>{`0${currArray[0]}:${currArray[1]}`}</p>
                </div>
                <div>
                  { entities[music].bmt === 0 && entities[music].emt === 0 ?
                    <img src={clear_gray} onClick={this.onClearMark} /> :
                    <img src={clear} onClick={this.onClearMark} /> }
                  <p>清除</p>
                </div>
                <div>
                  { entities[music].emt === 0 ?
                    <img src={mark_end} onClick={this.onMarkPointEnd} /> :
                    <img src={mark_end_gray} /> }
                  <p>标记终点</p>
                  <p>
                    {
                      entities[music].emt === 0 ?
                      `0${allArray[0]}:${allArray[1]}` :
                      `0${endArray[0]}:${endArray[1]}`
                    }
                  </p>
                </div>
              </div>
              <AudioView
                allState={allState}
                state={state}
                onChangeTime={this.changeTime}
                callBack={this.showAudioContent}
              />
              <div className="musicTime" ref="time" />
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
