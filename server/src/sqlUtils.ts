export default class SQLUtils {
    static generateCardSelectionSQL(listsCount = 0) {
        const listTitlesQueryString = `
            INNER JOIN lists ON cards.listid = lists.listid
            WHERE lists.title=${Array(listsCount).fill('?').join(' OR lists.title=')}
        `

        return `
            SELECT cards.data
            FROM cards
            ${listTitlesQueryString}
        `;
    }

    static generateListsSelectionSQL(listsCount = 0) {
        const listIdsQueryString = listsCount ? `WHERE lists.listid=${ Array(listsCount).fill('?').join(' OR lists.listid=') }` : '';

        return `
            SELECT json_object('id', lists.listid, 'title', lists.title, 'cardsQuantity', count(cards.data)) as data
            FROM lists
            NATURAL LEFT OUTER JOIN cards
            ${ listIdsQueryString }
            GROUP BY lists.listid
        `;
    }

    static generateListsInsertionSQL() {
        return `
            INSERT INTO lists (title)
            VALUES (?)
        `;
    }

    static generateListDeletionByTitleSQL() {
        return `
            DELETE FROM lists
            WHERE listid = ?
        `
    }
}

/**
 * CARDS GENERATION SQL
 */

//const sql: { [x: number]: string } = {
// 0: `
// WITH base AS
//     (SELECT words.wordid, words.lemma
//     FROM words
//     LEFT OUTER JOIN lists ON words.wordid = lists.wordid
//     ${wordids}),

//     transcriptions1 AS
//     (SELECT base.wordid, base.lemma, transcriptions.transcription
//     FROM base
//     INNER JOIN transcriptions ON base.wordid = transcriptions.wordid),

//     translations1 AS
//     (SELECT base.wordid, base.lemma, json_group_array(translations.lemma) AS translations
//     FROM base
//     INNER JOIN translations ON base.wordid = translations.wordid
//     GROUP BY base.wordid),

//     general AS
//     (SELECT base.wordid, base.lemma, json_object(
//         'tag', 'General info', 'value', '', 'flags', json_array(), 'relatedItems', json_group_array(json(grouped_general.value))
//     ) AS general
//     FROM base
//     NATURAL LEFT JOIN (
//         SELECT base.wordid, base.lemma, json_object(
//             'id', base.wordid, 'flags', json_array('main'), 'tag', 'Word', 'value', base.lemma, 'relatedItems', json_array()
//         ) AS value
//         FROM base
//         UNION ALL
//         SELECT transcriptions1.wordid, transcriptions1.lemma,  json_object(
//             'flags', json_array('important'), 'tag', 'Transcription', 'value', transcriptions1.transcription, 'relatedItems', json_array()
//         )
//         FROM transcriptions1
//         UNION ALL
//         SELECT translations1.wordid, translations1.lemma, json_object(
//             'tag', 'Translations', 'flags', json_array(), 'value', translations1.translations, 'relatedItems', json_array()
//         )
//         FROM translations1) grouped_general
//         GROUP BY base.wordid),

//     descriptions AS
//     (SELECT base.wordid, base.lemma, synsets.synsetid, synsets.definition
//     FROM base
//     NATURAL LEFT OUTER JOIN senses
//     NATURAL INNER JOIN synsets),

//     synonyms AS
//     (SELECT descriptions.wordid, descriptions.lemma, descriptions.synsetid, words.lemma AS synlemma
//     FROM descriptions
//     LEFT OUTER JOIN senses ON descriptions.synsetid = senses.synsetid
//     INNER JOIN words ON senses.wordid = words.wordid
//     WHERE descriptions.lemma <> words.lemma),

//     examples AS
//     (SELECT descriptions.wordid, descriptions.lemma, descriptions.synsetid, samples.sample
//     FROM descriptions
//     NATURAL INNER JOIN samples
//     WHERE upper(samples.sample) like '%' || upper(descriptions.lemma) || '%'),

//     descriptions_entry AS
//     (SELECT descriptions.wordid, descriptions.lemma, descriptions.synsetid, descriptions.definition, json_group_array(json(value)) AS descriptions_entry
//     FROM descriptions
//     NATURAL LEFT OUTER JOIN (
//         SELECT examples.wordid, examples.lemma, examples.synsetid, json_object(
//             'tag', 'Example', 'value', json_group_array(examples.sample), 'flags', json_array('important'), 'relatedItems', json_array()
//         ) AS value
//         FROM examples
//         GROUP BY examples.synsetid, examples.wordid
//         UNION ALL
//         SELECT synonyms.wordid, synonyms.lemma, synonyms.synsetid, json_object(
//             'tag', 'Synonyms', 'value', json_group_array(synonyms.synlemma), 'flags', json_array('sub'), 'relatedItems', json_array()
//         )
//         FROM synonyms
//         GROUP BY synonyms.synsetid, synonyms.wordid
//     ) grouped_definitions
//     GROUP BY descriptions.synsetid, descriptions.wordid),

//     definitions AS
//     (SELECT de.wordid, de.lemma, json_object(
//         'tag', 'Definitions', 'value', '', 'flags', json_array(), 'relatedItems', json_group_array(
//             json_object('tag', 'Description', 'value', de.definition, 'flags', json_array('regular'), 'relatedItems', json(de.descriptions_entry)
//         )
//     )) AS definitions
//     FROM descriptions_entry de
//     GROUP BY de.wordid)


// SELECT json_group_array(json_object('id', g.lemma, 'value', json_array(json(g.general), json(d.definitions)))) AS cards
// FROM general g
// NATURAL INNER JOIN definitions d
// `,