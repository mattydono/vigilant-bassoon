import { shallow } from 'enzyme';
import React from 'react';
import { App } from '../components/App';

describe('The App root', () => {
  it('renders as expected', () => {
    const shallowRendered = shallow(<App />);
    expect(shallowRendered).toMatchSnapshot();
  });
});
