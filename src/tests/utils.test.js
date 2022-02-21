import { validateWordRow, buildKeyMap, getKeyboardClasses } from "../utils/utils";

// describe('Utils', () => {
    // it('validateWordRow', () => {
    //     expect(validateWordRow('sal', 'slp')).toEqual([
    //         { color: 'green' },
    //         { color: '' },
    //         { color: 'yellow' },
    //     ])
    // })
    // it('buildKeyMap', () => {
    //     expect(buildKeyMap(['salut', 'sal'])).toEqual({
    //         s: 2,
    //         a: 2,
    //         l: 2,
    //         u: 1,
    //         t: 1
    //     })
    // })
    // it('getKeyboardClasses', () => { 
    //     // char not in originalWord
    //     const getClass = getKeyboardClasses('salut', 'toast')
    //     expect(getClass('k')).toEqual('grey')
    //     // char found but not at the right place
    //     expect(getClass('a')).toEqual('yellow')
    //     // char found and at the right place
    //     const getClass2 = getKeyboardClasses('solut', 'toast')
    //     expect(getClass2('o')).toEqual('green')
    //     // todo... when there is duplicated chars in the words
    //     // e.g. getKeyboardClasses('t', 'salut', 'toast')
    //     //                                   ^    ^   ^
    // })
// })