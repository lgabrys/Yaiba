import PropTypes from 'prop-types';
import marked from 'marked';
const Markdown = ({ text, className, emoji }) => {
  const md = (textInput)  => {
    const renderer = new marked.Renderer();
    renderer.text = (input) => {
      return input.replace(/:(.*?):/g, (matcher, capture) => `<img src="${get([capture], emoji)}" style="width: 18px;vertical-align: middle;background: transparent;"/>`);
    };
  };
};
