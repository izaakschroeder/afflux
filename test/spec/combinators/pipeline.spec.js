
import pipeline from '../../../lib/combinators/pipeline';
import { empty } from 'most';

describe('#pipeline', () => {
	it('should return a stream', () => {
		const result = pipeline(() => { }, empty());
		expect(result).to.have.property('source');
	});
});
