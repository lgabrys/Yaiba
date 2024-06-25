N
o
 
l
i
n
e
s
import {ipcRenderer as ipcr} from 'electron';
import analytics from './analytics';
ipcr.on('track-analytics', function(event, name, args) {
  const tracker = analytics.getTracker();
  if (tracker) {
    const trackerFn = tracker[name];
  }
});
