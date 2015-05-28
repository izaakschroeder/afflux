
import pipeline from '../../../lib/combinators/pipeline';

describe('#pipeline', () => {
	it('should return a stream', () => {
		const result = pipeline();
		expect(result).to.have.property('source');
	});
});
