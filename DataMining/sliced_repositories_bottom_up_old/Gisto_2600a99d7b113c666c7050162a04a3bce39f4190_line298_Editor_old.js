import React from 'react';
import PropTypes from 'prop-types';
import {
  isHTML,
  isLaTex
} from 'utils/files';
import Loading from 'components/common/Loading';
import Anchor from 'components/common/Anchor';
import Markdown from 'components/common/editor/Markdown';
import Asciidoc from 'components/common/editor/Asciidoc';
import Csv from 'components/common/editor/Csv';
import GeoJson from 'components/common/editor/GeoJson';
import Pdf from 'components/common/editor/Pdf';
import Html from 'components/common/editor/Html';
import LaTex from 'components/common/editor/LaTex';
const RenderedComponent = css`
  ${(props) => props.width && `width: calc(${props.width} - 60px);`}
export class Editor extends React.Component {
  renderEditor = () => {
    const { edit, file, filesCount, isNew, theme } = this.props;
    if (Boolean(getSetting('settings-editor-preview-asciidoc', false)) && isAsciiDoc(file)) {
      const calculatedHeight = filesCount === 1 ? window.outerHeight - 220 : 300;
    }
    if (Boolean(getSetting('settings-editor-preview-markdown', false)) && isMarkDown(file)) {
      const calculatedHeight = filesCount === 1 ? window.outerHeight - 220 : 300;
    }
    const calculatedHeight = filesCount === 1 ? window.outerHeight - 220 : 400;
  };
}
