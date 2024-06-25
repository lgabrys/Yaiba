import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LogoIcon from '../../assets/images/icon100x100.svg';
import versionMeta from '../../version.json';
let buildID = versionMeta.commitId;
if (buildID && buildID.length >= 11) {
  buildID = buildID.slice(0, 11);
}
const productName = versionMeta.name + (Pro ? ' Pro' : '');
class AboutDialog extends React.Component<Props, State> {
  renderTitle = () => <DialogTitle>{productName}</DialogTitle>;

  renderContent = () => (
    <DialogContent>
      <img
        alt="TagSpaces logo"
        src={LogoIcon}
        style={{ float: 'left', marginRight: 10, width: 120, height: 120 }}
      />
      <Typography variant="subtitle1" title={'Build on: ' + versionMeta.buildTime}>Version: {versionMeta.version} / BuildID: {buildID}</Typography>
      <br />
      <Typography
        id="aboutContent"
        variant="body1"
      >
        <strong>{productName}</strong> is made possible by the TagSpaces(github.com/tagspaces) open source project
        and other <Button onClick={this.props.toggleThirdPartyLibsDialog}>open source software</Button>.
        <br />
        {!Pro && (<span>This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU Affero General Public License (version 3) as
        published by the Free Software Foundation.</span>)}
        <br />
        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
}
