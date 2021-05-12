[![Build and test](https://github.com/department-of-veterans-affairs/lighthouse-backstage/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/department-of-veterans-affairs/lighthouse-backstage/actions/workflows/build-and-test.yml)

# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App.

# Deployment

- Deployment is automatic and triggered on merge to master
- Deployment [workflow](./.github/workflows/build-test-deploy.yml) uses the Heroku CLI to build and deploy the docker image which follows the [Dockerfile](./Dockerfile)
- Deploys an in memory [Multi-stage build](https://backstage.io/docs/deployment/docker#multi-stage-build) to [Heroku](https://lighthouse-backstage.herokuapp.com/catalog)
- scaffolding and techdocs plugins are disabled



