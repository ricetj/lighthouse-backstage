# FE/BE Plugin Development Backstage

This file walks through creating a backend plugin and a frontend plugin that integrates with it. I recommend you read the Plugin Architecture document first. It's likely you may only need a frontend plugin and integrate it with the proxy rather than a custom backend plugin - or it's possible your frontend plugin may make use of existing core plugins rather than implementing your own.

## Plugin Architecture

Take note of the plugin architecture on [this page](https://backstage.io/docs/overview/architecture-overview). It explains when we would have a content-only plugin versus using a backend plugin.
- Standalone
- Service backed
- Third-party backed

## Create backend plugin

Run this command in your backstage repository
```
yarn create-plugin --backend
```

The command prompts for a name. You can name it however you like. The generated folder will automatically have '-backend' appended on its name, so there's no need to differentiate this name from what you'll call your frontend plugin.

The command run various subcommands that create a 'plugins' folder (if you don't already have one) at the root of the project. It will then create a |plugin-name|-backend folder under that plugins folder, containing a yarn project.

The created backend plugin should automatically include a '/health' route that will return { status: 'ok' } when it receives a GET request.

Notice: The backend plugins are express apps that import various backstage/core functions. You can expand the backend plugins however far you want as long as you use express.

Run the plugin in standalone mode (this is for dev only)
- Navigate into plugins/|your-plugin|-backend folder
- Run `yarn start`

Send a GET request to http://localhost:7000/|your-plugin|/health
```
curl http://localhost:7000/|your-plugin|/health
```

This GET request should return { status: 'ok' }

Stop your standalone app with Ctrl + C (Cmd + Z)

## Wire backend plugin to packages/backend/src/index.ts

After the backend plugin is created, it needs to be wired to the backstage backend application.

Edit packages/backend/src/index.ts
```
-- imports --

// Add this line
import { createRouter as createPluginRouter } from '@internal/my-plugin-backend';

--other imports --

-- bunch of code --

// Place this code in where the other calls to 'useHotMemoize' are
const pluginEnv = useHotMemoize(module, () => createEnv('plugin'));

// Place this code in where the other calls to apiRouter.use are made
// CAUTION: Make sure you put this before apiRouter.use(notFoundHandler()) or you'll get 404s even though its wired
apiRouter.use('/plugin-path', await createPluginRouter(pluginEnv);

-- rest of code --
```

Note: You'll notice that for most plugins there are files in the "packages/backend/src/plugins" folder that import helpers rather that the original createRouter function.

Start the backstage app
```
yarn start-backend
```

Send a GET request to http://localhost:7000/api/plugin-path/health
```
curl http://localhost:7000/api/plugin-path/health
```
*Note: This request includes '/api' because in our backstage app, we mount the apiRouter to /api so all routers it uses are inheriting that '/api' path*

In order for the frontend to call our backend API we need to use the discvoeryAPI on the frontend, and pass it |plugin-path| to get the appropriate backend URL. We set up the discovery API in the following *Create frontend plugin* section.

## Create frontend plugin

Run this command at the root of the backstage project
```
yarn create-plugin
```

Enter a name for your plugin. It will automatically have a '-frontend' suffix on the folder.

The frontend plugin will already be accessible on the frontend by going to http://localhost:3000/|your-plugin|

### Optional: Create visible link to the plugin

By default there is no visible link to your frontend plugin. If you want to make one you can
- add a SideBarItem tag to packages/app/src/components/sidenav/sidebar.tsx

### Consume an API

Each API that can be consumed should export a variable named |api-name|ApiRef.
Ex: If I want to use the discoveryApi, I can import discoveryApiRef from the node package containing the discoveryApi.

In a frontend component, use the `useApi` hook (or `withAPI` if using React classes). Pass `useApi` the API ref.
```
import { someApiRef, SomeApi } from 'some-package';
import { useApi } from '@backstage/core';

const MyComponent = () => {
  // Notice useApi does take generics so we can pass it the correct class/interface as well for type safety
  const someApi = useApi<SomeApi>(someApiRef);

  // Make a call to the api anywhere after we define it
  const displayData = someApi.someMethodIMade();

  // Other code
};
```

### Write an API class in the frontend app

If we want to create our own API that components can consume, maybe even components in other frontend plugins, we can create our own frontend API. Theoretically we could create react components that contain hooks for all of these APIs but that could be come messy and result in a lot of repeated code.

https://backstage.io/docs/api/utility-apis - Covers the majority of what's needed to accomplish this

In plugins/|plugin-name| create a file `api.ts` in the src folder.

This file needs to
- export a class that takes an object with all of its dependencies (for this example we use discoveryApi)
- export an ApiRef

Ex:
```
export const myApiRef = createApiRef<MyApi>({
  id: 'this can be anything',
  description: 'this is an optional field'
});

interface MyApiDependencies {
  discoveryApi: DiscoveryApi;
}

// Really we should export an interface and have this implement the interface
export class MyApi {
  public discoveryApi: DiscoveryApi;
  
  constructor({discoveryApi}: MyApiDependencies) {
    this.discoveryApi = discoveryApi;
  }
  
  async myMethod(): Promise<boolean> {
    const backendPluginUrl = await this.discoveryApi.getBaseUrl('a-backend-plugin-name');
    
    // send request
    // return result
  }
}
```

### Wire the API class to the backstage app

Open plugin/|plugin-name|/src/plugin.ts

Find where `createPlugin` is called and update the object passed to it to include an 'apis' array.

**Example**

Before
```
export const plugin = createPlugin({
  id: 'my-plugin-frontend',
  register({ router }) {
    // routeRouteRef should already be defined in this file
    // The second field is whatever the main component of your plugin is
    router.addRoute(rootRouteRef, MainPluginPage);
  },
});
```

After
```
export const plugin = createPlugin({
  id: 'my-plugin-frontend',
  apis: [
    createApiFactory({
      api: myApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }: { discoveryApi: DiscoveryApi }) => (
        new MyAPI({ discoveryApi })
      )
    })
  ],
  register({ router }) {
    // routeRouteRef should already be defined in this file
    // The second field is whatever the main component of your plugin is
    router.addRoute(rootRouteRef, MainPluginPage);
  },
});
```

### Wire the API class to components

Open up a component you want to use your API/hit your backend plugin and consume it with `useApi` just like you would for any other API.
```
import { useApi } from '@backstage/core';
import { MyAPI, myApiRef } from '../../api';

const MyComponent = () => {
  // This is just to illustrate use. Likely the API will use async methods and this will be more complicated
  const myApi = useApi<MyAPI>(myApiRef);
  
  const something = myApi.someFunctionIMade();
  
  return <p>{ something }</p>
}
```

## Supplementary Info

### List of Utility APIs

This README contains several APIs that can used. These APIs (which appear to really be frontend APIs - they do not correlate to backend code) can be used by components.

This makes the auth APIs and alert API particularly useful since we can make components that use those APIs rather than reimplementing the logic from scratch.

https://backstage.io/docs/reference/utility-apis/README

### Other Links

At the time this is made, most anything under the API references dropdown on backstage.io contains useful information
- [Utility APIs](https://backstage.io/docs/api/utility-apis)
- [reference/utility-apis/README](https://backstage.io/docs/reference/utility-apis/README)
- [createPlugin](https://backstage.io/docs/reference/createPlugin)
- [createPlugin - featureFlags](https://backstage.io/docs/reference/createPlugin-feature-flags)
