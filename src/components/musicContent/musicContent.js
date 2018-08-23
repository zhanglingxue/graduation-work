import React from 'react';
import BottomButton from './bottomButton';
import MyMusicList from './myMusicList';
import '../music.css';

export default class MusicContent extends React.Component {
  state = {
  };
  render() {
    const {
      state,
      allState,
      onChanceListItem,
      onChangeRandom,
      onshowTipBox,
      onCloseDialog,
      onSureDelete
    } = this.props;
    return (
      <div>
        <MyMusicList
          allState={allState}
          state={state}
          onChanceListItem={onChanceListItem}
          onChangeRandom={onChangeRandom}
        />
        <BottomButton
          allState={allState}
          state={state}
          onshowTipBox={onshowTipBox}
          onCloseDialog={onCloseDialog}
          onSureDelete={onSureDelete}
        />
      </div>
    );
  }
}
