import React from 'react';
import '../../music.css';

export default class DialogView extends React.Component {
  state = {
  };
  render() {
    const { state, onCancel, onDelete } = this.props;
    return (
      <div>
        <div className="backgroundLyaer" onClick={state.onClose} />
        <div className="delete_dialog">
          <div className="delete_content">
            <span>
              {state.value}
            </span>
          </div>
          <div className="dialog_chance">
            <span className="cancel" onClick={onCancel}>{state.onCancel}</span>
            <span className="sure" onClick={onDelete}>{state.onOk}</span>
          </div>
        </div>
      </div>
    );
  }
}

