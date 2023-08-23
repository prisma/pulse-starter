# Pulse starter project

This repository has been created to help you get started with [Pulse](https://prisma.io/pulse). You will be able to use this project with any Pulse-ready PostgreSQL database. This project comes with a basic [`prisma.schema`](./prisma/schema.prisma) file as well as a Pulse subscription found in the [`index.ts`](./index.ts) file.

> Pulse is currently in Early Access. Please sign up [here](https://prisma.io/pulse) and join our community on [Slack](https://slack.prisma.io) or [Discord](https://pris.ly/discord) to share your feedback.

Table of contents:

-   [Local development](#local-development)
    -   [1. Clone the respository](#1-clone-the-respository)
    -   [2. Create and fill out a `.env` file](#2-create-and-fill-out-a-env-file)
    -   [3. Run the database migration](#3-run-the-database-migration)
    -   [4. Start the Pulse subscription](#4-start-the-pulse-subscription)
    -   [5. Test the subscription](#5-test-the-subscription)
-   [Create a Pulse Starter Project on railway.app](#create-a-pulse-starter-project-on-railwayapp)
    -   [Once the template is deployed](#once-the-template-is-deployed)
        -   [Setup Guide](#setup-guide)
-   [More example Pulse projects](#more-example-pulse-projects)
-   [More information about Pulse](#more-information-about-pulse)

## Local development

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies:

```bash
git clone https://github.com/prisma/pulse-starter.git
cd pulse-starter
npm install
```

### 2. Create and fill out a `.env` file

Rename the existing `.env.example` to `.env`:

```bash
mv .env.example .env
```

<details><summary>The <code>.env</code> file contains the following environment variables:</summary>

    DATABASE_URL=""
    PULSE_API_KEY=""

</details>

-   `DATABASE_URL`: The connection string to your database.
-   `PULSE_API_KEY`: Reference the [Project API Keys](https://www.prisma.io/docs/data-platform/cloud-projects/platform/projects#project-api-keys) section in our documentation to learn how get an API key for your Pulse project.

### 3. Run the database migration

The `prisma/schema.prisma` contains three models based on our [hello-prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql) example project:

```bash
npx prisma migrate dev --name init
```

### 4. Start the Pulse subscription

Run the [script](./index.ts) that contains the code to subscribe to database events:

```bash
npx ts-node index.ts
```

This will run a basic subscription on the `User` table. The code can be found in the [`index.ts`](./index.ts) file. To learn more about the Pulse API and how to use it, check out our [documentation](https://www.prisma.io/docs/data-platform/pulse/api-reference#subscribe).

<details><summary>Pulse user table subscription</summary>

```ts
async function main() {
	const subscription = await prisma.user.subscribe();

	if (subscription instanceof Error) {
		throw subscription;
	}

	for await (const event of subscription) {
		console.log("just received an event:", event);
	}
}
```

</details>

### 5. Test the subscription

The following instructions use Prisma Studio to create a new record in the `User` table. However, you can use any other method to write to the `User` table (e.g. using a SQL client like `psql` or [TablePlus](https://tableplus.com/)) in order to trigger a database change event in Pulse.

1. Start Prisma Studio in a new terminal: `npx prisma studio`
2. Add a new record to the `User` table from Prisma Studio.
3. Return to your terminal where you ran the `npx ts-node index.ts` command.
4. If everything is set up properly you will see an output that is similar to the following.

```json
{
	"action": "create",
	"after": {
		"id": 1,
		"email": "test@prisma.io",
		"name": "test"
	}
}
```

## Deploy a Pulse Starter Project on railway.app

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/pulse-starter?referralCode=VQ09uv)

This project is used together with the [prisma/pulse-railway-pg-config](https://github.com/prisma/pulse-railway-pg-config) repo to build a template on [railway.app](https://railway.app).

[![Watch the setup template setup video](https://img.youtube.com/vi/0nt7CLDqYeY/0.jpg)](https://www.youtube.com/watch?v=0nt7CLDqYeY)

### Once the template is deployed

You will see three things in your railway project:

- **A PostgreSQL database**: The database that will be used with Pulse. It will have tables that map to the models in the `prisma.schema` file.
- **A service called `restart-db-then-delete-me`**: Used to configure your database to work with Pulse.
- **A service called `pulse-starter`**: The service that will run your Pulse project. It also has a `prisma.schema` file with models that map to tables in your database.

> When you deploy this template, you will have two repositories that match the names of the services created on your GitHub account. These repositories are connected to the services in your railway.app project. When you push to these repositories, railway.app will automatically deploy the changes to your project.

#### Setup Guide

<details>

<summary>1. Get your database connection string and delete the <code>restart-db-then-delete-me</code> service.</summary>

1. Click on the service called `restart-db-then-delete-me`.
1. You will see a list of deployments under the **Deployments** tab.
1. Click the most recent build's **View Logs** button.
1. Click on the **Deploy Logs** tab. If the service ran correctly, you should see a message in the logs that says `All done please restart the database` along with the value of your `DATABASE_URL` env var.
1. Copy the `DATABASE_URL` connection string and save it for later.
1. Close the logs view with the **X** in the top right corner of the opened drawer.
1. Navigate to the **Settings** tab of the `restart-db-then-delete-me` service.
1. Scroll down to the bottom and click the red **Delete Service from All Environments** button.

</details>

<details>

<summary>2. Restart your database</summary>

1. Go into your project on the railway dashboard.
1. Click on the **Postgres** database.
1. Navigate to the **Settings** tab.
1. Click the button that says **Restart Database**.
1. Your database is getting restarted.

</details>

<details>

<summary>3. Connect Pulse to your database.</summary>

1. Go to your [Prisma Data Platform dashboard](https://cloudprojects.prisma.io).
1. Click on the project you want to add Pulse to (or create a new one).
1. Click on **Configure Pulse**.
1. Paste in the connection string from the railway dashboard. The connection string can be found by clicking on the **Postgres** database and navigating to the **Connect** tab, then clicking the copy-icon next to `DATABASE_URL`.

Once you have done that, you will need to wait for Pulse to establish the connection. This can take a few minutes.

</details>
<details>

<summary>4. Set the <code>PULSE_API_KEY</code> environment variable</summary>

1. Once you have connected your database to your Pulse project, you will be able to create an API Key.
1. With your `API_KEY`, you can return to your railway.app project.
1. Click on the service called `pulse-railway-starter`.
    > **Note**: You'll likely find that the build failed. This is because the database was not ready when the Pulse connection was made. Do not worry, this is to be expected and not a problem for the next steps.
1. Click on the **Variables** tab.
1. You will see a variable called `PULSE_API_KEY`. If you do not have that variable, create it.
1. Click the three vertical dots on the `PULSE_API_KEY` row and select **Edit**.
1. Paste in the `API_KEY` and click the check mark.

</details>

<details>

<summary>5. Rebuild the service</summary>

1.  Click on the **Deployments** tab.
1.  Click on the three verticle dots on the deployment that failed. Then click **Redeploy**.
1.  When the deployment starts, click the **View Logs** button.
1.  Then click on the **Deploy Logs** tab.
1.  If everything is set up properly, you should see a message that looks like the following.
    ```bash
    Hello from 12fcb1f8adc06640f7d89483bb4ce89d7b3cf7444df7b34ea5b706ed8919a6e6
    ```

This means that your Pulse project is running and listening for events from your database.

</details>

<details>

<summary>6. See user table create event in action </summary>

1. Click on your **Postgres** database in your railway.app project.
1. It should open on the **Data** tab.
1. Click the `User` table and click **Add Row**.
1. Fill out the `email` and `name` fields, then click **Insert**.
1. Return to the logs of your `pulse-railway-starter` service.
1. You should be able to see an output from Pulse for the user being created. Something similar to the following:
    ```
    just received an event: {
        action: 'create',
        after: { id: 1, email: 'test', name: 'test@test.io' }
    }
    ```

Congrats! You now have a Pulse project up and running on [railway.app](railway.app)

</details>

## More example Pulse projects

-   [Pulse Railway Postgres Configuration Template](https://github.com/prisma/pulse-railway-pg-config)

## More information about Pulse

-   [Pulse documentation](https://pris.ly/pulse-docs)
-   [Pulse setup video](https://www.youtube.com/watch?v=Lvn05wM26zs)
-   [Pulse announcement blog post](https://www.prisma.io/blog/introducing-pulse-jtu4UPC8ujy4)
