import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
class OnboardingDialog extends React.Component<Props, State> {
  renderContent = () => {
    const { activeStep } = this.state;
    return (
      <DialogContent style={{ marginTop: 20 }}>
    );
  };
}
