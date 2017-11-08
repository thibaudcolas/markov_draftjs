const index = require('./index');

describe('markov-draftjs', () => {
    it('exports its sample ContentState', () => {
        expect(index.length).toEqual(792);
    });
});
