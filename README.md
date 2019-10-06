# mailspring-matomo-tracking
Add Matomo based Pixel Tracking when using the Mailspring Email client.

This is more of a POC than anything else, I might swing back at some point and make it configurable/add in the ability to customize params and whatnot, but for the moment this is definitely an as is "Might work" kinda situation.

# Setup
## Get Mailspring
This is a plugin for the [MailSpring](https://github.com/Foundry376/Mailspring) email client. client.

So you should probably go [download and install MailSpring]((https://getmailspring.com/download)) if you don't already have it.

## Sign up for a Matomo Cloud account
Matomo is an underdog-ish google analytics alternative that's open source and does a pretty respectable job. It's what I'm using to back the email tracking for this plugin, so go sign [for a trial cloud account](https://matomo.org/start-free-analytics-trial/) and get it set up.

## Download and install this plugin
Download this plugin, and follow the distressingly outdated instructions for [installing MailSpring plugins](https://foundry376.github.io/Mailspring/guides/GettingStarted.html)

## Configure Plugin
Open up lib/matomo-pixel.js and put your personal matomo subdomain in where it says to
```
const matomo_domain = 'your-matomo-domain-goes-here';
```

