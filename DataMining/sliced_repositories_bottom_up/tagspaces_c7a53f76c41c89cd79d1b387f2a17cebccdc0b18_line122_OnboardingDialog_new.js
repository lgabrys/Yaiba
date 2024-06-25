import React from 'react';
import Typography from '@material-ui/core/Typography';
class OnboardingDialog extends React.Component<Props, State> {
  renderContent = () => {
    return (
            <Typography variant="h6">Your favorite file organizer has a fresh new look</Typography>
    );
  };
}
