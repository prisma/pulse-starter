# Create a Pulse-ready postgres database on railway.app

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/THgEmX?referralCode=VQ09uv)

## Once the template has deployed

-   Go into your project on the railway dashboard
-   Click on the **Postgres** database
-   Navigate to the **Settings** tab
-   Click the button that says **Restart Database**

Then feel free to delete the service that was created with the template. It should be called **db-setup-service**

-   Click on the **db-setup-service** service
-   Navigate to the **Settings** tab
-   Scroll down and click the **Delete Service from All Environments** button

## How to connect Pulse to your database

[Link to Pulse docs](https://prismaio.notion.site/Pulse-documentation-137ca256325d4a22b80b54a89975f059?pvs=25#f241de6db85f42f5a6db7d27efbd73a1)

-   Go to your [prisma data platform dashboard](https://cloudprojects.prisma.io)
-   Click on the project you want to add Pulse to (or create a new one)
-   Click on **Configure Pulse**
-   Paste in the connection string from the railway dashboard

> The connection string can be found by clicking on the **Postgres** database and navigating to the **Connect** tab, then clicking the copy icon next to `DATABASE_URL`

Once you have done that you will need to wait for Pusle to establish the connection. This can take a few minutes.

Now you can follow [this part](https://prismaio.notion.site/Pulse-documentation-137ca256325d4a22b80b54a89975f059#e8420b42cfd24b94aa6848a2c4993855) of the Pulse documentation to get started using Pulse in your projects.
