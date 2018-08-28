import React from 'react';
import '../../music.css';

export default class ReName extends React.Component {
  state = {
    input_value: ''
  };
  onChangeInputValue = e => {
    this.setState({
      input_value: e.target.value
    });
  }
  onSubmitMusicName = () => {
    const { allState, state, onCloseDialog } = this.props;
    const id = allState.array[0];
    if (this.state.input_value !== '') {
      state.graduactions.fetchSubmitMusicName(id, this.state.input_value);
    }
    onCloseDialog();
  }
  render() {
    const { onCloseDialog, allState, state } = this.props;
    return (
      <div>
        <div className="backgroundLyaer" />
        <div className="delete_dialog">
          <div className="delete_content">
            <span>
              <span className="inputNewName">请输入新的音乐名称</span>
              <span>
                <input
                  type="text"
                  className="music_input"
                  placeholder={state.entities[allState.array[0]].name}
                  onChange={this.onChangeInputValue}
                />
              </span>
            </span>
          </div>
          <div className="dialog_chance">
            <span className="cancel" onClick={onCloseDialog}>取消</span>
            <span className="sure" onClick={this.onSubmitMusicName}>确定</span>
          </div>
        </div>
      </div>
    );
  }
}
