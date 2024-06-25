import Checkbox from 'components/common/controls/Checkbox';
const propSetup = (props = {}) => ({
  className: 'classified',
  checked: true,
  onChange: jest.fn(),
  ...props
});
