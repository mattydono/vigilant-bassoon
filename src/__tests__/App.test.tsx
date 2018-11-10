import { shallow } from 'enzyme';
import React from 'react';
import { App } from '../App';

describe('The App root', () => {
  it('renders as expected', () => {
    const shallowRendered = shallow(<App />);
    expect(shallowRendered).toMatchSnapshot();
  });
});
