
import action from '../../lib/action';
import { observe } from 'most';

describe('#action', () => {
	it('is callable', () => {
		expect(action).to.be.instanceof(Function);
	});

	it('produces a new function', () => {
		const result = action(() => {});
		expect(result).to.be.instanceof(Function);
	});

	it('produces a stream', () => {
		const result = action(() => {});
		expect(result).to.have.property('source');
	});

	it('passes through arguments', () => {
		let spy = sinon.spy();
		const result = action(spy);
		result('foo', 'bar');
		expect(spy).to.be.calledWith('foo', 'bar');
	});

	it('should become active when someone is listening', (done) => {
		const result = action(() => 'foo');
		const spy = sinon.spy();
		observe(spy, result);
		setImmediate(() => {
			expect(result).to.have.property('active', true);
			done();
		});
	});

	it('should be inactive by default', () => {
		const result = action(() => 'foo');
		expect(result).to.have.property('active', false);
	});

	it('it emits results to the stream', (done) => {
		const result = action(() => 'foo');
		const spy = sinon.spy();
		observe(spy, result);
		setImmediate(() => {
			result();
			expect(spy).to.be.calledOnce.and.calledWith('foo');
			done();
		});
	});
});
