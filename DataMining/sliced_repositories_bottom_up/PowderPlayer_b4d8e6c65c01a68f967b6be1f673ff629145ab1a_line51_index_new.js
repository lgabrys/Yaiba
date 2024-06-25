N
o
 
l
i
n
e
s
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import player from './utils/player';
import contextMenu from './utils/contextMenu';
import VisibilityStore from './components/Visibility/store';
const Player = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        var visibilityState = VisibilityStore.getState();
    },
    componentWillUnmount() {
        window.removeEventListener('contextmenu', contextMenu.listen);
    },
});
