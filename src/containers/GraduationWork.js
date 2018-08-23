import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../actions';
import MyMusic from '../components/tabsChildren/myMusic';
import SearchMusic from '../components/tabsChildren/searchMusic';
import UploadMusic from '../components/tabsChildren/uploadMusic';
import '../components/music.css';
import './GraduationWork.css';

const icon_back = require('../images/return.png');

class GraduationWork extends React.Component {
  state = {
    myMusic: true,
    searchMusic: false,
    uploadMusic: false
  }
  componentDidMount = () => {
    const { graduactions } = this.props;
    graduactions.fetchLogin(115);
  }
  onMyMusicClick = () => {
    this.setState({
      myMusic: true,
      searchMusic: false,
      uploadMusic: false
    });
  }
  onSearchMusicClick = () => {
    this.setState({
      myMusic: false,
      searchMusic: true,
      uploadMusic: false
    });
  }
  onUploadhMusicClick = () => {
    this.setState({
      myMusic: false,
      searchMusic: false,
      uploadMusic: true
    });
  }
  showTopBarContents = () => {
    if (this.state.myMusic) {
      return <MyMusic state={this.props} />;
    } else if (this.state.searchMusic) {
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
            <span onClick={this.onMyMusicClick}>
              {
                this.state.myMusic ?
                  <div>
                    <div className="tab_red">我的音乐</div>
                    <div className="tab_bottom_red" />
                  </div> :
                  <div>我的音乐</div>
              }
            </span>
            <span onClick={this.onSearchMusicClick}>
              {
                this.state.searchMusic ?
                  <div>
                    <div className="tab_red">搜索音乐</div>
                    <div className="tab_bottom_red" />
                  </div> :
                  <div>搜索音乐</div>
              }
            </span>
            <span onClick={this.onUploadhMusicClick}>
              {
                this.state.uploadMusic ?
                  <div>
                    <div className="tab_red">上传音乐</div>
                    <div className="tab_bottom_red" />
                  </div> :
                  <div>上传音乐</div>
              }
            </span>
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
