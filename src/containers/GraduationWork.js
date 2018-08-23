import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../actions';
import MyMusic from '../components/tabsChildren/myMusic';
import SearchMusic from '../components/tabsChildren/searchMusic';
import UploadMusic from '../components/tabsChildren/uploadMusic';
import '../components/music.css';
import './GraduationWork.css';

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
  showMyMusicClass = () => {
    if (this.state.myMusic) {
      return (
        <div>
          <div className="tab_red">我的音乐</div>
          <div className="tab_bottom_red" />
        </div>
      );
    }
    return <div>我的音乐</div>;
  }
  showSearchMusicClass = () => {
    if (this.state.searchMusic) {
      return (
        <div>
          <div className="tab_red">搜索音乐</div>
          <div className="tab_bottom_red" />
        </div>
      );
    }
    return <div>搜索音乐</div>;
  }
  showUploadMusicClass = () => {
    if (this.state.uploadMusic) {
      return (
        <div>
          <div className="tab_red">上传音乐</div>
          <div className="tab_bottom_red" />
        </div>
      );
    }
    return <div>上传音乐</div>;
  }
  render() {
    return (
      <div>
        <div className="top_bar">
          <div className="top_bar_name">小年糕+</div>
          <div className="user_name">
            <span className="film_making">
              <p>影集制作</p>
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
              {this.showMyMusicClass()}
            </span>
            <span onClick={this.onSearchMusicClick}>
              {this.showSearchMusicClass()}
            </span>
            <span onClick={this.onUploadhMusicClick}>
              {this.showUploadMusicClass()}
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
