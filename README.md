[![Build and test](https://github.com/department-of-veterans-affairs/lighthouse-backstage/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/department-of-veterans-affairs/lighthouse-backstage/actions/workflows/build-and-test.yml)

# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App.

# Deployment

- Deploys an in memory [Multi-stage build](https://backstage.io/docs/deployment/docker#multi-stage-build) to [Heroku](https://lighthouse-backstage.herokuapp.com/catalog)
- scaffolding and techdocs plugins are disabled
- only deploy the latest commit on master

## To deploy

### Prerequisites

- you will need access to va-559 Heroku account to access the [lighthouse-backstage app](https://dashboard.heroku.com/apps/lighthouse-backstage). Talk to the codeowners to get access.
- Follow the [Configuring the CLI](https://backstage.io/docs/deployment/heroku#configuring-the-cli) instructions to set up deployment from your local machine.
- clone the repo

### New deployment

1. navigate to the project root
2. checkout master and pull latest
3. Run:

```
$ heroku container:push web -a lighthouse-backstage
$ heroku container:release web -a lighthouse-backstage
```

