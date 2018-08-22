import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../../actions';
import MusicContent from '../../components/musicContent/musicContent';
import '../../components/music.css';

class MyMusic extends React.Component {
  state = {
    radio: true,
    checkbox: false,
    checkArray: [],
    radioArray: [],
    recomCheck: [], // 将推荐音乐med作为判断条件，划分button不同状态
    random: false
  };
  onSelectRadio = () => {
    const { entities } = this.props;
    if (this.state.checkArray.length !== 0) {
      const array = this.state.checkArray.slice();
      const newArray = [];
      newArray.push(array[0]);
      if (entities[array[0]].med === undefined) {
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
        radioArray: newArray
      });
    } else {
      this.setState({
        radio: true,
        checkbox: false,
        radioArray: [],
        recomCheck: []
      });
    }
  }
  onSelectCheck = () => {
    const { entities } = this.props;
    const array = this.state.radioArray.slice();
    if (array.length !== 0) {
      if (entities[array[0]].med === undefined) {
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
    const { entities } = this.props;
    if (this.state.checkbox) {
      const newArray = this.state.checkArray.slice();
      const index = newArray.indexOf(idx);
      if (index === -1) {
        newArray.push(idx);
      } else {
        newArray.splice(index, 1);
      }
      const arr = this.state.recomCheck.slice();
      if (entities[idx].med === undefined) {
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
      if (entities[idx].med === undefined) {
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
  render() {
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
          state={this.props}
          onChanceListItem={this.handleChanceListItem}
          onChangeRandom={this.handleChangeRandom}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    loginReducer,
    myMusicReducer,
    entities,
    recommendReducer
  } = state;
  return {
    loginReducer,
    myMusicReducer,
    entities,
    recommendReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    graduactions: bindActionCreators(ActionTypes, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyMusic);
