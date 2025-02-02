# Poly Typescript Backend Testing

The goal of this project is to test the limits of the typescript backend frameworks. The project will be a simple CRUD API with a single entity. Each framework will be tested for the following:
- Type safety
- Community support
- Developer support
- Developer experience
- Documentation
- Performance

The type safety is a major factor in the evaluation of the frameworks. Most of our projects at Poly were written in typescript, and while we do like the language, we have had some issues with type safety on several backend frameworks. We hope to find a framework that is both completely type safe and has a good developer experience.

## Tested libraries

- [x] [hono](https://hono.dev/)
- [x] [elysia](https://elysiajs.com/)
- [x] [express-zod-api](https://www.npmjs.com/package/express-zod-api)
- [x] [encore.ts](https://encore.dev/docs/ts)
- [x] [fastify](https://www.fastify.io/)
- [x] [tsed](https://tsed.dev/)
- [x] [adonisJs](https://adonisjs.com/)
- [x] [nestjs](https://nestjs.com/)
- [ ] [orpc](https://github.com/unnoq/orpc)
- [ ] [koa](https://www.npmjs.com/package/koa)
- [ ] [loopback](https://loopback.io/doc/en/lb4)
- [ ] [sails](https://sailsjs.com/)


### Test Plan

Each project will try to have theses features:

- An auth middleware that will add a user to the request / context so that routes can access it (should be typed)
- Route `authors/:id` with a `PUT` method that takes a body and a param and will return an author with a combination of the body, the param and the user from the auth middleware (everything should be typed)
- A properly constructed openapi file
  - The openapi file should be easily configurable
  - The type between the openapi file and the route should be safe
- A `/reference` route that will serve a scalar ui website thanks to the openapi file


## Development feedback

### Hono

I need to use a third party library for validation and a complete type safety:

- :no_entry: The [hono-openapi](https://hono.dev/examples/hono-openapi) does not type check the result types and the schema given by the openapi file.

- :white_check_mark: The [Zod OpenAPI](https://hono.dev/examples/zod-openapi) generates the openapi file from the zod schema and the response type is safe between the route and the schema which is a good thing, but the library is a bit verbose.


### Elysia

Easy to setup / use and type safe everywhere.

It looks like scalar may have a problem with 'examples' in params.

example of openapi file given by Elysia:
```JSON
"parameters": [
  {
    "description": "The ID of the author",
    "examples": [
      "12"
    ],
    "schema": {
      "type": "string",
      "minLength": 1
    },
    "in": "path",
    "name": "id",
    "required": true
  }
],
```

example of what is given by Hono
```JSON
"parameters": [
  {
    "schema": {
      "type": "string",
      "minLength": 3,
      "description": "The ID of the user",
      "example": "1212121"
    },
    "required": true,
    "name": "id",
    "in": "path"
  }
],
```

Everywhere else the examples field works fine but not in the params, problem with scalar ?

Elysia may have an older version of Typebox as dependence, so if our project wants to use the latest release of Typebox, we will have to create an alias in package.json to use this version. Also, keep in mind that it wont be compatible with the typebox Elysia types.

### express-zod-api

The distinction between the query, the params and the body is not clear.

The hot reloading is not working properly ?

Based on express so very slow.

### Encore.ts

As of 24/12/2024, the framework looks a bit incomplete:
- Cannot add objects to context
- OpenAPI is still experimental

Looks promising.

### Koa

Terrible doc.

Stopped testing after trying to find a library that would properly type the routes, found one with 60 github stars but way less complete than the express zod api one.
[koa-zod-router](https://github.com/jakefenley/koa-zod-router#readme)


### Fastify

Hard time to find how to properly type a object added to the context, don't think their is a good way to do it.

### Tsed

Easy to use, but the it suffers from the same problem as nestjs: the decorators and the typescript function are not safe together.

5 min to shut down the server ?

Based on express so very slow.

### AdonisJs

Adding context is not easy and not truly typed.

OpenAPI is not easily configurable (BY COMMENT !!) AND not type safe.

Some requests are failing when benching it.


### NestJs

Was really easy to setup and make it work.

In my opinion, chained decorators are not easy to read.

@ApiResponse is not typed with the return type of the route.

Doc looks great.

You can give custom "context" thanks to the custom param decorator but the type is not well checked.

Based on express so very slow.

## Results

|                 | body typed         | param typed        | context typed      | open api           | open api typed end to end | front end client   | perf (avg request) |
|-----------------|--------------------|--------------------|--------------------|--------------------|---------------------------|--------------------|--------------------|
| hono            | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |     :white_check_mark:    | :white_check_mark: |        28.4k       |
| elysia          | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |     :white_check_mark:    | :white_check_mark: |        45.3k       |
| express-zod-api | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |     :white_check_mark:    | :white_check_mark: |        5.2k        |
| encore.ts       | :white_check_mark: | :white_check_mark: |     :no_entry:     |     :no_entry:     |         :no_entry:        | :white_check_mark: |        8.5k        |
| fastify         | :white_check_mark: | :white_check_mark: |     :no_entry:     | :white_check_mark: |     :white_check_mark:    |     :no_entry:     |        10.3k       |
| tsed            | :white_check_mark: | :white_check_mark: |     :no_entry:     | :white_check_mark: |         :no_entry:        |     :no_entry:     |        3.4k        |
| adonisJs        | :white_check_mark: | :white_check_mark: |     :no_entry:     | :white_check_mark: |         :no_entry:        |     :no_entry:     |         6k         |
| nestjs          | :white_check_mark: | :white_check_mark: |     :no_entry:     | :white_check_mark: |         :no_entry:        |     :no_entry:     |        4.3k        |


### Remarks

We can see that express based frameworks are slower than the others.

### The express-like frameworks

 We have three frameworks which can achieve the type safety we were looking for and are express-like (chained functions, middlewares, etc):

- hono
- elysia
- express-zod-api

[Hono](https://github.com/honojs/hono) has 20k github stars, and it looks like it has a solid community / plugins. Also; the performance is good for a javascript framework. In order to have the complete type safety, we need to use a third party library [Zod OpenAPI](https://hono.dev/examples/zod-openapi) which is a bit verbose.

[Elysia](https://github.com/elysiajs/elysia) has 11k github stars, has a bit less community than hono. It performs very well, the type safety is complete, and completely integrated within the framework. It was initially made for Bun but it is now an agnostic framework.

[Express-zod-api](https://github.com/RobinTail/express-zod-api) has 600 github stars, is itself a third party library, has mediocre performance because it is based on express. The type safety is complete. The advantage of this framework is that it is based on express, we can use the insane amount of plugins available for express.

### The more "architecture opinionated" frameworks

We can see that when a framework is more architecture opinionated, the type safety is not complete. The frameworks using decorators like nest.js cannot achieve a complete type safety.

In my opinion [encore.ts](https://github.com/encoredev/encore) is a promising framework. It has 8.3k stars, the type safety is not complete yet and some features are missing but it looks like it can provide a good developer experience.


### Results are a bit biased

Some of these frameworks are huge, and I did not graded them on all the features they offer. Obviously complete type safety and performance is not the only thing we have to look for when we are choosing a typescript backend server.

Also the bench is done on my computer and is based on a simple route. The performance can be different with a more complex route, or with a database, with more features, etc.