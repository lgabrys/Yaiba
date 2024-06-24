import React from 'react';
import PropTypes from 'prop-types';
import * as userActions from 'actions/user';
import * as loginActions from 'actions/login';
export class AppArea extends React.Component {
  componentDidMount() {
    ipcRenderer.on('message', (event, text, info) => this.setState({ message: text }));
  }
}
