import React, {Component} from 'react';


import './MenuWorking.scss';


import {SERVER_URL} from '../../constants';




//弹幕的默认options
let optionsDefault = {
  title: '',
  transparent: true,
  resizable: false,
  frame: false,
  'always-on-top': true,
  show: true,
  toolbar: false,
  //kiosk: true,
  'visible-on-all-workspaces': true,
  //fullscreen: false,
  width: gui.Screen.screens[0].work_area.width, //最大工作区间的屏幕，第一个屏幕
  height: gui.Screen.screens[0].work_area.height
};


class MenuWorking extends Component {

  constructor(props, context) {
    super(props, context);

    //可以在这里首先打开

    let {channel} = props;
    let themeId = props.themes[0].objectId;

    this.open({channel, themeId});


    this.state = {
      theme : props.themes[0].objectId
    }

  }

  handleCancel() {

    this.close();
    this.props.handleCancel();
  }

  open({channel, themeId}) {

    this.close();

    WindowDanmuku = gui.Window.open(`${SERVER_URL}/chat/${channel}?theme=${themeId}`, optionsDefault)


  }


  close() {
    if(WindowDanmuku) {
      WindowDanmuku.close();
      WindowDanmuku = null;
    }
  }


  handleChangeTheme(e) {

    let {channel} = this.props;
    let themeId = e.target.value;

    this.setState({
      theme : themeId
    });

    this.open({channel, themeId});
  }



  componentWillUnmount() {
    this.close();
  }

  render() {


    const block = 'MenuWorking';
    const {themes} = this.props;

    return (

      <div>


        <div className='ui top fixed menu'>

          <a className='header item'
             onClick={this.handleCancel.bind(this)}>
            <i className='angle left icon'></i> 取消
          </a>
        </div>


        <div className={`ui middle aligned list very relaxed divided ${block}`}>


          {themes.map((theme)=>


              <div className='item' key={theme.objectId}>

                <div className='content'>
                  <div className='ui toggle checkbox'>
                    <input
                      type='radio'
                      name='theme'
                      value={theme.objectId}
                      onChange={this.handleChangeTheme.bind(this)}
                      checked={theme.objectId === this.state.theme ? true: false}/>
                    <label>{theme.name}</label>
                  </div>
                </div>

              </div>

          )}



        </div>


      </div>


    );
  }
}


export default MenuWorking;