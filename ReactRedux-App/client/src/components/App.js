import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveText, clearText, saveText2, clearText2 } from '../store/actions';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
      input2: '',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    const newState = {};
    if (event.target.id === 'input1') {
      newState.input1 = event.target.value;
    } else {
      newState.input2 = event.target.value;
    }
    this.setState(newState);
  }

  handleSubmit(event) {
    const { dispatch } = this.props;

    switch (event.target.id) {
      case 'button1': {
        dispatch(saveText(this.state.input1));
        this.setState({ input1: '' });
        break;
      }
      case 'button2': {
        dispatch(saveText2(this.state.input2));
        this.setState({ input2: '' });
        break;
      }
      case 'clear1': {
        dispatch(clearText());
        break;
      }
      case 'clear2': {
        dispatch(clearText2());
        break;
      }
      default: break;
    }
  }

  render() {
    const { text1, text2 } = this.props;

    return (
      <div>
        <h2>Hello, world!</h2>
        <p>All this app does is store the last input value using Redux.</p>
        <table>
          <thead>
            <th>Stored Value</th>
          </thead>
          <tbody>
            <tr>
              <td>{text1}</td>
              <td>
                <input type="text" id="input1" onChange={this.onChange} value={this.state.input1} />
              </td>
              <td><button id="button1" onClick={this.handleSubmit}>Submit</button></td>
              <td><button id="clear1" onClick={this.handleSubmit}>Clear</button></td>
            </tr>
            <tr>
              <td>{text2}</td>
              <td>
                <input type="text" id="input2" onChange={this.onChange} value={this.state.input2} />
              </td>
              <td><button id="button2" onClick={this.handleSubmit}>Submit</button></td>
              <td><button id="clear2" onClick={this.handleSubmit}>Clear</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { input1State, input2State } = state;
  const { text1 } = input1State;
  const { text2 } = input2State;
  return {
    text1,
    text2,
  };
}

export default connect(mapStateToProps)(App);
