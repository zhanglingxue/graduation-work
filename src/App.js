import React from 'react';
import GraduationWork from './containers/GraduationWork';
import './containers/GraduationWork.css';

export default class App extends React.PureComponent {
  state = {}
  render() {
    return (
      <div>
        <GraduationWork />
        <div className="props_children">
          {this.props.children}
        </div>
      </div>
    );
  }
}
