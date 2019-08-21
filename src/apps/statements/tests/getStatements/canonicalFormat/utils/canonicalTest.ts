import createStatement from '../../../utils/createStatement';
import setup from '../../../utils/setup';
import assertCanonicalStatement from './assertCanonicalStatement';

const TEST_LANG_1 = 'en-GB';
const TEST_LANG_2 = 'en-US';
const TEST_LANG_3 = 'en';
const TEST_TEXT_1 = 'test1';
const TEST_TEXT_2 = 'test2';

export default (createLangMapStatement: (langMap: any) => any) => {
    setup();

    const assertCanonicalLangMap = async (
        exactLangMap: any,
        canonicalLangMap: any,
        langs: string[],
    ): Promise<void> => {
        const exactStatement = createStatement(createLangMapStatement(exactLangMap));
        const canonicalStatement = createStatement(createLangMapStatement(canonicalLangMap));
        await assertCanonicalStatement(exactStatement, canonicalStatement, langs);
    };

    it('should return the canonical lang map when langs match', async () => {
        await assertCanonicalLangMap(
            {
                [TEST_LANG_1]: TEST_TEXT_1,
                [TEST_LANG_2]: TEST_TEXT_2,
            },
            {
                [TEST_LANG_1]: TEST_TEXT_1,
            },
            [TEST_LANG_2, TEST_LANG_1],
        );
    });

    it('should return the original lang map when langs are not matching', async () => {
        const langMap = {
            [TEST_LANG_1]: TEST_TEXT_1,
            [TEST_LANG_2]: TEST_TEXT_2,
        };
        await assertCanonicalLangMap(langMap, langMap, [TEST_LANG_3]);
    });
};
