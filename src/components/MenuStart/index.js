import React, {Component} from 'react';

import Message from '../Message';


import './MenuStart.scss';

class MenuStart extends Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      channel: ''
    };
  }


  handleSubmitByKeyDown(e) {
    if(e.which === 13) {
      e.preventDefault();
      this.handleSubmit();
    }
  }


  handleSubmit() {
    //提交输入框里的key
    this.props.handleSubmit(this.state.channel);

  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }




  render() {

    const block = 'MenuStart';


    return (


      <div>


        <div className='ui top fixed menu'>

          <a className='header item'><i className='privacy icon'></i> 请先输入KEY</a>
        </div>


        <div className={`ui segment basic ${block}`}>


          <form className='ui form'>

            <div className='field'>

              <label>KEY</label>
              <input value={this.state.channel}
                     name='channel'
                     onChange={this.handleChange.bind(this)}
                     onKeyDown={this.handleSubmitByKeyDown.bind(this)}
                     type='text'
                     placeholder='请输入对应的公众号绑定的key'
                     autoFocus={true}/>

            </div>

            <a className='ui green button inverted'
               onClick={this.handleSubmit.bind(this)}>提交</a>



            <Message message={this.props.error} />

          </form>
        </div>


      </div>


    )
  }
}


export default MenuStart;