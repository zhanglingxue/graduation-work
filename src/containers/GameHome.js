import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionTypes from '../actions';
import './GameHome.css';

class GameHome extends React.Component {
  
  render() {
    return (
      <div className="containerContent">
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    entities,
    gameReducer
  } = state;
  return {
    entities,
    gameReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(ActionTypes, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameHome);
