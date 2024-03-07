import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ModalStore from './store';
import ModalActions from './actions';

import FileStreamSelector from './components/fileStreamSelector';
import HistorySelector from './components/historySelector';
import URLContents from './components/URLadd';
import Thinking from './components/Thinking';
import DashboardMenu from './components/dashboardMenu';
import DashboardFileMenu from './components/dashboardFileMenu';
import AskRemove from './components/askRemove';
import About from './components/about';
import Plugin from './components/Plugin';
import InstalledPlugin from './components/InstalledPlugin';
import SearchPlugin from './components/SearchPlugin';
import SearchPlugins from './components/SearchPlugins';
import TorrentSelector from './components/torrentSelector';
import TorrentWarning from './components/torrentWarning';

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {

        var modalState = ModalStore.getState();

        return {
            Thinking: modalState.thinking,
            modalIsOpen: modalState.open,
            type: modalState.type,
            data: modalState.data
        };
    },

    componentDidMount() {
        ModalStore.listen(this.update);
    },

    componentWillUnmount() {
        ModalStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {

            var modalState = ModalStore.getState();

            this.setState({
                modalIsOpen: modalState.open,
                data: modalState.data,
                type: modalState.type,
                Thinking: modalState.thinking
            });
        }
    },

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    },

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    },

    getContents() {
        switch (this.state.type) {
            case 'URLAdd':
                return <URLContents />;
                break;
            case 'fileSelctor':
                return <FileStreamSelector />;
                break;
            case 'historySelector':
                return <HistorySelector />;
                break;
            case 'thinking':
                return <Thinking />;
                break;
            case 'dashboardMenu':
                return <DashboardMenu />;
                break;
            case 'dashboardFileMenu':
                return <DashboardFileMenu />;
                break;
            case 'askRemove':
                return <AskRemove />;
                break;
            case 'about':
                return <About />;
                break;
            case 'plugin':
                return <Plugin />;
                break;
            case 'installedPlugin':
                return <InstalledPlugin />;
                break;
            case 'searchPlugin':
                return <SearchPlugin />;
                break;
            case 'searchPlugins':
                return <SearchPlugins />;
                break;
            case 'torrentSelector':
                return <TorrentSelector />;
                break;
            case 'torrentWarning':
                return <TorrentWarning />;
                break;
        }
    },

    render() {
        return (
            <div style={{width: '0px', height: '0px'}}>
                {this.getContents()}
            </div>
        );
    }
});