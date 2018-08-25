import React from 'react';
import MyMusic from './tabsChildren/myMusic';
import SearchMusic from './tabsChildren/searchMusic';
import UploadMusic from './tabsChildren/uploadMusic';
import './music.css';

const artboard_upload = require('../images/artboard_upload.png');
const artboard_upload_gray = require('../images/artboard_upload_gray.png');
const artboard_music = require('../images/artboard_music.png');
const artboard_music_gray = require('../images/artboard_music_gray.png');
const artboard_search_gray = require('../images/artboard_search_gray.png');
const artboard_search = require('../images/artboard_search.png');

export default class Tabs extends React.Component {
  state = {
    myMusic: true,
    searchMusic: false,
    uploadMusic: false
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
  render() {
    return (
      <div className="chance_router">
        <span onClick={this.onMyMusicClick}>
          {
            this.state.myMusic ?
              <div>
                <div className="tab_option tab_color">
                  <img src={artboard_music} />
                  我的音乐
                </div>
                <div className="tab_bottom_red" />
              </div> :
              <div className="tab_option">
                <img src={artboard_music_gray} />
                我的音乐
              </div>
          }
        </span>
        <span onClick={this.onSearchMusicClick}>
          {
            this.state.searchMusic ?
              <div>
                <div className="tab_option tab_color">
                  <img src={artboard_search} />
                  搜索音乐
                </div>
                <div className="tab_bottom_red" />
              </div> :
              <div className="tab_option">
                <img src={artboard_search_gray} />
                搜索音乐
              </div>
          }
        </span>
        <span onClick={this.onUploadhMusicClick}>
          {
            this.state.uploadMusic ?
              <div>
                <div className="tab_option tab_color">
                  <img src={artboard_upload} />
                  上传音乐
                </div>
                <div className="tab_bottom_red" />
              </div> :
              <div className="tab_option">
                <img src={artboard_upload_gray} />
                上传音乐
              </div>
          }
        </span>
      </div>
    );
  }
}
