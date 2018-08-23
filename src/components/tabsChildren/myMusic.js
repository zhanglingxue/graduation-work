import React from 'react';
import MusicContent from '../musicContent/musicContent';
import '../../components/music.css';

export default class MyMusic extends React.Component {
  state = {
    radio: true,
    checkbox: false,
    array: [], // 单选多选选中后id数组
    recomCheck: [], // 将推荐音乐med作为判断条件，划分button不同状态
    random: true, // 默认单选页面选中随机音乐
    chanceOver: false, // 多选状态下选第6首的状态为true
    showDialog: false, // 不同button状态下显示提示框状态
    buttonName: '' // 当前点击button名称
  };
  onSelectRadio = () => {
    const { state } = this.props;
    if (this.state.array.length !== 0) {
      const array = this.state.array.slice();
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
        array: newArray,
        random: false,
        showDialog: false
      });
    } else {
      this.setState({
        radio: true,
        checkbox: false,
        array: [],
        recomCheck: [],
        random: true,
        showDialog: false
      });
    }
  }
  onSelectCheck = () => {
    const { state } = this.props;
    const array = this.state.array.slice();
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
      array
    });
  }
  onShowRadioClassName = () => {
    if (this.state.radio) {
      return 'radio box_back';
    }
    return 'radio box_eliminate';
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
      const newArray = this.state.array.slice();
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
        array: newArray
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
        array: radioarray
      });
    }
  }
  handleChangeRandom = () => {
    this.setState({
      random: true,
      array: []
    });
  }
  showMaxReminder = () => {
    if (this.state.chanceOver) {
      setTimeout(() => {
        this.setState({
          chanceOver: false
        });
      }, 1000);
      return <div className="dialog_class">多选最多选择5首哦!</div>;
    }
    return null;
  }
  Timer = () => {
    setTimeout(() => {
      this.setState({
        showDialog: false,
        buttonName: ''
      });
    }, 1000);
  }
  handleShowTipBox = name => {
    const { state } = this.props;
    if (this.state.array.length === 0) {
      this.Timer();
    }
    if (this.state.checkbox
      && ((this.state.array.length !== 0 && name !== '删除')
      || this.state.recomCheck.length !== 0)
    ) {
      this.Timer();
    } else if (this.state.radio
      && ((this.state.array.length !== 0 && state.entities[this.state.array[0]].plp !== undefined && name === '重命名')
      || (this.state.recomCheck.length !== 0 && name !== '播放'))
    ) {
      this.Timer();
    }
    this.setState({
      showDialog: true,
      buttonName: name
    });
  }
  handleCloseDialog = () => {
    this.setState({
      showDialog: false,
      buttonName: ''
    });
  }
  handleSureDelete = () => {
    this.setState({
      showDialog: false,
      array: []
    });
  }
  render() {
    const { state } = this.props;
    return (
      <div>
        <div className="chance_button">
          <span className="select_point" onClick={this.onSelectRadio}>
            <span className="chanceSpan">
              <span className={this.onShowRadioClassName()} />
            </span>
            <p>单选</p>
          </span>
          <span className="select_point" onClick={this.onSelectCheck}>
            <span className="chanceSpan">
              <span className={this.onShowCheckClassName()} />
            </span>
            <p>多选</p>
          </span>
        </div>
        <MusicContent
          allState={this.state}
          state={state}
          onChanceListItem={this.handleChanceListItem}
          onChangeRandom={this.handleChangeRandom}
          onshowTipBox={this.handleShowTipBox}
          onCloseDialog={this.handleCloseDialog}
          onSureDelete={this.handleSureDelete}
        />
        {this.showMaxReminder()}
      </div>
    );
  }
}

