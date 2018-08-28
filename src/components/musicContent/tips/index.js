import React from 'react';
import Dialog from '../Dialog';
import MusicProgress from './musicProgress';
import Fragment from './fragment';
import ReName from './reName';
import '../../music.css';

export default class Test extends React.Component {
  state = {
  };
  onShowTips = () => {
    const {
      state,
      allState,
      onCloseDialog,
      onSureDelete,
      buttonName
    } = this.props;
    if (allState.showNotification) {
      if (allState.checkbox) {
        if (buttonName === '删除') {
          if (allState.array.length === 0) {
            return <div className="dialog_class">您还没有选择音乐哦!</div>;
          }
        } else if (allState.buttonName !== '删除') {
          return <div className="dialog_class">[多选]状态下不能{allState.buttonName}哦!</div>;
        }
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
    } else if (allState.showDialog) {
      if (allState.array.length !== 0) {
        if (allState.buttonName === '播放') {
          return (<MusicProgress
            allState={allState}
            state={state}
            onCloseDialog={onCloseDialog}
          />);
        } else if (allState.buttonName === '选择片段') {
          return (<Fragment
            allState={allState}
            state={state}
            onCloseDialog={onCloseDialog}
          />);
        } else if (allState.buttonName === '送给朋友') {
          window.alert(`送出${state.entities[allState.array[0]].name}音乐`);
          onCloseDialog();
          return null;
        }
        if (allState.buttonName === '删除' && allState.array.length !== 0) {
          return (<Dialog
            allState={allState}
            state={state}
            onCloseDialog={onCloseDialog}
            onSureDelete={onSureDelete}
          />);
        }
        return (<ReName
          allState={allState}
          state={state}
          onCloseDialog={onCloseDialog}
          onSureDelete={onSureDelete}
        />);
      }
    }
    return null;
  }
  render() {
    return (
      <div>
        {this.onShowTips()}
      </div>
    );
  }
}
