slack-hn
========

Show current Hacker News homepage

////GIF/////

## Install

Add a new slash command with the following settings:
Command: /roll
URL: http://yourhost.com/roll
Method: get
Label: roll dice!

Set up a new incoming webhook
Choose a channel to integrate with (this doesn't matter -- it'll always respond to the channel you called it from)
Get your token from this page (this is what you'll use when you launch the server)

Set env var `SLACK_WEBHOOK_URL`.
