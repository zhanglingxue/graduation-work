import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as ActionTypes from '../actions';
import '../components/music.css';

class GraduationWork extends React.Component {
  state = {
  }
  componentWillMount = () => {
    const { graduactions, loginReducer } = this.props;
    graduactions.fetchLogin(115);
    const token = loginReducer.res.token;
    graduactions.fetchMyMusicList('test91203');
    graduactions.fetchRecommendMusicList('test91203');
  }
  onMyMusicClick = () => {
    browserHistory.push('/');
  }
  onSearchMusicClick = () => {
    browserHistory.push('search-music');
  }
  onUploadhMusicClick = () => {
    browserHistory.push('upload-music');
  }
  render() {
    return (
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
          <span onClick={this.onMyMusicClick}>我的音乐</span>
          <span onClick={this.onSearchMusicClick}>搜索音乐</span>
          <span onClick={this.onUploadhMusicClick}>上传音乐</span>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    loginReducer
  } = state;
  return {
    loginReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    graduactions: bindActionCreators(ActionTypes, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GraduationWork);
