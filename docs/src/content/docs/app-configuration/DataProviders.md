---

title: Data Fetching & Data Providers

---

In a shadcn-admin-kit app, you don’t write API calls using `fetch` or axios. Instead, you communicate with your API through an object called the `dataProvider`.

This documentation will explain the following concepts:

- [What is a Data Provider?](#the-dataprovider)
- [How to set up a Data Provider](#setup)
- [Supported Data Provider backends](#supported-data-provider-backends)
- [How to write a Data Provider](#writing-a-data-provider)
- [How to query the API using hooks](#querying-the-api)

## The `dataProvider`

Shadcn-admin-kit streamlines data fetching for administrative interfaces through its Data Provider object, which unifies interactions across diverse APIs such as REST and GraphQL. This abstraction allows developers to focus on UI development rather than intricate API calls. It employs specialized hooks, like `useGetList` and `useGetOne`, and integrates [TanStack Query](https://tanstack.com/query/latest) to manage data efficiently, offering features such as caching and optimistic updates.

The framework also simplifies working with relational APIs and incorporates real-time capabilities for collaborative applications. Authentication is handled by an `authProvider`, which manages user logins and tokens, subsequently utilized by the `dataProvider` for secure API requests.

To learn more about the Data Provider, refer to the [Data Fetching documentation](https://marmelab.com/react-admin/DataFetchingGuide.html).

## Setup

The first step to using a Data Provider is to pass it to the `<Admin>` component via the `dataProvider` prop.

For example, let’s use the [Simple REST data provider](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest). This provider is suitable for REST APIs using simple GET parameters for filters and sorting.

First, install the `ra-data-simple-rest` package:

```
npm install ra-data-simple-rest
```

Then, initialize the provider with the REST backend URL, and pass it as the `<Admin dataProvider>`:

```jsx
// in src/App.js
import { Admin } from "@/components/admin";
import { Resource } from 'ra-core';
import simpleRestProvider from 'ra-data-simple-rest';

import { PostList } from './posts';

const dataProvider = simpleRestProvider('http://path.to.my.api/');

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

That’s all it takes to make all shadcn-admin-kit components work with your API. They will call the data provider methods, which will in turn call the API. Here’s how the Simple REST data provider maps shadcn-admin-kit calls to API calls:

| Method name        | API call                                                                                |
| ------------------ | --------------------------------------------------------------------------------------- |
| `getList`          | `GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}` |
| `getOne`           | `GET http://my.api.url/posts/123`                                                       |
| `getMany`          | `GET http://my.api.url/posts?filter={"ids":[123,456,789]}`                              |
| `getManyReference` | `GET http://my.api.url/posts?filter={"author_id":345}`                                  |
| `create`           | `POST http://my.api.url/posts`                                                          |
| `update`           | `PUT http://my.api.url/posts/123`                                                       |
| `updateMany`       | Multiple calls to `PUT http://my.api.url/posts/123`                                     |
| `delete`           | `DELETE http://my.api.url/posts/123`                                                    |
| `deleteMany`       | Multiple calls to `DELETE http://my.api.url/posts/123`                                  |

For your own API, look for a compatible data provider in the list of [supported API backends](#supported-data-provider-backends) or write your own.

For more details about the data provider setup, refer to the [Data Provider Setup documentation](https://marmelab.com/react-admin/DataProviders.html).

## Supported Data Provider Backends

Thanks to the Data Provider architecture, shadcn-admin-kit supports a lot of API backends. Check the list below for open-source packages developed and maintained by the core team and developers from the community.

If you can't find a Data Provider for your backend below, no worries! [Writing a Data Provider](https://marmelab.com/react-admin/DataProviderWriting.html) takes a couple of hours, and won't prevent you from using shadcn-admin-kit.

* <img src="/shadcn-admin-kit/docs/images/backend-logos/appwrite.svg" title="Appwrite Logo" class="w-4 h-4 inline mr-1"/> **[Appwrite](https://appwrite.io/)**: [marmelab/ra-appwrite](https://github.com/marmelab/ra-appwrite)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/amplify.svg" title="AWS Amplify Logo" class="w-4 h-4 inline mr-1"/>**[AWS Amplify](https://docs.amplify.aws)**: [MrHertal/react-admin-amplify](https://github.com/MrHertal/react-admin-amplify)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/blitz.svg" title="blitz Logo" class="w-4 h-4 inline mr-1"/>**[Blitz-js](https://blitzjs.com/docs)**: [theapexlab/ra-data-blitz](https://github.com/theapexlab/ra-data-blitz)
* <span class="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-zinc-500 text-[10px] font-semibold text-white leading-none">R</span>**[Configurable Identity Property REST Client](https://github.com/zachrybaker/ra-data-rest-client)**: [zachrybaker/ra-data-rest-client](https://github.com/zachrybaker/ra-data-rest-client)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/corebos.png" title="corebos Logo" class="w-4 h-4 inline mr-1"/>**[coreBOS](https://corebos.com/)**: [React-Admin coreBOS Integration](https://github.com/coreBOS/reactadminportal)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/directus.svg" title="directus Logo" class="w-4 h-4 inline mr-1"/>**[Directus](https://directus.io/)**: [marmelab/ra-directus](https://github.com/marmelab/ra-directus/blob/main/packages/ra-directus/Readme.md)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/django.png" title="django Logo" class="w-4 h-4 inline mr-1"/>**[Django Rest Framework](https://www.django-rest-framework.org/)**: [bmihelac/ra-data-django-rest-framework](https://github.com/bmihelac/ra-data-django-rest-framework)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/eicrud.svg" title="EiCrud Logo" class="w-4 h-4 inline mr-1"/>**[Eicrud](https://github.com/eicrud/eicrud)**: [danyalutsevich/ra-data-eicrud](https://github.com/danyalutsevich/ra-data-eicrud)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/eve.png" title="eve Logo" class="w-4 h-4 inline mr-1"/>**[Eve](https://docs.python-eve.org/en/stable/)**: [smeng9/ra-data-eve](https://github.com/smeng9/ra-data-eve)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="Express Mangoose Logo" class="w-4 h-4 inline mr-1"/>**[Express & Mongoose](https://github.com/NathanAdhitya/express-mongoose-ra-json-server)**: [NathanAdhitya/express-mongoose-ra-json-server](https://github.com/NathanAdhitya/express-mongoose-ra-json-server)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="Express Sequelize Logo" class="w-4 h-4 inline mr-1"/>**[Express & Sequelize](https://github.com/lalalilo/express-sequelize-crud)**: [express-sequelize-crud](https://github.com/lalalilo/express-sequelize-crud)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/marmelab.png" title="marmelab Logo" class="w-4 h-4 inline mr-1"/>**[FakeRest](https://github.com/marmelab/FakeRest)**: [marmelab/ra-data-fakerest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-fakerest)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/feathersjs.svg" title="feathersjs Logo" class="w-4 h-4 inline mr-1"/>**[Feathersjs](https://www.feathersjs.com/)**: [josx/ra-data-feathers](https://github.com/josx/ra-data-feathers)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/firebase.png" title="Firebase Firestore Logo" class="w-4 h-4 inline mr-1"/>**[Firebase Firestore](https://firebase.google.com/docs/firestore)**: [benwinding/react-admin-firebase](https://github.com/benwinding/react-admin-firebase).
* <img src="/shadcn-admin-kit/docs/images/backend-logos/firebase.png" title="Firebase Realtime Logo" class="w-4 h-4 inline mr-1"/>**[Firebase Realtime Database](https://firebase.google.com/docs/database)**: [aymendhaya/ra-data-firebase-client](https://github.com/aymendhaya/ra-data-firebase-client).
* <img src="/shadcn-admin-kit/docs/images/backend-logos/geoserver.png" title="geoserver Logo" class="w-4 h-4 inline mr-1"/>**[GeoServer](https://geoserver.org/)**: [sergioedo/ra-data-geoserver](https://github.com/sergioedo/ra-data-geoserver)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/genezio.png" title="Genezio Logo" class="w-4 h-4 inline mr-1"/>**[Genezio](https://genezio.com/)**: [bogdanripa/react-admin-genezio](https://github.com/bogdanripa/react-admin-genezio)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/sheets.svg" title="sheets Logo" class="w-4 h-4 inline mr-1"/>**[Google Sheets](https://www.google.com/sheets/about/)**: [marmelab/ra-data-google-sheets](https://github.com/marmelab/ra-data-google-sheets)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/graphql.svg" title="graphql Logo" class="w-4 h-4 inline mr-1"/>**[GraphQL (generic)](https://graphql.org/)**: [marmelab/ra-data-graphql](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql) (uses [Apollo](https://www.apollodata.com/))
* <img src="/shadcn-admin-kit/docs/images/backend-logos/graphql.svg" title="graphql Logo" class="w-4 h-4 inline mr-1"/>**[GraphQL (simple)](https://graphql.org/)**: [marmelab/ra-data-graphql-simple](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple).
* <span class="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-zinc-500 text-[10px] font-semibold text-white leading-none">H</span>**[HAL](https://stateless.co/hal_specification.html)**: [b-social/ra-data-hal](https://github.com/b-social/ra-data-hal)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="hasura Logo" class="w-4 h-4 inline mr-1"/>**[Hasura](https://github.com/hasura/graphql-engine)**: [hasura/ra-data-hasura](https://github.com/hasura/ra-data-hasura)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/hydra.png" title="hydra Logo" class="w-4 h-4 inline mr-1"/>**[Hydra](https://www.hydra-cg.com/) / [JSON-LD](https://json-ld.org/)**: [api-platform/admin/hydra](https://github.com/api-platform/admin/blob/master/src/hydra/dataProvider.ts)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/indexedDB.png" title="indexedDB Logo" class="w-4 h-4 inline mr-1"/>**[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)** (via [LocalForage](https://github.com/localForage/localForage)): [marmelab/ra-data-local-forage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-local-forage)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/indexedDB.png" title="indexedDB Logo" class="w-4 h-4 inline mr-1"/>**[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)**: [tykoth/ra-data-dexie](https://github.com/tykoth/ra-data-dexie)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/jsonApi.jpg" title="jsonApi Logo" class="w-4 h-4 inline mr-1"/>**[JSON API](https://jsonapi.org/)**: [henvo/ra-jsonapi-client](https://github.com/henvo/ra-jsonapi-client)
* <span class="inline-flex items-center justify-center w-4 h-4 mr-1 rounded-full bg-zinc-500 text-[10px] font-semibold text-white leading-none">J</span>**[JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-08)**: [ra-data-json-hal](https://www.npmjs.com/package/ra-data-json-hal)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/marmelab.png" title="marmelab Logo" class="w-4 h-4 inline mr-1"/>**[JSON server](https://github.com/typicode/json-server)**: [marmelab/ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="linuxForHealth Logo" class="w-4 h-4 inline mr-1"/>**[LinuxForHealth FHIR](https://github.com/LinuxForHealth/FHIR)**: [tum-mri-aiim/ra-data-fhir](https://gitlab.com/mri-tum/aiim/libs/ra-data-fhir)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/js.png" title="localStorage Logo" class="w-4 h-4 inline mr-1"/>**[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**: [marmelab/ra-data-local-storage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-local-storage)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/js.png" title="localStorage Logo" class="w-4 h-4 inline mr-1"/>**[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** (via [LocalForage](https://github.com/localForage/localForage)): [marmelab/ra-data-local-forage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-local-forage)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/loopback3.svg" title="loopback3 Logo" class="w-4 h-4 inline mr-1"/>**[Loopback3](https://loopback.io/lb3)**: [darthwesker/react-admin-loopback](https://github.com/darthwesker/react-admin-loopback)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/loopback4.svg" title="loopback4 Logo" class="w-4 h-4 inline mr-1"/>**[Loopback4](https://loopback.io/)**: [elmaistrenko/react-admin-lb4](https://github.com/elmaistrenko/react-admin-lb4)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/loopback4.svg" title="loopback4 Logo" class="w-4 h-4 inline mr-1"/>**[Loopback4 CRUD](https://github.com/loopback4/loopback-component-crud)**: [loopback4/ra-data-lb4](https://github.com/loopback4/ra-data-lb4)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="mixer Logo" class="w-4 h-4 inline mr-1"/>**[Mixer](https://github.com/ckoliber/ra-data-mixer)**: [ckoliber/ra-data-mixer](https://github.com/ckoliber/ra-data-mixer)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="moleculer Logo" class="w-4 h-4 inline mr-1"/>**[Moleculer Microservices](https://github.com/RancaguaInnova/moleculer-data-provider)**: [RancaguaInnova/moleculer-data-provider](https://github.com/RancaguaInnova/moleculer-data-provider)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/nestjs.png" title="nestJs Logo" class="w-4 h-4 inline mr-1"/>**[NestJS CRUD](https://github.com/nestjsx/crud)**: [rayman1104/ra-data-nestjsx-crud](https://github.com/rayman1104/ra-data-nestjsx-crud)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/nestjs-query.svg" title="Nestjs-query Logo" class="w-4 h-4 inline mr-1"/>**[Nestjs-query (GraphQL)](https://tripss.github.io/nestjs-query/)**: [mrnkr/ra-data-nestjs-query](https://github.com/mrnkr/ra-data-nestjs-query)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/odata.png" title="oData Logo" class="w-4 h-4 inline mr-1"/>**[OData](https://www.odata.org/)**: [Groopit/ra-data-odata-server](https://github.com/Groopit/ra-data-odata-server)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/open.png" title="open Logo" class="w-4 h-4 inline mr-1"/>**[OpenCRUD](https://www.opencrud.org/)**: [weakky/ra-data-opencrud](https://github.com/Weakky/ra-data-opencrud)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/parse.png" title="parse Logo" class="w-4 h-4 inline mr-1"/>**[Parse](https://parseplatform.org/)**: [almahdi/ra-data-parse](https://github.com/almahdi/ra-data-parse)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/postgraphile.svg" title="postGraphile Logo" class="w-4 h-4 inline mr-1"/>**[PostGraphile](https://www.graphile.org/postgraphile/)**: [bowlingx/ra-postgraphile](https://github.com/BowlingX/ra-postgraphile)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/postgRest.png" title="postgRest Logo" class="w-4 h-4 inline mr-1"/>**[PostgREST](https://postgrest.org/)**: [raphiniert-com/ra-data-postgrest](https://github.com/raphiniert-com/ra-data-postgrest)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/prisma.svg" title="prisma Logo" class="w-4 h-4 inline mr-1"/>**[Prisma v1](https://v1.prisma.io/docs/1.34)**: [weakky/ra-data-prisma](https://github.com/weakky/ra-data-prisma)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/prisma.svg" title="prisma Logo" class="w-4 h-4 inline mr-1"/>**[Prisma v2 (GraphQL)](https://www.prisma.io/)**: [panter/ra-data-prisma](https://github.com/panter/ra-data-prisma)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/prisma.svg" title="prisma Logo" class="w-4 h-4 inline mr-1"/>**[Prisma v2 (REST)](https://www.npmjs.com/package/ra-data-simple-prisma)**: [codeledge/ra-data-simple-prisma](https://github.com/codeledge/ra-data-simple-prisma)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/processMaker.jpeg" title="processMaker Logo" class="w-4 h-4 inline mr-1"/>**[ProcessMaker3](https://www.processmaker.com/)**: [ckoliber/ra-data-processmaker3](https://github.com/ckoliber/ra-data-processmaker3)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/github.svg" title="restHapi Logo" class="w-4 h-4 inline mr-1"/>**[REST-HAPI](https://github.com/JKHeadley/rest-hapi)**: [ra-data-rest-hapi](https://github.com/mkg20001/ra-data-rest-hapi)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/sails.svg" title="sails Logo" class="w-4 h-4 inline mr-1"/>**[Sails.js](https://sailsjs.com/)**: [mpampin/ra-data-json-sails](https://github.com/mpampin/ra-data-json-sails)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/sqlite.png" title="sqlite Logo" class="w-4 h-4 inline mr-1"/>**[SQLite](https://www.sqlite.org/index.html)**: [marmelab/ra-sqlite-dataprovider](https://github.com/marmelab/ra-sqlite-dataprovider)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/marmelab.png" title="marmelab Logo" class="w-4 h-4 inline mr-1"/>**[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)**: [marmelab/ra-data-simple-rest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/soul.png" title="Soul Logo" class="w-4 h-4 inline mr-1"/>**[Soul](https://thevahidal.github.io/soul/)**/**[SQLite](https://www.sqlite.org/index.html)**: [DeepBlueCLtd/RA-Soul](https://github.com/DeepBlueCLtd/RA-Soul)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/spring.svg" title="spring Logo" class="w-4 h-4 inline mr-1"/>**[Spring Boot](https://spring.io/projects/spring-boot)**: [vishpat/ra-data-springboot-rest](https://github.com/vishpat/ra-data-springboot-rest)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/strapi.png" title="strapi Logo" class="w-4 h-4 inline mr-1"/>**[Strapi v3/v4](https://strapi.io/)**: [nazirov91/ra-strapi-rest](https://github.com/nazirov91/ra-strapi-rest)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/strapi.png" title="strapi Logo" class="w-4 h-4 inline mr-1"/>**[Strapi v4](https://strapi.io/)**: [garridorafa/ra-strapi-v4-rest](https://github.com/garridorafa/ra-strapi-v4-rest)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/strapi.png" title="strapi Logo" class="w-4 h-4 inline mr-1"/>**[Strapi v5](https://strapi.io/)**: [marmelab/ra-strapi](https://github.com/marmelab/ra-strapi/tree/main/packages/ra-strapi)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/supabase.svg" title="supabase Logo" class="w-4 h-4 inline mr-1"/>**[Supabase](https://supabase.io/)**: [marmelab/ra-supabase](https://github.com/marmelab/ra-supabase/blob/main/packages/ra-supabase/README.md)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/graphql.svg" title="graphql Logo" class="w-4 h-4 inline mr-1"/>**[Supabase (GraphQL)](https://supabase.io/)**: [@groovestack/ra-data-graphql-supabase](https://github.com/maxschridde1494/ra-data-graphql-supabase)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/surrealdb.svg" title="surrealDB Logo" class="w-4 h-4 inline mr-1"/>**[SurrealDB](https://surrealdb.com/)**: [djedi23/ra-surrealdb](https://github.com/djedi23/ra-surrealdb)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/treeql.png" title="treeql Logo" class="w-4 h-4 inline mr-1"/>**[TreeQL / PHP-CRUD-API](https://treeql.org/)**: [nkappler/ra-data-treeql](https://github.com/nkappler/ra-data-treeql)
* <img src="/shadcn-admin-kit/docs/images/backend-logos/wooCommerce.png" title="wooCommerce Logo" class="w-4 h-4 inline mr-1"/>**[WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs)**: [zackha/ra-data-woocommerce](https://github.com/zackha/ra-data-woocommerce)

That's a long list!

If you don't know where to start, use any of the following:

* [marmelab/ra-data-fakerest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-fakerest): Simulates an API based on a JSON object. It doesn't even require a server.
* [marmelab/ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server): Similar to the previous one, but requires an API powered by JSONServer.
* [marmelab/ra-data-simple-rest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest): A basic REST adapter that reflects the structure of many APIs
* [marmelab/ra-data-local-storage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-local-storage): Persists user editions in local storage. This allows local-first apps, and can be useful in tests.
* [marmelab/ra-data-local-forage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-local-forage): Uses a local, offline database based on IndexedDB. Falls back to WebSQL or localStorage.

**Tip**: Since dataProviders all present the same interface, you can use one dataProvider during early prototyping / development phases, then switch to the dataProvider that fits your production infrastructure.

If you've written a Data Provider for another backend, and open-sourced it, please help complete this list with your package.

## Writing a Data Provider

APIs are so diverse that quite often, none of the available Data Providers suit you API. In such cases, you’ll have to write your own Data Provider. Don’t worry, it usually takes only a couple of hours.

A data provider must implement the following methods:

```jsx
const dataProvider = {
    // get a list of records based on sort, filter, and pagination
    getList:    (resource, params) => Promise,
    // get a single record by id
    getOne:     (resource, params) => Promise, 
    // get a list of records based on an array of ids
    getMany:    (resource, params) => Promise, 
    // get the records referenced to another record, e.g. comments for a post
    getManyReference: (resource, params) => Promise, 
    // create a record
    create:     (resource, params) => Promise, 
    // update a record based on a patch
    update:     (resource, params) => Promise, 
    // update a list of records based on an array of ids and a common patch
    updateMany: (resource, params) => Promise, 
    // delete a record by id
    delete:     (resource, params) => Promise, 
    // delete a list of records based on an array of ids
    deleteMany: (resource, params) => Promise, 
}
```

To call the data provider, shadcn-admin-kit combines a *method* (e.g. `getOne`), a *resource* (e.g. ‘posts’) and a set of parameters.

**Tip**: In comparison, HTTP requests require a *verb* (e.g. ‘GET’), an *url* (e.g. ‘http://myapi.com/posts’), a list of *headers* (like Content-Type) and a *body*.

To learn more about writing a Data Provider, refer to the [Data Provider Writing documentation](https://marmelab.com/react-admin/DataProviderWriting.html).

## Querying The API

Shadcn-admin-kit provides special hooks to emit read and write queries to the `dataProvider`, which in turn sends requests to your API. Under the hood, it uses React Query to call the `dataProvider` and cache the results.

Shadcn-admin-kit provides one query hook for each of the Data Provider read methods. They are useful shortcuts that make your code more readable and more robust. The query hooks execute on mount. They return an object with the following properties: { data, isPending, error }. Query hooks are:

- `useGetList` calls `dataProvider.getList()`
- `useGetOne` calls `dataProvider.getOne()`
- `useGetMany` calls `dataProvider.getMany()`
- `useGetManyReference` calls `dataProvider.getManyReference()`

Their input signature is the same as the related dataProvider method, i.e. they expect the resource name and the query parameters:

```jsx
const { isPending, error, data } = useGetOne(resource, { id });
// calls dataProvider.getOne(resource, { id })
```

For instance, here is how to fetch one User record on mount using the useGetOne hook:

```jsx
import { useGetOne } from 'ra-core';
import { Loading, Error } from './MyComponents';

const UserProfile = ({ userId }) => {
    const { isPending, error, data: user } = useGetOne('users', { id: userId });

    if (isPending) return <Loading />;
    if (error) return <Error />;
    if (!user) return null;

    return (
        <ul>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
        </ul>
    )
};
```

Shadcn-admin-kit also provides one mutation hook for each of the Data Provider write methods. These hooks execute the query when you call a callback. They return an array with the following items: `[mutate, { data, isPending, error }]`. `mutate` is a callback that you can call to execute the mutation.

Mutation hooks are:

- `useCreate` calls `dataProvider.create()`
- `useUpdate` calls `dataProvider.update()`
- `useUpdateMany` calls `dataProvider.updateMany()`
- `useDelete` calls `dataProvider.delete()`
- `useDeleteMany` calls `dataProvider.deleteMany()`

Their input signature is the same as the related dataProvider method, e.g.:

```jsx
const [update, { isPending, error, data }] = useUpdate(resource, { id, data, previousData });
// calls dataProvider.update(resource, { id, data, previousData })
```

For instance, here is a button that updates a comment record when clicked, using the useUpdate hook:

```jsx
import { useUpdate, useRecordContext } from 'ra-core';

const ApproveButton = () => {
    const record = useRecordContext();
    const [approve, { isPending }] = useUpdate('comments', {
        id: record.id,
        data: { isApproved: true },
        previousData: record
    });
    return <button onClick={() => approve()} disabled={isPending}>Approve</button>;
};
```

For more information and examples, refer to the [Data Fetching documentation](https://marmelab.com/react-admin/Actions.html).
