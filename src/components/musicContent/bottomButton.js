import React from 'react';
import ButtonContent from './buttonContent';
import DialogView from './Dialog';
import MusicProgress from './musicProgress';
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
  onShowTips = () => {
    const {
      allState,
      state,
      onCloseDialog,
      onSureDelete
    } = this.props;
    if (allState.showDialog) {
      if (allState.checkbox) {
        if (allState.buttonName === '删除') {
          if (allState.array.length === 0) {
            return <div className="dialog_class">您还没有选择音乐哦!</div>;
          }
        }
        return <div className="dialog_class">[多选]状态下不能{allState.buttonName}哦!</div>;
      }
      if (allState.recomCheck.length === 0
        && allState.array.length !== 0) {
        if (state.entities[allState.array[0]].plp === 7
          && allState.buttonName === '重命名') {
          return <div className="dialog_class">漂流瓶保存的音乐不能重命名哦!</div>;
        }
      } else if (allState.array.length === 0) {
        return <div className="dialog_class">你还没有选择音乐哦!</div>;
      } else if (allState.recomCheck.length !== 0
      && allState.buttonName !== '播放') {
        return <div className="dialog_class">推荐音乐不能{allState.buttonName}哦!</div>;
      }
      if (allState.array.length !== 0) {
        if (allState.buttonName === '播放' || allState.buttonName === '选择片段') {
          return (<MusicProgress
            allState={allState}
            state={state}
            onCloseDialog={onCloseDialog}
          />);
        } else if (allState.buttonName === '送给朋友') {
          window.alert(`送出${state.entities[allState.array[0]].name}音乐`);
          onCloseDialog();
          return null;
        }
      }
      return (<DialogView
        allState={allState}
        state={state}
        onCloseDialog={onCloseDialog}
        onSureDelete={onSureDelete}
      />);
    }
    return null;
  }
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
        {this.onShowTips()}
      </div>
    );
  }
}
