import React from 'react';
import styled from 'styled-components';
import { get, isEmpty, replace } from 'lodash/fp';

import { colorWarning, lightText, textColor } from 'constants/colors';

import { isElectron } from 'utils/electron';
import { setNotification } from 'utils/notifications';

import UtilityIcon from 'components/common/UtilityIcon';
import Anchor from 'components/common/Anchor';
import { gaEvent } from 'utils/ga';

const StyledUtilityIcon = styled(UtilityIcon)`
  height: 21px;
  display: inline-block;
  width: 20px;
  text-align: center;
  line-height: 21px;
  cursor: pointer;
  position: relative;
  margin: 0;
  padding: 0;
  border: none;

  &:hover {
    background: transparent;
  }
`;

const UpdaterMenu = styled.div`
  background: ${lightText};
  width: max-content;
  line-height: 21px;
  padding: 20px;
  z-index: 3;
  text-align: left;
  color: ${textColor};
  position: relative;
  top: 17px;
  box-shadow: 0 5px 30px ${textColor};
  cursor: default;
`;

const Downloading = styled(StyledUtilityIcon)`
  font-size: 10px;
  margin: 0;
  padding: 0;
  line-height: 10px;
  white-space: nowrap;
  margin-right: 30px;
  text-indent: 0;
  cursor: default;
`;

export class Updater extends React.Component {
  state = {
    message: '',
    update: false,
    download: false
  };

  componentDidMount() {
    if (isElectron) {
      const { ipcRenderer } = require('electron');
      const { app } = require('electron').remote;
      const isMacOS = process.platform === 'darwin';

      if (isMacOS) {
        ipcRenderer.send('checkForUpdate');
        ipcRenderer.on('update-info', (event, text, info) => {
          const url = get('url[0].browser_download_url', info);

          if (url) {
            const message = (
              <React.Fragment>
                <strong>{text}</strong>
                <br />
                <Anchor href={ replace('-mac.zip', '.dmg', url) }>Download</Anchor>
              </React.Fragment>
            );

            this.setState({ message, update: true });
          }
        });
      }

      ipcRenderer.on('update-available', (event, text) => {
        const message = (
          <React.Fragment>
            <strong>{text}</strong>
            <br />
            <Anchor onClick={ () => this.startDownload(ipcRenderer) }>Download</Anchor>
          </React.Fragment>
        );

        this.setState({
          message,
          update: true
        });
      });

      ipcRenderer.on('update-downloaded', (event, text, info) => {
        if (isMacOS && info.success && info.path) {
          const { exec } = require('electron').remote.require('child_process');


          gaEvent({
            category: 'update',
            action: 'downloaded',
            label: process.platform
          });

          setNotification({
            title: text,
            actions: [{
              action: () => {
                exec(`open ${info.path}`);
                app.quit();
              },
              title: 'Yes' 
            }],
            options: { autoClose: false }
          });
        }

        if (!isMacOS) {
          setNotification({
            title: text,
            actions: [{ action: () => ipcRenderer.send('quitAndInstall'), title: 'Yes' }],
            options: { autoClose: false }
          });
        }
      });

      ipcRenderer.on('no-updates', () => this.setState({
        message: '',
        update: false,
        download: false
      }));

      ipcRenderer.on('download-progress', (event, text, info) => {
        const progress = get(['progress', 'percent'], info);
        const message = `${progress.toFixed()}/100%`;

        this.setState({
          message,
          download: true,
          update: false
        });
      });
    }
  }

  startDownload = (ipcRenderer) => {
    if (isElectron) {
      ipcRenderer.send('downloadUpdate');
      this.setState({ update: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        { this.state.update && !isEmpty(this.state.message) && (
        <StyledUtilityIcon color={ colorWarning } type="flash" dropdown>
          <UpdaterMenu>{this.state.message}</UpdaterMenu>
        </StyledUtilityIcon>
        ) }

        { this.state.download && this.state.message && (
          <Downloading type="download" text={ this.state.message }/>
        ) }
      </React.Fragment>
    );
  }
}

export default Updater;
