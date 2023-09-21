import { Database } from "sqlite3";
import DbUtils from '../dbUtils';
import SQLUtils from '../sqlUtils';


export default function(app: any, db: Database) {
    app.get('/rest/cards', (req: any, res: any) => {
        DbUtils.selectFromDb(
            db,
            SQLUtils.generateCardSelectionSQL(req.query.list_id?.length || 0),
            req.query.list_id || []
        )
            .then(result => res.json(result))
            .catch(error => res.status(500).json(error.message))
    })
} 