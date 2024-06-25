import manifest from '../../../../package.json';
export default {
  submenu: [{
    label: 'About ' + manifest.productName,
    role: 'about'
  }, {
    id: 'check-for-update',
    label: 'Check for Update',
    allow: !process.mas,
  }, {
  }]
};
