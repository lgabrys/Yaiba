import i18n from 'i18next';
export default i18n;
import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import i18n from '../../services/i18n';
class ThirdPartyLibsDialog extends React.Component<Props, State> {
  renderTitle = () => <DialogTitle>{i18n.t('core:thirdPartyLibs')}</DialogTitle>;

  renderContent = () => (
    <DialogContent style={{ overflowY: 'overlay', overflowX: 'auto' }}>
      <pre>{ this.state.thirdpartylibs }</pre>
    </DialogContent>
  );
}
