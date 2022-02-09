import { validateWord } from "../utils/utils";

describe('Utils', () => {
    it('validateWord', () => {
        expect(validateWord('sal', 'slp')).toEqual([
            { color: 'green' },
            { color: '' },
            { color: 'yellow' },
        ])
    })
})