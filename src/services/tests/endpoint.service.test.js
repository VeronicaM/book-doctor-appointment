import EndpointService from '../endpoint.service.js';

it('should return empty value if no endpoint name present', () => {
  	const url = EndpointService.buildURL();
  	expect(url).toBe('');
});

it('should plug params values in given existing endpoint', () => {
  	const url = EndpointService.buildURL(EndpointService.constants.USER, { uid: 1 });
  	const containsParams = url.indexOf('users/1') > -1;

  	expect(containsParams).toBe(true);
});