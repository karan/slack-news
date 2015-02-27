slack-hn
========

Read Hacker News right from Slack just typing `/hn`.

![](http://i.imgur.com/kpdF7SR.gif)

## Usage

From any Slack channel, just type `/hn`. The posts will be shown on the same channel.

## Installation

- Go to your channel
- Click on **Configure Integrations**.
- Scroll all the way down to **DIY Integrations & Customizations** section.

#### Add a new slash command with the following settings:

- Click on **Add** next to **Slash Commands**.

  - Command: `/hn`
  - URL: `http://slack-hn.herokuapp.com/hn`
  - Method: `GET`

  ![](http://i.imgur.com/vNL3MCk.png)

All other settings can be set on your own discretion.

#### Set up a new incoming webhook

- Click on **Add** next to **Incoming WebHooks**.

  - Choose a channel to integrate with (this doesn't matter -- it'll always respond to the channel you called it from)
  - Note the new Webhook URL.

  ![](http://i.imgur.com/JRJ92xj.png)

- Set a new environment variable called `SLACK_WEBHOOK_URL`.

  ```bash
  # Unux systems (AWS etc)
  $ export SLACK_WEBHOOK_URL=<URL>

  # Heroku
  $ heroku config:set SLACK_WEBHOOK_URL=<URL>
  ```

#### (Optional) Setup your own server

Although the code is hosted at `http://slack-hn.herokuapp.com/`, you are free to setup your own instance.

Make sure to change the **Slash Command** URL to whatever your URL is.

##### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/karan/slack-hn/tree/master)

And then:

```bash
$ heroku config:set SLACK_WEBHOOK_URL=<URL>
```

##### Other servers

```bash
$ git clone git@github.com:karan/slack-hn.git
$ cd slack-hn
$ npm install
$ export SLACK_WEBHOOK_URL=<URL>
$ node app.js
```

## Contributing

- Please use the [issue tracker]() to report any bugs or file feature requests.

- PRs are welcome.
