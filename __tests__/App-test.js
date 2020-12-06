/**
 * @format
 */

import 'react-native';
import React from 'react';
import Welcome from '../src/pages/welcome';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../src/reducers';
// Note: test renderer must be required after react-native.
import renderer, { create } from 'react-test-renderer';

//Mocks
jest.mock('@react-navigation/core')

jest.mock('react-navigation', () => ({
  withNavigation: (Component) => (props) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
}))

const store = createStore(reducer, applyMiddleware(thunk))

const welcome = create(
<Provider store={store}>
  <Welcome />
</Provider>);

it('renders correctly', () => {
  expect(welcome).toMatchSnapshot();
});
