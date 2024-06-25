N
o
 
l
i
n
e
s
import prefs from '../../utils/prefs';
export function watchPref(prefKey, getExprs) {
  return function(findMenuItem) {
    prefs.watch(prefKey, newValue => {
      findMenuItem((menuItem, browserWindow) => {
      });
    });
  };
}
