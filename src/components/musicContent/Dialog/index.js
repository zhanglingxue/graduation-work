// import React from 'react';
// import DialogView from './DialogView';
// import '../../music.css';

// export default class Dialog extends React.Component {
//   state = {
//     value: '',
//     onCancel: false,
//     onOk: false
//   };
//   onShowDialogContent = () => {
//     const { allState, state } = this.props;
//     if (allState.buttonName === '删除') {
//       if (allState.radio) {
//         this.handleDeleteOneMusic(allState, state);
//       } else this.handleDeleteMoreMusic(allState);
//     }
//   }
//   onDeleteMusicClick = () => {
//     const { allState, state, onSureDelete } = this.props;
//     state.graduactions.fetchDeleteMusic(allState.array);
//     onSureDelete();
//   }

//   handleDeleteMoreMusic = allState => {
//     this.setState({
//       value: `确定删除${allState.array.length}音乐吗？`,
//       onCancel: '取消',
//       onOk: '确定'
//     });
//   }
//   handleDeleteOneMusic = (allState, state) => {
//     this.setState({
//       value: `确定删除这${state.entities[allState.array[0]].name}首音乐吗？`,
//       onCancel: '取消',
//       onOk: '确定'
//     });
//   }
//   handleRename = () => {}
//   render() {
//     const { onCloseDialog } = this.props;
//     return (
//       <div>
//         {this.onShowDialogContent()}
//         <DialogView state={this.state} onCancel={onCloseDialog} onDelete={this.onDeleteMusicClick} />
//       </div>
//     );
//   }
// }

import React from 'react';
import '../../music.css';

export default class DialogView extends React.Component {
  state = {
    input_value: ''
  };
  onChangeInputValue = e => {
    this.setState({
      input_value: e.target.value
    });
  }
  onShowDialogContent = () => {
    const { allState, state } = this.props;
    if (allState.buttonName === '删除') {
      return allState.radio ?
        <span>
          确定删除{state.entities[allState.array[0]].name}这首音乐吗?
        </span> :
        <span>
          确定删除这{allState.array.length}首音乐吗?
        </span>;
    } else if (allState.buttonName === '重命名') {
      return (
        <span>
          <span>请输入新的音乐名称</span>
          <span>
            <input
              type="text"
              className="music_input"
              placeholder={state.entities[allState.array[0]].name}
              onChange={this.onChangeInputValue}
            />
          </span>
        </span>
      );
    }
  }
  onDeleteMusicClick = () => {
    const { allState, state, onSureDelete } = this.props;
    state.graduactions.fetchDeleteMusic(allState.array);
    onSureDelete();
  }
  onSubmitMusicName = () => {
    const { allState, state, onCloseDialog } = this.props;
    const id = allState.array[0];
    state.graduactions.fetchSubmitMusicName(id, this.state.input_value);
    onCloseDialog();
  }
  render() {
    const { onCloseDialog, allState } = this.props;
    return (
      <div>
        <div className="backgroundLyaer" onClick={onCloseDialog} />
        <div className="delete_dialog">
          <div className="delete_content">
            {this.onShowDialogContent()}
          </div>
          <div className="dialog_chance">
            <span className="cancel" onClick={onCloseDialog}>取消</span>
            {
              allState.buttonName === '删除' ?
                <span onClick={this.onDeleteMusicClick}>确定</span> :
                <span onClick={this.onSubmitMusicName}>确定</span>
            }
          </div>
        </div>
      </div>
    );
  }
}
