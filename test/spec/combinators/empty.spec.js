
import isEmpty from '../../../lib/combinators/empty';
import { empty, of as just } from 'most';

describe('#empty', () => {
	it('should return a promise', () => {
		expect(isEmpty(just())).to.have.property('then');
	});

	it('should return true for empty streams', () => {
		expect(isEmpty(empty())).to.eventually.equal(true);
	});

	it('should return false for non-empty streams', () => {
		expect(isEmpty(just())).to.eventually.equal(false);
	});
});
