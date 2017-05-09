
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';

import Hello from './Hello';
import UserData from '../model/UserData';
import CodeRetVal from '../model/CodeRetVal';

const editorOptions = {
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: 'javascript',
  matchBrackets: true,
  autoCloseBrackets: true,
  /*
  lineNumbers: true, // seems to break the css/dimensions
  lint: { esversion: 6 },
  runnable: true,
  gutters: ['CodeMirror-lint-markers']
  inputStyle: 'contenteditable'
  */
};

/**
 * Top-level component for the app. This is rendered in App.jsx.
 */
export default class ArcadeMode extends Component {

  constructor(props) {
    super(props);
    this.onClickCallback = this.onClickCallback.bind(this);

    this.onCodeChange = this.onCodeChange.bind(this);
  }

  onCodeChange(newCode) {
    console.log('Emitting new code from <ArcadeMode>');
    this.props.onCodeChange(newCode);
  }

  onClickCallback(e) {
    const target = e.target;
    this.props.runTest(target);
  }

  render() {
    return (
      <div>
        <h1>ArcadeMode</h1>
        <Hello />
        <button onClick={this.onClickCallback}>Run</button>
        <p>Userdata given: {this.props.userData.username} </p>
        <p>Your code returned: {this.props.codeRetVal.toString()}</p>

        <div className={'editor'}>
          <CodeMirror
            onChange={this.onCodeChange}
            options={editorOptions}
            value={this.props.code}
          />
        </div>

      </div>
    );
  }

}

ArcadeMode.propTypes = {
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  codeRetVal: PropTypes.instanceOf(CodeRetVal).isRequired,
  runTest: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired
};
