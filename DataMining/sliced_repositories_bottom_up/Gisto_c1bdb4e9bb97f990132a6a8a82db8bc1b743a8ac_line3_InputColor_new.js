import InputColor from 'components/common/controls/InputColor';
const propSetup = (props = {}) => ({
  color: 'red',
  onChange: jest.fn(),
  ...props
});
