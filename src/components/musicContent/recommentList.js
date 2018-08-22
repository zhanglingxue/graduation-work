import React from 'react';
import '../music.css';

const iconMark = require('../../images/select_music.png');

export default class RecommentList extends React.Component {
  state = {

  };
  onShowContent = () => {
    const { radio, checkbox } = this.props;
    if (radio && !checkbox) {
      return (
        <img src={iconMark} className="img_opac" />
      );
    } else if (!radio && checkbox) {
      return (
        <span className="chance_dot"></span>
      );
    }
  }
  showRandomMusic = () => {
    const { radio, checkbox } = this.props;
    if (radio && !checkbox) {
      return (
        <div className="myMusic_list">
          <div className="selectStyle">
            {this.onShowContent()}
          </div>
          <p>随机音乐</p>
        </div>
      );
    } else if (!radio && checkbox) {
      return null;
    }
  }
  render() {
    const { state } = this.props;
    const recomment = state.recommendReducer;
    const entities = this.props.state.entities;
    return (
      <div>
        <div className="show_list">
          <h2>推荐音乐</h2>
        </div>
        {
          this.showRandomMusic()
        }
        {
          recomment.map(item => (
            <div className="myMusic_list">
              <div className="selectStyle">
                {this.onShowContent()}
              </div>
              <p>{entities[item].name}</p>
            </div>
          ))
        }
      </div>
    );
  }
}
