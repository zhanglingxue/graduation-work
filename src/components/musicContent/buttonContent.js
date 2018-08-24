import React from 'react';

export default class ButtonContent extends React.Component {
  state = {

  };
  showButtonContent = () => {
    const { item, allState, state } = this.props;
    switch (item.name) {
      case '播放': {
        if (allState.random || allState.checkbox) {
          return (
            <div>
              <img src={item.icon_gray} className="button_icon" />
              <div className="button_style active">播放</div>
            </div>
          );
        }
        return (
          <div>
            <img src={item.icon_red} className="button_icon" />
            <div className="button_style">播放</div>
          </div>
        );
      }
      case '重命名': {
        if (allState.radio) {
          if (allState.recomCheck.length === 0
            && allState.array.length !== 0) {
            const plp = allState.array[0];
            if (state.entities[plp].plp !== undefined) {
              return (
                <div>
                  <img src={item.icon_gray} className="button_icon" />
                  <div className="button_style active">重命名</div>
                </div>
              );
            }
          } else if (allState.random || allState.recomCheck.length !== 0) {
            return (
              <div>
                <img src={item.icon_gray} className="button_icon" />
                <div className="button_style active">重命名</div>
              </div>
            );
          }
        } else if (allState.checkbox) {
          return (
            <div>
              <img src={item.icon_gray} className="button_icon" />
              <div className="button_style active">重命名</div>
            </div>
          );
        }
        return (
          <div>
            <img src={item.icon_red} className="button_icon" />
            <div className="button_style">重命名</div>
          </div>
        );
      }
      case '选择片段': {
        if (allState.random
          || (allState.radio && allState.recomCheck.length !== 0)
          || allState.checkbox
        ) {
          return (
            <div>
              <img src={item.icon_gray} className="button_icon" />
              <div className="button_style active">选择片段</div>
            </div>
          );
        }
        return (
          <div>
            <img src={item.icon_red} className="button_icon" />
            <div className="button_style">选择片段</div>
          </div>
        );
      }
      case '送给朋友': {
        if (allState.random
          || (allState.radio && allState.recomCheck.length !== 0)
          || allState.checkbox
        ) {
          return (
            <div>
              <img src={item.icon_gray} className="button_icon" />
              <div className="button_style active">送给朋友</div>
            </div>
          );
        }
        return (
          <div>
            <img src={item.icon_red} className="button_icon" />
            <div className="button_style">送给朋友</div>
          </div>
        );
      }
      case '删除': {
        if (allState.radio && (allState.random || allState.recomCheck.length !== 0)) {
          return (
            <div>
              <img src={item.icon_gray} className="button_icon" />
              <div className="button_style active">删除</div>
            </div>
          );
        } else if (allState.checkbox && (
          allState.array.length === 0 || allState.recomCheck.length !== 0)) {
          return (
            <div>
              <img src={item.icon_gray} className="button_icon" />
              <div className="button_style active">删除</div>
            </div>
          );
        }
        return (
          <div>
            <img src={item.icon_red} className="button_icon" />
            <div className="button_style">删除</div>
          </div>
        );
      }
      default:
        return null;
    }
  }
  render() {
    return (
      <div>
        {this.showButtonContent()}
      </div>
    );
  }
}
