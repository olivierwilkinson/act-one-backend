# ActOne Backend

## Migrating SQL

### Locally

```
npm run migrate:local
```

### Production

Expose production db locally
```
GOOGLE_APPLICATION_CREDENTIALS=/Users/olivier/Developer/GoogleCloud/actone_service_account.json \
    ~/Developer/GoogleCloud/cloud_sql_proxy \
    -instances=actone:europe-west2:sql-instance-name=tcp:3305
```

Run migrate script with DATABASE_URL updated for production sql user creds
```
DATABASE_URL=mysql://user:pass@localhost:3305/actone \
    npm run migrate
```