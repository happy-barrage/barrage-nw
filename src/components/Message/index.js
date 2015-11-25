import React, {Component, PropTypes} from 'react';




class Message extends Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      show : true
    };
  }

  handleClose(e) {


    this.setState({
      show : false
    });
  }

  componentWillReceiveProps(nextPros) {
    this.setState({
      show : true
    });
  }



  render() {

    const {message, className} = this.props;

    return (
      <div className={`ui message ${className} ${this.state.show && !!message ? 'visible' : 'hidden'}`}>

        <p>
          {message}
        </p>
        <i className='close icon'
           onClick={this.handleClose.bind(this)}>
        </i>
      </div>
    )
  }
}

Message.displayName = 'Message';

//error , info, success
Message.defaultProps = {
  className : 'error'
};

Message.propTypes = {
  message : PropTypes.string.isRequired
};



export default Message;