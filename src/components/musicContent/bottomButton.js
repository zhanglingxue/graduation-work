import React from 'react';
import ButtonContent from './buttonContent';
import '../music.css';

export default class BottomButton extends React.Component {
  state = {
    data: [{
      icon_red: require('../../images/button_new_play.png'),
      icon_gray: require('../../images/button_new_play_gray.png'),
      name: '播放'
    }, {
      icon_red: require('../../images/button_rename_red.png'),
      icon_gray: require('../../images/button_rename_gray.png'),
      name: '重命名'
    }, {
      icon_red: require('../../images/button_cut.png'),
      icon_gray: require('../../images/button_cut_gray.png'),
      name: '选择片段'
    }, {
      icon_red: require('../../images/button_share.png'),
      icon_gray: require('../../images/button_share_gray.png'),
      name: '送给朋友'
    }, {
      icon_red: require('../../images/button_delete.png'),
      icon_gray: require('../../images/button_delete_gray.png'),
      name: '删除'
    }]
  };
  render() {
    const { allState, state, onshowTipBox } = this.props;
    return (
      <div className="bottom-button">
        {
          this.state.data.map(item => (
            <div className="button_div" onClick={onshowTipBox.bind(this, item.name)}>
              <ButtonContent
                item={item}
                allState={allState}
                state={state}
              />
            </div>
          ))
        }
      </div>
    );
  }
}
