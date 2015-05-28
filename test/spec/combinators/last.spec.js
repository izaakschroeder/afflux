
import last from '../../../lib/combinators/last';
import { from as xxx, of as just, empty } from 'most';

describe('#last', () => {
	it('should return a promise', () => {
		expect(last(just())).to.have.property('then');
	});

	it('should return the last value of a stream', () => {
		return expect(last(xxx(['a', 'b', 'c']))).to.eventually.equal('c');
	});

	it('should return null for empty streams', () => {
		return expect(last(empty())).to.eventually.be.undefined;
	});
});
