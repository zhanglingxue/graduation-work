import React from 'react';
import '../music.css';

const icon_play = require('../../images/btn_pause.png');
const icon_pause = require('../../images/btn_play.png')

export default class MusicProgress extends React.Component {
  state = {
    isPlay: true,
    allTime: 0,
    currentTime: 0
  };
  onChangeState = () => {
    const audio = document.getElementById('audio');
    audio.pause();
    this.setState({
      isPlay: !this.state.isPlay
    });
  }
  controlAudio = () => {
    const audio = document.getElementById('audio');
    if (this.state.isPlay) {
      audio.play();
    }
  }
  render() {
    const { allState, state, onCloseDialog } = this.props;
    const entities = state.entities;
    const music = allState.array[0];
    const url = entities[music].m_url;
    const audio = document.getElementById('audio');
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
              <div className="musicName">00:00/05:13</div>
              <div className="musicName">
                {
                  this.state.isPlay ?
                    <div>
                      <img src={icon_play} onClick={this.onChangeState} />
                      <div className="player">
                        <div className="slider">
                          <div className="processor"></div>
                          <div className="controller"></div>
                        </div>
                      </div>
                    </div> :
                    <div>
                      <img src={icon_pause} onClick={this.onChangeState} />
                      <div className="player">
                        <div className="slider">
                          <div className="processor"></div>
                          <div className="controller"></div>
                        </div>
                      </div>
                    </div>
                }
                <audio
                  id="audio"
                  src={url}
                  preload="auto"
                  onCanPlay={() => this.controlAudio()}
                />
              </div>
            </div>
        }
      </div>
    );
  }
}
