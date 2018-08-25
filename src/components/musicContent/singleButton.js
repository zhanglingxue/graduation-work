import React from 'react';
import '../music.css';

export default class SingleButton extends React.Component {
  state = {

  };

  render() {
    const { name, icon, className } = this.props;
    return (
      <div>
        <img src={icon} className="button_icon" />
        <div className={`button_style ${className}`}>{name}</div>
      </div>
    );
  }
}
