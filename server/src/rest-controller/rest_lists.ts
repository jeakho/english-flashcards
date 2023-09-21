import { Database } from "sqlite3";
import DbUtils from '../dbUtils';
import SQLUtils from '../sqlUtils';


export default function(app: any, db: Database) {
    app.get('/rest/lists', async (req: any, res: any) => {
        DbUtils.selectFromDb(db, SQLUtils.generateListsSelectionSQL(req.query.list_id?.length || 0), req.query.list_id || [])
            .then(result => res.json(result))
            .catch(err => res.status(500).json(err.message))
    });

    app.post('/rest/list', (req: any, res: any) => {
        const { title } = req.body;

        DbUtils.insertIntoDb(db, SQLUtils.generateListsInsertionSQL(), [title])
            .then(async listId => res.json(await DbUtils.selectOneFromDb(db, SQLUtils.generateListsSelectionSQL(1), [listId])))
            .catch(_ => res.status(500).json('A list with this name already exists!'));
    });

    app.delete('/rest/list', (req: any, res: any) => {
        const listId = req.query.id;

        DbUtils.deleteFromDb(db, SQLUtils.generateListDeletionByTitleSQL(), [listId])
            .then(result => res.json(result));
    })
}