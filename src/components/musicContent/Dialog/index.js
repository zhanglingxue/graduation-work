import React from 'react';
import DialogView from './DialogView';
import '../../music.css';

export default class Dialog extends React.Component {
  onShowDialogContent = () => {
    const { allState, state } = this.props;
    if (allState.buttonName === '删除') {
      if (allState.radio) {
        this.handleDeleteOneMusic(allState, state);
      } else this.handleDeleteMoreMusic(allState);
    }
  }
  onDeleteMusicClick = () => {
    const { allState, state, onSureDelete } = this.props;
    state.graduactions.fetchDeleteMusic(allState.array);
    onSureDelete();
  }

  handleDeleteMoreMusic = allState => {
    this.state = {
      value: `确定删除这${allState.array.length}首音乐吗？`,
      onCancel: '取消',
      onOk: '确定'
    };
  }
  handleDeleteOneMusic = (allState, state) => {
    this.state = {
      value: `确定删除${state.entities[allState.array[0]].name}这首音乐吗？`,
      onCancel: '取消',
      onOk: '确定'
    };
  }
  handleRename = () => {}
  render() {
    const { onCloseDialog } = this.props;
    return (
      <div>
        {this.onShowDialogContent()}
        <DialogView state={this.state} onCancel={onCloseDialog} onDelete={this.onDeleteMusicClick} />
      </div>
    );
  }
}
