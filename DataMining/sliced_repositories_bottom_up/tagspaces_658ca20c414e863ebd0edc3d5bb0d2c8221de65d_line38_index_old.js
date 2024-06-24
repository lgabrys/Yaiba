N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import app from './app';
import locations from './locations';
import locationIndex from './location-index';
const rootPersistConfig = {
  key: 'root',
  getStoredState: getStoredStateMigrateV4({ blacklist: ['app', 'locationIndex'] }),
  storage,
  version: 1,
  blacklist: ['app', 'locationIndex'],
  debug: true,
  // https://github.com/rt2zz/redux-persist/blob/b6a60bd653d59c4fe462e2e0ea827fd76eb190e1/README.md#state-reconciler
  // stateReconciler: autoMergeLevel2,
};
