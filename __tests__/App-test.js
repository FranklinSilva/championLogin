/**
 * @format
 */

import 'react-native';
import React from 'react';
import Welcome from '../src/pages/welcome';
import Champion from '../src/pages/champion';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../src/reducers';
import {getChampionInfo, getChampionInfoSuccess} from '../src/actions/champion';

// Note: test renderer must be required after react-native.
import renderer, { create, act } from 'react-test-renderer';

//Mocks
jest.mock('@react-navigation/core')

jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});

jest.mock('react-navigation', () => ({
  withNavigation: (Component) => (props) => (
    <Component navigation={{ navigate: jest.fn() }} {...props} />
  ),
}))

const store = createStore(reducer, applyMiddleware(thunk))


/* WELCOME PAGE */
const welcome = create(
<Provider store={store}>
  <Welcome />
</Provider>);

it('welcome renders correctly', () => {
  expect(welcome).toMatchSnapshot();
});

it('Login Github Press', () => {
  //press the button
  const githubButton = welcome.root.findByProps({testID: 'gitHubLogin'}).props;
  act(() => githubButton.onPress());
})


it('Get User Info', () => {
  expect(getChampionInfo('idToken123')).toBeDefined();
  expect(getChampionInfoSuccess({},'idToken123')).toBeDefined();
})

/* CHAMPION PAGE */
const champion = create(
  <Provider store={store}>
    <Champion />
  </Provider>);

it('champion renders correctly', () => {
  expect(champion).toMatchSnapshot();
});
