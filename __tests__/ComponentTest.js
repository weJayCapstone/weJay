import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import CreatePlaylistForm from '../screens/CreatePlaylistForm'
import HomeScreen from '../screens/HomeScreen';
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

describe('Component Snapshots', () => {

  it(`App.js renders correctly`, () => {
    const tree = renderer.create(<App/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('CreatePlaylistForm renders correctly', () => {
    const store = mockStore({});
    const tree =renderer.create(
        <Provider store ={store}>
            <CreatePlaylistForm/>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it(`HomeScreen renders correctly`, () => {
    const store = mockStore({})
    const tree = renderer.create(
      <Provider store={store}>
          <HomeScreen/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
