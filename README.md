# ActOne Backend

## Setting up SQL

### Session store

The prisma-session-store library requires the Session table to have a data 
column of type String. String is mapped to VarChar(191) by Prisma, this is not
long enough for the data column of the Session model. Update the Session.data
column to be able to handle long strings:
```
ALTER TABLE Session MODIFY data LONGTEXT;
```

## Migrating SQL

### Locally

```
docker-compose up -d
npm run migrate
docker-compose down
```

### Production

Update CloudSQL to allow external connections

Expose production db locally
```
GOOGLE_APPLICATION_CREDENTIALS=/Users/olivier/Developer/GoogleCloud/{actone_service_account.json} \
    ~/Developer/GoogleCloud/cloud_sql_proxy \
    -instances=actone:europe-west2:{sql-instance-name}=tcp:3305
```

Run migrate script with DATABASE_URL updated for production sql user creds
```
DATABASE_URL=mysql://{user}:{pass}@localhost:3305/actone \
    npm run migrate
```