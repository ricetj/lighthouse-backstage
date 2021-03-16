# FE/BE Plugin Development

This file walks through the creation of a backend plugin and a frontend plugin.

## Plugin Architecture

Take note of the plugin architecture on [this page](https://backstage.io/docs/overview/architecture-overview). It explains when we would have a frontend content-only plugin versus using a backend plugin.
- Standalone
- Service backed
- Third-party backed

## How to create a backend plugin

Run this command in your backstage repository
```
yarn create-plugin --backend
```

The command prompts for a name. You can name it whatever you like. The generated folder will automatically have '-backend' appended on its name, so you can name a backend plugin and its frontend counterpart the same. They will automatically have suffixes applied to differentiate the two.

The command run various subcommands. If you don't already have one at the root of the project, a 'plugins' folder is made. It will then create a |plugin-name|-backend folder under that plugins folder, containing a yarn project.

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

After the backend plugin is created, it needs to be wired to the backstage backend.

Edit packages/backend/src/index.ts
```
-- imports --

// Add this line
import { createRouter as createPluginRouter } from '@internal/my-plugin-backend';

-- other imports --

-- bunch of code --

// Place this code in where the other calls to 'useHotMemoize' are
const pluginEnv = useHotMemoize(module, () => createEnv('plugin'));

// Place this code where the other calls to apiRouter.use are made
// CAUTION: Make sure you put this before apiRouter.use(notFoundHandler()) or you'll get 404s even though its wired
apiRouter.use('/plugin-path', await createPluginRouter(pluginEnv);

-- rest of code --
```

Note: You'll notice that for most plugins there are files in the "packages/backend/src/plugins" folder that import helpers rather that the original createRouter function. Feel free to create helpers as necessary.

Start the backstage app
```
yarn start-backend
```

Send a GET request to http://localhost:7000/api/plugin-path/health
```
curl http://localhost:7000/api/plugin-path/health
```
*Note: This request includes '/api' because in our backstage app, the apiRouter is mounted to /api so all routers it uses are inheriting that '/api' path*

The plugin is now wired to the backend. In order for this plugin to be useful now, we need to make calls to it from the frontend. The easiest way to do this is to create your own frontend plugin

## How to create a frontend plugin

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

Before Changes
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

After Changes
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
