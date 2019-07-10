import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import { openInfoMOdal } from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

it('knows that some things arenot equal', () => {
  expect("hello" != "Hello").toBe(true)
})
describe('openDone', () => {
  describe('when clicked', () => {
    it('opens info modal', () => {
    });
  });
});