import Alt from 'alt';
export default new Alt();
N
o
 
l
i
n
e
s
import alt from '../../alt';
import modalActions from './actions';


class modalStore {
    constructor() {
        this.bindActions(modalActions);
        this.open = false;
        this.type = false;
        this.thinking = false;
        this.meta = false;
        this.fileSelectorFiles = {};
        this.data = false;
    }
    onOpen(data) {
    }
    onMetaUpdate(meta) {
    }
    onThinking() {
    }
    onFileSelector(files) {
    }
    onClose() {
    }
}
default alt.createStore(modalStore);
import React from 'react';
import ModalStore from '../store';
default React.createClass({
    componentWillUnmount() {
        ModalStore.unlisten(this.update);
    },
});
