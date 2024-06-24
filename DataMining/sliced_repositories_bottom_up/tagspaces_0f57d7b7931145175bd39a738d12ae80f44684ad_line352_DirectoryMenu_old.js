N
o
 
l
i
n
e
s
import i18n from 'i18next';
export default i18n;
import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import OpenFolderIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import AddExistingFileIcon from '@material-ui/icons/ExitToApp';
import OpenFolderNativelyIcon from '@material-ui/icons/Launch';
import AutoRenew from '@material-ui/icons/Autorenew';
import NewFileIcon from '@material-ui/icons/InsertDriveFile';
import NewFolderIcon from '@material-ui/icons/CreateNewFolder';
import RenameFolderIcon from '@material-ui/icons/FormatTextdirectionLToR';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsIcon from '@material-ui/icons/Settings';
import AppConfig from '../../config';
import i18n from '../../services/i18n';
class DirectoryMenu extends React.Component<Props, State> {
  render() {
    return (
        <Menu
          anchorEl={this.props.anchorEl}
          open={this.props.open}
          onClose={this.props.onClose}
        >
          {this.props.perspectiveMode && (
            <MenuItem
              data-tid="openDirectory"
              onClick={this.openDirectory}
            >
              <ListItemIcon>
                <OpenFolderIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:openDirectory')} />
            </MenuItem>
          )}
          {!this.props.perspectiveMode && (
            <MenuItem
              data-tid="openParentDirectory"
              onClick={this.openParentDirectory}
            >
              <ListItemIcon>
                <OpenFolderIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:openParentDirectory')} />
            </MenuItem>
          )}
          {!this.props.perspectiveMode && (
            <MenuItem data-tid="reloadDirectory" onClick={this.reloadDirectory}>
              <ListItemIcon>
                <AutoRenew />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:reloadDirectory')} />
            </MenuItem>
          )}
          {!this.props.isReadOnlyMode && (
            <MenuItem
              data-tid="renameDirectory"
              onClick={this.showRenameDirectoryDialog}
            >
              <ListItemIcon>
                <RenameFolderIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:renameDirectory')} />
            </MenuItem>
          )}
          {!this.props.isReadOnlyMode && (
            <MenuItem
              data-tid="deleteDirectory"
              onClick={this.showDeleteDirectoryDialog}
            >
              <ListItemIcon>
                <DeleteForeverIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:deleteDirectory')} />
            </MenuItem>
          )}
          {AppConfig.isWeb && (
            <MenuItem
              data-tid="showInFileManager"
              onClick={this.showInFileManager}
            >
              <ListItemIcon>
                <OpenFolderNativelyIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={i18n.t('core:showInFileManager')}
              />
            </MenuItem>
          )}
          {!this.props.perspectiveMode && (
            <Divider />
          )}
          {!this.props.isReadOnlyMode && !this.props.perspectiveMode && (
            <MenuItem
              data-tid="newSubDirectory"
              onClick={this.showCreateDirectoryDialog}
            >
              <ListItemIcon>
                <NewFolderIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:newSubdirectory')} />
            </MenuItem>
          )}
          {!this.props.isReadOnlyMode && !this.props.perspectiveMode && (
            <MenuItem data-tid="createNewFile" onClick={this.createNewFile}>
              <ListItemIcon>
                <NewFileIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:newFileNote')} />
            </MenuItem>
          )}
          {!this.props.isReadOnlyMode && !this.props.perspectiveMode && (
            <MenuItem data-tid="addExistingFile" onClick={this.addExistingFile}>
              <ListItemIcon>
                <AddExistingFileIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:showAddFileDialog')} />
            </MenuItem>
          )}
          {AppConfig.isCordova && (
            <MenuItem data-tid="takePicture" onClick={this.cameraTakePicture}>
              <ListItemIcon>
                <AddExistingFileIcon />
              </ListItemIcon>
              <ListItemText inset primary={i18n.t('core:cameraTakePicture')} />
            </MenuItem>
          )}
          <Divider />
          <MenuItem data-tid="showProperties" onClick={this.showProperties}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={i18n.t('core:directoryPropertiesTitle')}
            />
          </MenuItem>
        </Menu>
        <input
          style={{ display: 'none' }}
          ref={input => {
            this.fileInput = input;
          }}
    );
  }
}
