import React from 'react';
import SingleButton from './singleButton';
import '../music.css';

export default class ButtonContent extends React.Component {
  state = {

  };
  showButtonContent = () => {
    const { item, allState, state } = this.props;
    switch (item.name) {
      case '播放': {
        if (allState.random || allState.checkbox) {
          return (<SingleButton name={item.name} icon={item.icon_gray} className="active" />);
        }
        return (<SingleButton name={item.name} icon={item.icon_red} className=" " />);
      }
      case '重命名': {
        const plp = allState.array[0];
        if (
          (allState.radio && (
            (allState.recomCheck.length === 0 &&
            allState.array.length !== 0 &&
            state.entities[plp].plp !== undefined) ||
            allState.random || allState.recomCheck.length !== 0)) ||
          (allState.checkbox)
        ) {
          return (<SingleButton name={item.name} icon={item.icon_gray} className="active" />);
        }
        return (<SingleButton name={item.name} icon={item.icon_red} className=" " />);
      }
      case '选择片段': {
        if (allState.random ||
            (allState.radio && allState.recomCheck.length !== 0) ||
            allState.checkbox
        ) {
          return (<SingleButton name={item.name} icon={item.icon_gray} className="active" />);
        }
        return (<SingleButton name={item.name} icon={item.icon_red} className=" " />);
      }
      case '送给朋友': {
        if (allState.random ||
            (allState.radio && allState.recomCheck.length !== 0) ||
            allState.checkbox
        ) {
          return (<SingleButton name={item.name} icon={item.icon_gray} className="active" />);
        }
        return (<SingleButton name={item.name} icon={item.icon_red} className=" " />);
      }
      case '删除': {
        if (
          (allState.radio && (allState.random || allState.recomCheck.length !== 0)) ||
          (allState.checkbox && (
            allState.array.length === 0 ||
            allState.recomCheck.length !== 0))
        ) {
          return (<SingleButton name={item.name} icon={item.icon_gray} className="active" />);
        }
        return (<SingleButton name={item.name} icon={item.icon_red} className=" " />);
      }
      default:
        return null;
    }
  }
  render() {
    return (
      <div>
        {this.showButtonContent()}
      </div>
    );
  }
}
