import Alt from 'alt';
export default new Alt();
import alt from '../../../../alt'
class ControlActions {
    handleMute(event) {
        var controlState = this.alt.stores.ControlStore.state;
        this.actions.mute(!controlState.muted);
    }
}
