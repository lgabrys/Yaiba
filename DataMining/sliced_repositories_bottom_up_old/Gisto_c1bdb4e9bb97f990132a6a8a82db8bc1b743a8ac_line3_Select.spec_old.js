import Select from 'components/common/controls/Select';
const propSetup = (props) => ({
  className: 'classified',
  value: 'bla-bla',
  onChange: jest.fn(),
  children: [
    <option key={'1'}>1</option>,
    <option key={'2'}>2</option>,
    <option key={'bla-bla'}>bla-bla</option>
  ],
  ...props
});
