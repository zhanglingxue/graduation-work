import React from 'react';
import '../music.css';

const iconMark = require('../../images/select_music.png');

export default class MyMsicList extends React.Component {
  state = {
  };
  onShowContent = idx => {
    const { allState } = this.props;
    if (allState.radio) {
      if (allState.radioArray.length !== 0) {
        if (idx !== allState.radioArray[0]) {
          return (
            <img src={iconMark} className="img_opac" />
          );
        }
        return (
          <img src={iconMark} className="img_opac_show" />
        );
      }
      return (
        <img src={iconMark} className="img_opac" />
      );
    } else if (allState.checkbox) {
      const index = allState.checkArray.indexOf(idx);
      if (index === -1) {
        return (
          <span className="chance_dot" />
        );
      }
      return (
        <span className="chance_dot chance_dot_show">{index + 1}</span>
      );
    }
  }
  onShowContentRandom = () => {
    const { allState } = this.props;
    if (allState.radio && allState.random) {
      return (
        <img src={iconMark} className="img_opac_show" />
      );
    }
  }
  showRandomMusic = () => {
    const { allState, onChangeRandom } = this.props;
    if (allState.radio) {
      return (
        <div className="myMusic_list" onClick={onChangeRandom}>
          <div className="selectStyle">
            {this.onShowContentRandom()}
          </div>
          <p>随机音乐</p>
        </div>
      );
    } else if (!allState.radio && allState.checkbox) {
      return null;
    }
  }
  render() {
    const { state, onChanceListItem } = this.props;
    const my_music = state.myMusicReducer;
    const recomment = state.recommendReducer;
    const entities = this.props.state.entities;
    return (
      <div>
        <div className="show_list">
          <h2 className="my_music_list">我的音乐</h2>
          <p className="bottle">瓶子</p>
        </div>
        {
          my_music.map(idx => (
            <div className="myMusic_list" onClick={onChanceListItem.bind(this, idx)}>
              <div className="selectStyle">
                {this.onShowContent(idx)}
              </div>
              <p>{entities[idx].name}</p>
            </div>
          ))
        }
        <div className="show_list">
          <h2>推荐音乐</h2>
        </div>
        {
          this.showRandomMusic()
        }
        {
          recomment.map(item => (
            <div className="myMusic_list" onClick={onChanceListItem.bind(this, item)}>
              <div className="selectStyle">
                {this.onShowContent(item)}
              </div>
              <p>{entities[item].name}</p>
            </div>
          ))
        }
      </div>
    );
  }
}
