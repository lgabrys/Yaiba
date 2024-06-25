import React from 'react';
import PropTypes from 'prop-types';
const editorOptions = (options) => ({
  selectOnLineNumbers: Boolean(getSetting('selectOnLineNumbers', false)),
  lineNumbers: getSetting('lineNumbers', true),
  codeLens: getSetting('codeLens', false),
  cursorBlinking: getSetting('cursorBlinking', 'blink'),
  formatOnPaste: Boolean(getSetting('formatOnPaste', false)),
  formatOnType: Boolean(getSetting('settings-editor-formatOnType', false)),
  fontFamily: getSetting('fontFamily', 'monospace'),
  lineHeight: getSetting('lineHeight', 21),
  fontLigatures: getSetting('fontLigatures', false),
  fontSize: getSetting('fontSize', 12),
  roundedSelection: false,
  scrollBeyondLastLine: false,
  wordWrap: getSetting('settings-editor-wordWrap', 'bounded'),
  wordWrapColumn: getSetting('settings-editor-wordWrapColumn', 80),
  minimap: {
    enabled: Boolean(getSetting('minimap', false))
  },
  automaticLayout: true,
  ...options
});
export class Editor extends React.Component {
  editorDidMount = (editor, monaco) => {
  };
  renderMonacoEdito = (width, height, language = this.props.language) => (
      options={ editorOptions({ readOnly: !this.props.edit }) }
  );
}
