# Create a Pulse Starter Project on railway.app

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/THgEmX?referralCode=VQ09uv)

This project is used together with the [prisma/pulse-railway-pg-config](https://github.com/prisma/pulse-railway-pg-config) repo to build a template on [railway.app](https://railway.app). However, you can use this project as a basic Pulse starter project by cloning this repo locally and connecting it to any Pulse-ready Postgres database.

> Pulse is currently in early access. Please sign up [here](https://prisma.io/pulse) or join our [discord](https://pris.ly/discord) and reach out to a developer advocate.

## Once the template is deployed

You will need to follow the steps from the [prisma/pulse-railway-pg-config](https://github.com/prisma/pulse-railway-pg-config#once-the-template-is-deployed) README to get started. Once you have finished the ["How to connect Pulse to your database"](https://github.com/prisma/pulse-railway-pg-config#how-to-connect-pulse-to-your-database) section you can return here.

## Railway.app setup

-   Once you have connected your database to your Pulse project, you will be able to make an api key. [See the documentation](https://prismaio.notion.site/Pulse-documentation-137ca256325d4a22b80b54a89975f059#43873d6f60574f84a77ff506017a3b01).

-   With your `API_KEY`, you can return to your railway.app project. - Click on the service called **pulse-railway-starter**.
    > Note: Most likely the build failed. This is due to the database not being ready when the Pulse connection was made. Do no worry this is to be expected.
-   Click on the **Variables** tab.
-   You will see a variable called `PULSE_API_KEY` if you do not have that variable, create it.
-   Click the three verticle dots on the `PULSE_API_KEY` row and select **Edit**.
-   Paste in the `API_KEY` and click the check mark.

### Rebuild the service

-   Click on the **Deployments** tab.
-   Click on the three verticle dots on the deployment that faild. Then click **Redeploy**
-   When the deployment starts click the **View Logs** button.
-   Then click on the **Deploy Logs** tab.
-   If everything is set up properly you should see a message that looks like the following.
    ```bash
    Hello from   12fcb1f8adc06640f7d89483bb4ce89d7b3cf7444df7b34ea5b706ed8919a6e6
    ```
-   This means that your Pulse project is running and listening for events from you database.

### See an event in action

-   Click on your Postgres database in your railway.app project.
-   It should open on the data tab.
-   Click the users table and click **Add Row**.
-   Fill out an email and name fields then click insert.
-   Return to the logs of your **pulse-railway-starter** service.
-   You should be able to see an output from pulse for the user being created. Somthing similar to the following.

```bash
just received an event: {
   action: 'create',
   after: { id: 1, email: 'test', name: 'test@test.io' }
}
```

Congrats! You now have a Pulse project up and running on railway.app

## Local development

To work on this repo locally. You should have a repo in your github account that is a fork of this repo. If you used the railway template. Otherwise you can clone this repo directly.

-   You will need to add your `DATABASE_URL` and `PULSE_API_KEY` to a `.env` file in the root of the project.

-   You can then run the following command to get started.

```bash
npm install
npx prisma migrate dev --name init
npx ts-node index.ts
```

## More example Pulse projects

-   [Pulse Railway Postgres Configuration Template](https://github.com/prisma/pulse-railway-pg-config)
-   [Pulse Multi-Subscription Project](https://github.com/prisma/pulse-starter)

## More information about Pulse

-   [Pulse setup video](https://www.youtube.com/watch?v=Lvn05wM26zs)
-   [Pulse annoucment blog post](https://www.prisma.io/blog/introducing-pulse-jtu4UPC8ujy4)
-   [Pulse documentation](https://pris.ly/pulse-docs)
