import React from 'react';
import BottomButton from './bottomButton';
import MyMusicList from './myMusicList';
import RecommentLst from './recommentList';
import '../music.css';

export default class MusicContent extends React.Component {
  state = {
  };
  render() {
    const {
      state,
      allState,
      onChanceListItem
    } = this.props;
    return (
      <div>
        <div>
          <MyMusicList
            allState={allState}
            state={state}
            onChanceListItem={onChanceListItem}
          />
          {/* <RecommentLst
            allState={allState}
            state={state}
          /> */}
        </div>
        <BottomButton
          allState={allState}
          state={state}
        />
      </div>
    );
  }
}
