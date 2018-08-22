import React from 'react';
import '../music.css';

const new_play = require('../../images/button_new_play.png');
const rename_red = require('../../images/button_rename_red.png');
const button_cut = require('../../images/button_cut.png');
const button_share = require('../../images/button_share.png');
const button_delete = require('../../images/button_delete.png');

const new_play1 = require('../../images/button_new_play_gray.png');
const rename_red1 = require('../../images/button_rename_gray.png');
const button_cut1 = require('../../images/button_cut_gray.png');
const button_share1 = require('../../images/button_share_gray.png');
const button_delete1 = require('../../images/button_delete_gray.png');

export default class BottomButton extends React.Component {
  state = {
    // data: [{
    //   word: '播放',
    //   icon: new_play,
    //   icon_gray: new_play1
    // }, {
    //   word: '重命名',
    //   icon: rename_red,
    //   icon_gray: rename_red1
    // }, {
    //   word: '选择片段',
    //   icon: button_cut,
    //   icon_gray: button_cut1
    // }, {
    //   word: '送给朋友',
    //   icon: button_share,
    //   icon_gray: button_share1
    // }, {
    //   word: '删除',
    //   icon: button_delete,
    //   icon_gray: button_delete1
    // }],
    showDialog: false,
    buttonName: ''
  };
  onShowTips = () => {
    const { allState } = this.props;
    if (allState.checkbox) {
      if (this.state.showDialog) {
        setTimeout(() => {
          this.setState({
            showDialog: false
          });
        }, 2000);
        if (this.state.buttonName !== '删除') {
          return (
            <div className="dialog_class">[多选]状态下不能{this.state.buttonName}哦!</div>
          );
        }
        return (
          <div className="dialog_class">您还没有选择音乐哦!</div>
        );
      }
    }
  }
  onshowButtonState = name => {
    const { allState } = this.props;
    if (allState.checkbox) {
      this.setState({
        showDialog: true,
        buttonName: name
      });
    }
  }
  onChangeClassName = () => {
    const { allState } = this.props;
    if (allState.checkbox) {
      return 'button_style active';
    }
    return 'button_style';
  }
  // showImgBackground = item => {
  //   const { allState } = this.props;
  //   if (allState.checkbox) {
  //     return <img src={item.icon_gray} />;
  //   }
  //   return <img src={item.icon} />;
  // }
  onPlayClick = () => {
    this.setState({
      showDialog: true,
      buttonName: '播放'
    });
  }
  onRenameClick = () => {
    this.setState({
      showDialog: true,
      buttonName: '重命名'
    });
  }
  onCutClick = () => {
    this.setState({
      showDialog: true,
      buttonName: '选择片段'
    });
  }
  onShareClick = () => {
    this.setState({
      showDialog: true,
      buttonName: '送给朋友'
    });
  }
  onDeleteClick = () => {
    this.setState({
      showDialog: true,
      buttonName: '删除'
    });
  }
  render() {
    return (
      <div className="bottom-button">
        {/* {
          this.state.data.map(item => (
            <div className="button_div" onClick={this.onshowButtonState.bind(this, item.word)}>
              <div className="button_style">
                {
                  this.showImgBackground(item)
                }
              </div>
              <div className={this.onChangeClassName()}>{item.word}</div>
            </div>
          ))
        } */}
        <div className="button_div" onClick={this.onPlayClick}>
          <div className="button_style">
            <img src={new_play} />
          </div>
          <div className={this.onChangeClassName()}>播放</div>
        </div>
        <div className="button_div" onClick={this.onRenameClick}>
          <div className="button_style">
            <img src={rename_red} />
          </div>
          <div className={this.onChangeClassName()}>重命名</div>
        </div>
        <div className="button_div" onClick={this.onCutClick}>
          <div className="button_style">
            <img src={button_cut} />
          </div>
          <div className={this.onChangeClassName()}>选择片段</div>
        </div>
        <div className="button_div" onClick={this.onShareClick}>
          <div className="button_style">
            <img src={button_share} />
          </div>
          <div className={this.onChangeClassName()}>送给朋友</div>
        </div>
        <div className="button_div" onClick={this.onDeleteClick}>
          <div className="button_style">
            <img src={button_delete} />
          </div>
          <div className={this.onChangeClassName()}>删除</div>
        </div>
        {
          this.onShowTips()
        }
      </div>
    );
  }
}
