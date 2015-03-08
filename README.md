slack-news
========

Read news from multiple sources within Slack by just typing `/news`.

![](http://i.imgur.com/9OU1ICP.gif)

## Usage

From any Slack channel, just type `/news [source]`. The news will be shown on the same channel.


#### Default sources

1. Hackers News (`/news hn`)
2. Product Hunt (`/news ph`)

## Installation

### Setup your own server

Make sure to change the **Slash Command** URL to whatever your URL is.

##### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/karan/slack-news/tree/master)

And then:

```bash
$ heroku config:set SLACK_WEBHOOK_URL=<URL>
$ heroku config:set PH_TOKEN=<PRODUCTHUNT TOKEN>
```

##### Other servers

```bash
$ git clone git@github.com:karan/slack-news.git
$ cd slack-news
$ npm install
$ export SLACK_WEBHOOK_URL=<URL>
$ export PH_TOKEN=<PRODUCTHUNT TOKEN>
$ node app.js
```

##### Notes

1. `SLACK_WEBHOOK_URL` will be found after setting up Incoming WebHooks. (See below)
2. Retrieve Product Hunt token from https://www.producthunt.com/v1/oauth/applications

### Setup Integration

- Go to your channel
- Click on **Configure Integrations**.
- Scroll all the way down to **DIY Integrations & Customizations** section.

#### Add a new slash command with the following settings:

- Click on **Add** next to **Slash Commands**.

  - Command: `/news`
  - URL: `http://YOUR-URL.com/news`
  - Method: `GET`

  ![](http://i.imgur.com/vNL3MCk.png)

All other settings can be set on your own discretion.

#### Set up a new incoming webhook

Click on **Add** next to **Incoming WebHooks**.

  - Choose a channel to integrate with (this doesn't matter -- it'll always respond to the channel you called it from)
  - Note the new Webhook URL.

  ![](http://i.imgur.com/JRJ92xj.png)

## Contributing

- Please use the [issue tracker]() to report any bugs or file feature requests.

- PRs to add new sources are welcome. Please make sure to test each source you add and try to follow the coding style.
