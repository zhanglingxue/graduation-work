import React from 'react';
import './containers/GraduationWork.css';

export default class App extends React.PureComponent {
  state = {}
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
