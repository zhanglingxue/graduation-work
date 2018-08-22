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
    } else return null;
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

  showButtonPlay = () => {
    const { allState } = this.props;
    if (allState.random || allState.checkbox) {
      return (
        <div>
          <img src={new_play1} className="button_icon" />
          <div className="button_style active">播放</div>
        </div>
      );
    }
    return (
      <div>
        <img src={new_play} className="button_icon" />
        <div className="button_style">播放</div>
      </div>
    );
  }
  showButtonRename = () => {
    const { allState, state } = this.props;
    if (allState.radio) {
      if (allState.recomCheck.length === 0
        && allState.radioArray.length !== 0
      ) {
        const plp = allState.radioArray[0];
        if (state.entities[plp].plp === undefined) {
          return (
            <div>
              <img src={rename_red1} className="button_icon" />
              <div className="button_style active">重命名</div>
            </div>
          );
        }
      } else if (allState.random || allState.recomCheck.length !== 0) {
        return (
          <div>
            <img src={rename_red1} className="button_icon" />
            <div className="button_style active">重命名</div>
          </div>
        );
      }
    } else if (allState.checkbox) {
      return (
        <div>
          <img src={rename_red1} className="button_icon" />
          <div className="button_style active">重命名</div>
        </div>
      );
    }
    return (
      <div>
        <img src={rename_red} className="button_icon" />
        <div className="button_style">重命名</div>
      </div>
    );
  }
  showButtonCut = () => {
    const { allState } = this.props;
    if (allState.random
      || (allState.radio && allState.recomCheck.length !== 0)
      || allState.checkbox
    ) {
      return (
        <div>
          <img src={button_cut1} className="button_icon" />
          <div className="button_style active">选择片段</div>
        </div>
      );
    }
    return (
      <div>
        <img src={button_cut} className="button_icon" />
        <div className="button_style">选择片段</div>
      </div>
    );
  }
  showButtonShare = () => {
    const { allState } = this.props;
    if (allState.random
      || (allState.radio && allState.recomCheck.length !== 0)
      || allState.checkbox
    ) {
      return (
        <div>
          <img src={button_share1} className="button_icon" />
          <div className="button_style active">送给朋友</div>
        </div>
      );
    }
    return (
      <div>
        <img src={button_share} className="button_icon" />
        <div className="button_style">送给朋友</div>
      </div>
    );
  }
  showButtonDelete = () => {
    const { allState } = this.props;
    if (allState.random
      || (allState.radio && allState.recomCheck.length !== 0)
      || (allState.checkbox && allState.checkArray.length === 0)
      || (allState.checkbox && allState.recomCheck.length !== 0)
    ) {
      return (
        <div>
          <img src={button_delete1} className="button_icon" />
          <div className="button_style active">删除</div>
        </div>
      );
    }
    return (
      <div>
        <img src={button_delete} className="button_icon" />
        <div className="button_style">删除</div>
      </div>
    );
  }
  render() {
    return (
      <div className="bottom-button">
        <div className="button_div" onClick={this.onPlayClick}>
          {this.showButtonPlay()}
        </div>
        <div className="button_div" onClick={this.onRenameClick}>
          {this.showButtonRename()}
        </div>
        <div className="button_div" onClick={this.onCutClick}>
          {this.showButtonCut()}
        </div>
        <div className="button_div" onClick={this.onShareClick}>
          {this.showButtonShare()}
        </div>
        <div className="button_div" onClick={this.onDeleteClick}>
          {this.showButtonDelete()}
        </div>
        {this.onShowTips()}
      </div>
    );
  }
}
