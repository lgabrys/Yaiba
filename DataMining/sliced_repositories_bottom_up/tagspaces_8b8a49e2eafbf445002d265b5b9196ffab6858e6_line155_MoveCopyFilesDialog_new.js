import i18n from 'i18next';
export default i18n;
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import i18n from '../../services/i18n';
import PlatformIO from '../../services/platform-io';
import AppConfig from '../../config';
  renderContent = () => (
    <DialogContent>
      <List dense style={{ width: 550 }}>
        {this.props.selectedFiles && this.props.selectedFiles.length > 0 && this.props.selectedFiles.map(path => (
          <ListItem title={path}>
            <ListItemIcon>
              <FileIcon />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>{extractFileName(path)}</Typography>
          </ListItem>
        ))}
      </List>
      <FormControl fullWidth={true}>
        <Input
          autoFocus
          required
          margin="dense"
          name="targetPath"
          placeholder={i18n.t('core:moveCopyToPath')}
          fullWidth={true}
          data-tid="targetPathInput"
          onChange={e => this.handleInputChange(e)}
          value={this.state.targetPath}
          endAdornment={
            PlatformIO.haveObjectStoreSupport() || AppConfig.isWeb ? undefined :
              (<InputAdornment position="end" style={{ height: 33 }}>
                <IconButton
                  data-tid="openDirectoryMoveCopyDialog"
                  onClick={this.selectDirectory}
                >
                  <FolderIcon />
                </IconButton>
              </InputAdornment>)
          }
        />
        {this.state.inputError && <FormHelperText>Empty Input Field</FormHelperText>}
      </FormControl>
    </DialogContent>
  );
}
