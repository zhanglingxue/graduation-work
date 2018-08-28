import React from 'react';
import '../music.css';

export default class TabPane extends React.Component {
  state = {
  };
  onMyMusicClick = () => {
    const { callback, keyValue } = this.props;
    callback(keyValue);
  }
  render() {
    const {
      state,
      name,
      keyValue,
      icon_red,
      icon_gray
    } = this.props;
    return (
      <span onClick={this.onMyMusicClick}>
        {
          state.tab === keyValue ?
            <div>
              <div className="tab_option tab_color">
                <img src={icon_red} alt="" />
                {name}
              </div>
              <div className="tab_bottom_red" />
            </div> :
            <div className="tab_option">
              <img src={icon_gray} alt="" />
              {name}
            </div>
        }
      </span>
    );
  }
}
