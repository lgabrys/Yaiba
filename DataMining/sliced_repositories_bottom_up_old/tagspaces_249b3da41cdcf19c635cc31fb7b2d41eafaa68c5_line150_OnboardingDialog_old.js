import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
class OnboardingDialog extends React.Component<Props, State> {
  renderContent = () => {
    const { activeStep } = this.state;
    return (
      <DialogContent style={{ marginTop: 20 }}>
            style={{
              textAlign: 'center'
            }}
              style={{ maxHeight: 340, marginTop: 15 }}
              onChange={(event, theme) => { this.props.setCurrentTheme(theme); }}
              style={{ boxShadow: 'none' }}
            style={{
              textAlign: 'center'
            }}
              style={{ marginTop: 15 }}
    );
  };
}
