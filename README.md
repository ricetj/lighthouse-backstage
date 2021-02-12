# Backstage demo app

This is a basic demo of the backstage developer platform.

Configured in this demo is:

- GitHub OAuth for Backstage
- Ability to create repositories in GitHub using the built-in templates
- Service catalog is stored in a Postgres database, rather than the in-memory database that is configured by default
- Runs natively or via docker-compose

## Running the app locally

To get started, you'll need to [register an OAuth application on GitHub](https://github.com/settings/developers) (callback is localhost:7000 for now) and a [GitHub personal access token](https://github.com/settings/tokens). For the personal access token, it needs repo, workflow, and admin:repo_hook access.

The application can be built for local development either natively or using a docker setup. After obtaining the necessary GitHub Auth Tokens skip to the desired sections:

- [Running natively](#running-natively)
- [Running with Docker](#running-with-docker)

## Running natively

Create an `app-config.local.yaml` file and store your GitHub Auth secrets in their corresponding keys. You should copy the provided `app-config.local.yaml.sample` file as a starting point for your keys. When running backstage locally the app will pull settings from both `app-config.yaml` and `app-config.local.yaml`, but the local settings will override the defaults.

> :warning: **`app-config.local.yaml` is gitignored by default, but take care not to accidentally commit this file or accidentally store your secrets in the sample file provided**

You will also need a local Postgresql instance running to access most backstage features. A simple way to do this is to use [Postgres.app](https://postgresapp.com/).

Once you have your local config file set and your database running you should run the following commands in the project root:

```
yarn install
yarn tsc
yarn build
```

Finally, in two separate terminal windows you will need to run the following commands:

```
yarn start-backend
```

and

```
yarn start
```

The front-end will be available at http://localhost:3000 once the app finishes compiling.

## Running with Docker

> :warning: **If you have built the app natively prior to running Docker** you should delete your `app-config.local.yaml` file to prevent any config overrides

Store your GitHub Auth secrets into a `.env` file in your local checkout like below. You can use the `.env.sample` file provided as it contains default environment variables that are required for custom plugins.

```
export GITHUB_TOKEN=<token>
export AUTH_GITHUB_CLIENT_ID=<id>
export AUTH_GITHUB_CLIENT_SECRET=<secret>
```

Then, you need to create the images locally. Run:

```
yarn install
yarn tsc
yarn build
yarn docker-start
```

This will start the stack in the background and return to a shell prompt. The front-end will be available at http://localhost:3000 once the dev server finishes compiling. You can watch progress or view logs with `yarn docker-logs`.

To stop and remove the containers you can run the following command:

```
yarn docker-stop
```

### Why build images outside of docker-compose?

Yes, docker-compose can build images.. but it's not quite that simple. The image build process that Backstage ships with uses `yarn build` outside the container to generate some artifacts that are used as input to the Docker image build process. Namely, it generates the skeleton.tar file. Rather than fighting this, we're just creating the image as a secondary step. Incidentally, this means it's actually quite a bit faster build on Docker Desktop on Windows or Mac.
