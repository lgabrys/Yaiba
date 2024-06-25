import PropTypes from 'prop-types';
import * as snippetActions from 'actions/snippets';
export class Snippet extends Component {
  toggleStar = (event) => {
  };
  onContextMenu = (event, snippet) => {
    const { remote } = require('electron');
    const { Menu, MenuItem } = remote;
    const menu = new Menu();
    menu.append(new MenuItem({
      label: snippet.star ? 'Un-star' : 'Star',
      click: () => this.toggleStar(event)
    }));
    menu.append(new MenuItem({
      label: 'Copy description to clipboard',
      click: () => copyToClipboard(event, get('description', snippet), 'Snippet description copied to clipboard')
    }));
  };
}
