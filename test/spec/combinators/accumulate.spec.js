
import accumulate from '../../../lib/combinators/accumulate';
import { of as just } from 'most';

describe('#accumulate', () => {
	it('should return a stream', () => {
		const result = accumulate(() => { }, just());
		expect(result).to.have.property('source');
	});
});
