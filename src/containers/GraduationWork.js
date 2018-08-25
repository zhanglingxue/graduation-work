import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../actions';
import MyMusic from '../components/tabsChildren/myMusic';
import SearchMusic from '../components/tabsChildren/searchMusic';
import UploadMusic from '../components/tabsChildren/uploadMusic';
import TabPane from '../components/tabs/tabPane';
import '../components/music.css';
import './GraduationWork.css';

const icon_back = require('../images/return.png');
const artboard_upload = require('../images/artboard_upload.png');
const artboard_upload_gray = require('../images/artboard_upload_gray.png');
const artboard_search_gray = require('../images/artboard_search_gray.png');
const artboard_search = require('../images/artboard_search.png');
const artboard_music = require('../images/artboard_music.png');
const artboard_music_gray = require('../images/artboard_music_gray.png');

class GraduationWork extends React.Component {
  state = {
    tab: '1'
  }
  componentDidMount = () => {
    const { graduactions } = this.props;
    graduactions.fetchLogin(115);
  }
  onChangeClick = value => {
    this.setState({
      tab: value
    });
  }
  showTopBarContents = () => {
    if (this.state.tab === '1') {
      return <MyMusic state={this.props} />;
    } else if (this.state.tab === '2') {
      return <SearchMusic state={this.props} />;
    }
    return <UploadMusic state={this.props} />;
  }
  goBack = () => {
    window.alert('go back!!');
  }
  render() {
    return (
      <div>
        <div className="top_bar">
          <div className="top_bar_name">小年糕+</div>
          <div className="user_name">
            <span className="film_making" onClick={this.goBack}>
              <span><img src={icon_back} /></span>
              <span><p>影集制作</p></span>
            </span>
            <span className="myName">
              <p>{this.props.loginReducer.res.nick}</p>
            </span>
            <span className="complete">
              <p>完成</p>
            </span>
          </div>
          <div className="chance_router">
            <TabPane
              state={this.state}
              keyValue="1"
              callback={this.onChangeClick}
              name="我的音乐"
              icon_red={artboard_music}
              icon_gray={artboard_music_gray}
            />
            <TabPane
              state={this.state}
              keyValue="2"
              callback={this.onChangeClick}
              name="搜索音乐"
              icon_red={artboard_search}
              icon_gray={artboard_search_gray}
            />
            <TabPane
              state={this.state}
              keyValue="3"
              callback={this.onChangeClick}
              name="上传音乐"
              icon_red={artboard_upload}
              icon_gray={artboard_upload_gray}
            />
          </div>
        </div>
        <div className="props_children">
          {this.showTopBarContents()}
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(GraduationWork);
