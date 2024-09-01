# ActOne Backend

This is the Express GraphQL backend for ActOne.

The choice to use GraphQL was made because this project is predominantly an area to test out new technologies and learn new things. It was not chosen because it was the best tool for the job.

## Getting Started

Ensure you are using the correct Node version listed in the .nvmrc file, then install dependencies using npm.

```bash
npm install
```

For Prisma to connect to the DB correctly the DATABASE_URL environment variable must be set.

You can use Docker Compose to start the MySQL database locally:

```bash
docker-compose up -d
```

Then the DATABASE_URL environment variable can be set to the following:

```bash
export DATABASE_URL="mysql://actone:123@localhost:3305/actone"
```

Now if you have not done so in the past you must migrate the database:

```bash
npm run migrate
```

You will need to amend one column in the database to allow for long strings to be stored in the Session table. This can be done using the same connection string as above using mysqlsh or any other MySQL client:

```sql
ALTER TABLE Session MODIFY data LONGTEXT;
```

Now you can run the following command to start the server:

```bash
npm run dev
```

When file changes are found the Nexus and Prisma schemas will be regenerated and the server will be restarted.

### Session store

The prisma-session-store library requires the Session table to have a data
column of type String. String is mapped to VarChar(191) by Prisma, this is not
long enough for the data column of the Session model. Update the Session.data
column to be able to handle long strings:

```sql
ALTER TABLE Session MODIFY data LONGTEXT;
```
