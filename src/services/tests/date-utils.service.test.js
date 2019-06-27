import DateUtilsService from '../date-utils.service.js';

it('should return true for today date', () => {
  	const date = new Date();
  	expect(DateUtilsService.isToday(date)).toBe(true);
});

it('should return false if not today date', () => {
  	const date = new Date(12,12,2012);
  	expect(DateUtilsService.isToday(date)).toBe(false);
});
