import React, {Component} from 'react';


import MenuStart from '../components/MenuStart';
import MenuWorking from '../components/MenuWorking';


import {API_URL} from '../constants';


import {fetchCheckStatus, fetchParseJSON} from '../helpers';



import './styles/Menu.scss';



class Menu extends Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      working: false,
      channel: '',
      themes: [],
      loading: false,
      error: ''
    };
  }


  handleSubmit(channel) {

    //需要将弹幕打开
    this.setState({
      loading: true,
    });





    ((_this) => {

      fetch(`${API_URL}/themes/bind/${channel}`)
        .then(fetchCheckStatus)
        .then(fetchParseJSON)
        .then((json) => {

          _this.setState({
            themes : json,
            working: true,
            channel : channel,
            error: ''
          });

        }).catch((err) => {

          err.response.then(data => {
            _this.setState({
              error: err.message
            })
          })



        }).then(() => {
          _this.setState({
            loading: false
          });
        });
    })(this);




  }

  handleCancel() {


    //需要将弹幕关闭
    this.setState({
      working: false,
      key: '',
      themes: []
    })
  }


  handleQuit() {


    gui.App.closeAllWindows();
    gui.App.quit();
  }


  render() {


    let Child = <MenuStart handleSubmit={this.handleSubmit.bind(this)} error={this.state.error}/>;

    if (this.state.working && !!this.state.channel) {

      //提交之后working 为true
      //cancel之后working 为false
      
      Child = <MenuWorking handleCancel={this.handleCancel.bind(this)} channel={this.state.channel} themes={this.state.themes}/>;
    }


    return (


      <div className='container Menu'>


        <div className={`ui inverted dimmer ${this.state.loading ? 'active' : ''}`}>
          <div className='ui loader'></div>
        </div>


        <div className='ui grid'>

          <div className='fourteen wide centered column'>



            {Child}


            <div className='ui bottom fixed menu'>

              <a className='item Menu__drag'>v{PACKAGE_JSON.version}</a>

              <div className='menu right'>

                <a className='item'
                   onClick={this.handleQuit.bind(this)}>退出</a>

              </div>

            </div>

          </div>
        </div>


      </div>



    )



  }
}


export default Menu;