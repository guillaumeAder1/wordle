import { validateWordRow, buildKeyMap } from "../utils/utils";

describe('Utils', () => {
    it('validateWordRow', () => {
        expect(validateWordRow('sal', 'slp')).toEqual([
            { color: 'green' },
            { color: '' },
            { color: 'yellow' },
        ])
    })
    it('buildKeyMap', () => {
        expect(buildKeyMap(['salut', 'sal'])).toEqual({
            s: 2,
            a: 2,
            l: 2,
            u: 1,
            t: 1
        })
    })
})