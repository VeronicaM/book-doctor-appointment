 // get the mocked version of axios
 import mockAxios from 'axios';

// enzyme
import { shallow } from 'enzyme';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Services
import UserService from './services/user.service.js';

// Mocks
import userMock from './__mocks__/user.mock.js';

beforeEach(() => {
	mockAxios.get.mockImplementation(() => Promise.resolve({
         data: userMock.userData
     }));
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(shallow(<App />), div);
});
