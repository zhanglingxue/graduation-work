import React from 'react';
import MusicContent from '../musicContent/musicContent';
import '../../components/music.css';

export default class MyMusic extends React.Component {
  state = {
    radio: true,
    checkbox: false,
    checkArray: [],
    radioArray: [],
    recomCheck: [], // 将推荐音乐med作为判断条件，划分button不同状态
    random: true, // 默认单选页面选中随机音乐
    chanceOver: false
  };
  onSelectRadio = () => {
    const { state } = this.props;
    if (this.state.checkArray.length !== 0) {
      const array = this.state.checkArray.slice();
      const newArray = [];
      newArray.push(array[0]);
      if (state.entities[array[0]].med === undefined) {
        this.setState({
          recomCheck: newArray
        });
      } else {
        this.setState({
          recomCheck: []
        });
      }
      this.setState({
        radio: true,
        checkbox: false,
        radioArray: newArray,
        random: false
      });
    } else {
      this.setState({
        radio: true,
        checkbox: false,
        radioArray: [],
        recomCheck: [],
        random: true
      });
    }
  }
  onSelectCheck = () => {
    const { state } = this.props;
    const array = this.state.radioArray.slice();
    if (array.length !== 0) {
      if (state.entities[array[0]].med === undefined) {
        this.setState({
          recomCheck: array
        });
      }
    }
    this.setState({
      checkbox: true,
      radio: false,
      checkArray: array
    });
  }
  onShowRadioClassName = () => {
    if (this.state.radio) {
      return 'radio box_back';
    }
    return 'radio';
  }
  onShowCheckClassName = () => {
    if (this.state.checkbox) {
      return 'radio box_back';
    }
    return 'radio';
  }
  handleChanceListItem = idx => {
    const { state } = this.props;
    if (this.state.checkbox) {
      const newArray = this.state.checkArray.slice();
      const index = newArray.indexOf(idx);
      if (newArray.length === 5 && index === -1) {
        this.setState({
          chanceOver: true
        });
      } else {
        this.setState({
          chanceOver: false
        });
      }
      if (index === -1) {
        if (newArray.length <= 4) {
          newArray.push(idx);
        }
      } else {
        newArray.splice(index, 1);
      }
      const arr = this.state.recomCheck.slice();
      if (state.entities[idx].med === undefined) {
        const i = this.state.recomCheck.indexOf(idx);
        if (i === -1) {
          arr.push(idx);
        } else {
          arr.splice(i, 1);
        }
        this.setState({
          recomCheck: arr
        });
      }
      this.setState({
        checkArray: newArray
      });
    } else if (this.state.radio) {
      const radioarray = [];
      const arr = [];
      radioarray.push(idx);
      if (state.entities[idx].med === undefined) {
        arr.push(idx);
        this.setState({
          recomCheck: arr,
          random: false
        });
      } else {
        this.setState({
          recomCheck: [],
          random: false
        });
      }
      this.setState({
        radioArray: radioarray
      });
    }
  }
  handleChangeRandom = () => {
    this.setState({
      random: true,
      radioArray: []
    });
  }
  showMaxReminder = () => {
    if (this.state.chanceOver) {
      setTimeout(() => {
        this.setState({
          chanceOver: false
        });
      }, 2000);
      return <div className="dialog_class">多选最多选择5首哦!</div>;
    }
    return null;
  }
  render() {
    const { state } = this.props;
    return (
      <div>
        <div className="chance_button">
          <span className="select_point" onClick={this.onSelectRadio}>
            <span className={this.onShowRadioClassName()} />
            <p>单选</p>
          </span>
          <span className="select_point" onClick={this.onSelectCheck}>
            <span className={this.onShowCheckClassName()} />
            <p>多选</p>
          </span>
        </div>
        <MusicContent
          allState={this.state}
          state={state}
          onChanceListItem={this.handleChanceListItem}
          onChangeRandom={this.handleChangeRandom}
        />
        {this.showMaxReminder()}
      </div>
    );
  }
}

