import React from 'react';
import {
  createApp,
  AlertDisplay,
  OAuthRequestDialog,
  SidebarPage,
  githubAuthApiRef,
  SignInPage,
  FlatRoutes
} from '@backstage/core';
import { apis } from './apis';
import * as plugins from './plugins';
import themes from './styles/themes';
import { AppSidebar } from './components/sidenav/sidebar';
import { Route, Navigate } from 'react-router';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin
} from '@backstage/plugin-catalog';
import { CatalogImportPage } from '@backstage/plugin-catalog-import';
// import { Router as ImportComponentRouter } from '@backstage/plugin-catalog-import';
import { TechdocsPage } from '@backstage/plugin-techdocs';
// import { Router as RegisterComponentRouter } from '@backstage/plugin-register-component';
import { Router as TechRadarRouter } from '@backstage/plugin-tech-radar';
import { Router as SettingsRouter } from '@backstage/plugin-user-settings';
import { Router as LighthouseRouter } from '@backstage/plugin-lighthouse';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';

import { EntityPage } from './components/catalog/EntityPage';

import '../src/styles/global/fonts.css';

const app = createApp({
  apis,
  plugins: Object.values(plugins),
  themes: themes,
  components: {
    SignInPage: props => {
      return (
        <SignInPage
          {...props}
          providers={[
            {
              id: 'github-auth-provider',
              title: 'GitHub',
              message: 'Simple Backstage Application Login',
              apiRef: githubAuthApiRef,
            },
          ]}
          align="center"
        />
      );
    },
  },
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
    });
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();
const deprecatedAppRoutes = app.getRoutes();

/*
<Route
path="/catalog/*"
element={<CatalogRouter EntityPage={EntityPage} />}
/>
 <Route
path="/catalog-import"
element={
  <ImportComponentRouter catalogRouteRef={catalogRouteRef} />
}
/>
<Route
            path="/register-component"
            element={
              <RegisterComponentRouter catalogRouteRef={catalogRouteRef} />
            }
          />

const catalogRouteRef = createRouteRef({
  path: '/catalog',
  title: 'Service Catalog',
});
*/

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <SidebarPage>
        <AppSidebar />
        <FlatRoutes>
          <Navigate key="/" to="/catalog" />
          <Route path="/catalog" element={<CatalogIndexPage />} />
          <Route
            path="/catalog/:namespace/:kind/:name"
            element={<CatalogEntityPage />}
          >
            <EntityPage />
          </Route>
          <Route path="/catalog-import" element={<CatalogImportPage />} />

          <Route path="/docs" element={<TechdocsPage />} />
          <Route path="/create" element={<ScaffolderPage />} />
          <Route
            path="/tech-radar"
            element={<TechRadarRouter width={1500} height={800} />}
          />

          <Route path="/lighthouse/*" element={<LighthouseRouter />} />
          <Route path="settings" element={<SettingsRouter />} />
          { deprecatedAppRoutes}
        </FlatRoutes>
      </SidebarPage>
    </AppRouter>
  </AppProvider>
);

export default App;
