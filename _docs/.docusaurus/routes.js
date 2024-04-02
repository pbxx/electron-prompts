import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '411'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '196'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '06a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '426'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '49b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '8ad'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '91e'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '595'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '112'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'e17'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'b89'),
            routes: [
              {
                path: '/docs/api/data-structures/button-element-objects',
                component: ComponentCreator('/docs/api/data-structures/button-element-objects', '485'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/docs/api/data-structures/form-element-objects',
                component: ComponentCreator('/docs/api/data-structures/form-element-objects', '9fc'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/docs/api/data-structures/promptResult',
                component: ComponentCreator('/docs/api/data-structures/promptResult', '765'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/docs/api/data-structures/promptTemplate',
                component: ComponentCreator('/docs/api/data-structures/promptTemplate', 'fe5'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/docs/api/prompt-manager/',
                component: ComponentCreator('/docs/api/prompt-manager/', '993'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/docs/api/prompt-manager/spawn',
                component: ComponentCreator('/docs/api/prompt-manager/spawn', 'c0a'),
                exact: true,
                sidebar: "apiSidebar"
              },
              {
                path: '/docs/getting-started/0intro',
                component: ComponentCreator('/docs/getting-started/0intro', 'cd1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/installation-and-usage',
                component: ComponentCreator('/docs/getting-started/installation-and-usage', '60f'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'b64'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
