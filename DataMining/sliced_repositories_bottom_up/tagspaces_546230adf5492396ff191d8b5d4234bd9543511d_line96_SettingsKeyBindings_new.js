import i18n from 'i18next';
export default i18n;
import React from 'react';
import i18n from '../../services/i18n';
class SettingsKeyBindings extends React.Component<Props> {
  render() {
    const { keyBindings, classes, setKeyBinding, setGlobalKeyBinding, globalKeyBindingEnabled } = this.props;
    return (
        {keyBindings.map((keyBinding) => (
            label={i18n.t('core:' + keyBinding.name)}
        ))}
    );
  }
}
