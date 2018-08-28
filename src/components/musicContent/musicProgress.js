import React from 'react';
import AudioView from './audioView';
import '../music.css';

export default class MusicProgress extends React.Component {
  state = {
    Audio: ''
  }
  onChangeTime = value => {
    this.refs.time.innerHTML = value;
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
    return (
      <div>
        <div className="backgroundLyaer" onClick={onCloseDialog} />
        {
          allState.buttonName === '' ?
            <div className="progressBox" /> :
            <div className="progressBox showBox">
              <div className="closeBox">
                <span onClick={onCloseDialog}>关闭</span>
              </div>
              <div className="musicName">{entities[music].name}</div>
              <div className="musicName" ref="time">/</div>
              <AudioView
                allState={allState}
                state={state}
                changeTime={this.onChangeTime}
                callBack={this.showAudioContent}
              />
            </div>
        }
      </div>
    );
  }
}
