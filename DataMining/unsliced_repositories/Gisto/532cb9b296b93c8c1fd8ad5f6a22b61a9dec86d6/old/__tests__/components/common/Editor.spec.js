import Editor from 'components/common/Editor';

const propSetup = (props) => ({
  file: {
    content: 'hi',
    language: 'text'
  },
  onChange: jest.fn(),
  language: 'text',
  id: '123123123123',
  className: '',
  edit: true,
  ...props
});

const setup = (props) => shallow(<Editor { ...props }/>);

describe('COMPONENTS - <Editor>', () => {
  test('render Editor', () => {
    const component = setup(propSetup());

    expect(component).toMatchSnapshot();
  });

  test('render markdown Editor', () => {
    const component = setup(propSetup({
      file: {
        content: '# hi',
        language: 'Markdown'
      },
      edit: true
    }));

    expect(component).toMatchSnapshot();
  });
});
