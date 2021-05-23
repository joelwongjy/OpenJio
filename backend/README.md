# OpenJio Backend

## Contents

- [Project structure](#project-structure)
- [Key packages used](#key-packages-used)
- [Guidelines](#guidelines)

## Project structure

The current project structure is as shown below:

```bash
backend
├─ormconfig.ts
├─docker-compose.yml
└─src/
  │ index.ts
  │ server.ts
  ├─constraints/
  ├─controllers/
  ├─entities/
  ├─middlewares/
  ├─migrations/
  ├─routes/
  ├─selectors/
  ├─types/
  └─utils/
```

### `constraints/` directory

Contains custom validation classes. You can read more [here](https://github.com/typestack/class-validator#custom-validation-classes).

### `controllers/` directory

Contains the logic for API routes.

### `entities/` directory

Contains entities, which are classes that map to database tables. You can read more [here](https://typeorm.io/#/entities).

### `middlewares/` directory

Contains middleware for the Express router to use. You can read more [here](https://expressjs.com/en/guide/using-middleware.html).

Generally this will be used to check if the user is authenticated, has verified email etc. More granular permissions control will be handled separately.

### `migrations/` directory

Contains migration files for TypeORM. You can read more [here](https://typeorm.io/#/migrations). We also have a section below on [Migrations](#migrations).

### `routes/` directory

Contains our API routes, powered by [Express](https://expressjs.com).

### `selectors/` directory

Contains selectors that take in `SelectQueryBuilder`s and extend on them i.e. include the `Base` and `Discardable` attributes.

The `selectDiscardableData` selector can also help to either include or exclude discarded data.

### `types/` directory

Contains the types used in our project.

### `utils/` directory

Contain helper functions for usage around the application.

## Key packages used

This is to help increase familiarity with the various parts of our app.

### `express`, `body-parser`, `helmet`, `cors`, `morgan`, `jsonwebtoken`

These packages form the core of our API.

`express` handles the routing of our API.

`body-parser` parses HTTP request bodies for Express.

`helmet` helps to secure our Express API with various HTTP headers.

`cors` helps handle cross-origin requests, i.e. prevent unauthorised sources from requesting resources using our API.

`morgan` helps with the logging in development.

### `bcryptjs`, `jsonwebtoken`

These are packages helping with security.

`bcrypt.js` is used to create [salted hashes](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/) of passwords, the baseline for security today.

`jsonwebtoken` helps with authorization using JSON Web Tokens (JWTs). Basically, if a user has a JWT in their HTTP request header, they are logged in and we can identify them using the JWT.

### `pg`

[PostgreSQL](https://www.postgresql.org), our choice of DB system.

### `typeorm`, `reflect-metadata`

[TypeORM](https://typeorm.io/#/) is a [Object-relational Mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) layer that helps us assign types to raw data. This package defines the way we will interact with our database.

`reflect-metadata` is a dependency of `typeorm`, and it allows us to use decorators to augment a class and its members, e.g.

```ts
@Entity()
export class User extends Discardable {
```

### `class-validator`

`class-validator` helps with validating properties for classes. We can declare such constraints using decorators, e.g.

```ts
@IsInt()
@Min(0)
@Max(10)
rating: number;
```

and we can validate them after constructing instances using `validate(instance)` or `validateOrReject(instance)`. This package will work hand-in-hand with `typeorm` to achieve our intended results.

### `date-fns`, `lodash`

Powerful helper packages. We may consider switching `date-fns` for `moment`, if everyone is more familiar with the latter.

`lodash` especially has a lot of functions that help us work with objects in JavaScript, e.g. deep comparison of objects.

### `faker`, `jest`, `supertest`, `ts-jest`

> These are devDependencies, i.e. they are not bundled in the final production build.

These are packages that help with testing.

`faker` helps to generate realistic-looking fake data.

`jest` is a testing framework. `ts-jest` is a TypeScript preprocessor for Jest.

`supertest` helps with testing HTTP requests / APIs.

### `dotenv`, `cross-env`, `ts-node-dev`, `ts-node`, `tsconfig-paths`

Packages that help with scripting.

In particular, `ts-node-dev` helps us compile our TypeScript code and run it during development, and restarts when any files are changed. Think of it as `nodemon` for TypeScript but much faster.

### `husky`, `prettier`, `pretty-quick`

> These are devDependencies, i.e. they are not bundled in the final production build.

`husky` enables us to make better use of git hooks, i.e. automated commands that run whenever we try to commit, push and more. We will be using it to do code style checks whenever someone tries to commit.

`prettier` helps to format our code.

`pretty-quick` helps to run `prettier` on changed files.

## Guidelines

### TypeORM and DataMapper

We strongly recommend everyone to read through the [entire docs for TypeORM here](https://typeorm.io/#/) before commencing work with this project.

We will be using the [DataMapper pattern](https://typeorm.io/#/active-record-data-mapper) for our project. The key feature is that we will save, remove, and load objects using repositories.

### Eager and Lazy Relations

It would be good to read up on TypeORM's [Eager and Lazy Relations](https://typeorm.io/#/eager-and-lazy-relations) (or just [Relations](https://typeorm.io/#/relations) in general).

Generally, related objects may not be loaded. We can try to do eager loading, but that only works with `.find*` commands.

### Validators & Constraints

We don't really need to define much of our own constraints, just generally ones that help with validating uniqueness.

For complex validations, e.g. whether some value is valid according to various complex conditions, we can also define our own constraints.

### Types

For each entity / route, we should define appropriate types and helper functions for it. This will go under the `src/types/` folder.

Generally, we want to define two types:

```ts
export interface EntityListData extends DiscardableData {
  // some fields
}
export interface EntityData extends EntityListData {
  // more fields
}
```

The `EntityListData` type is usually used when we get a general list of entities for the frontend, i.e. not all fields will be sent over. For example, when viewing all students, we don't need every single detail to be displayed.

The `EntityData` type is then the detailed version, where all details are captured. It thus extends from the `EntityListData` type. This will be used when we are viewing one specific student, for example.

This `EntityData` type may even include diffent `ListData`s! For example, `GroupData` may have `TeacherListData` and `StudentListData`, for example.

The supporting functions would be something along these lines:

```ts
export function isEntityListData(data: any): data is EntityListData {
  return (
    typeof data.id === "number" &&
    // and so on...
    typeof data.someField === "number" &&
    isDiscardableData(data)
  );
}

export function isEntityData(data: any): data is EntityData {
  return (
    // some checks for fields specific to EntityData
    && isEntityListData(data)
  );
}
```

The functions of course will change based on how the types are defined. These functions will be mostly used for testing purposes.

### Basic Access Authentication

When a user logs in, they receive an Access Token that lasts for **seven days**.

The design of the token system is open to further expansion. For example, if we want to introduce tokens for more sensitive actions, we can easily do so by adding to [`src/types/tokens.ts`](src/types/tokens.ts).

### Permissions Management

The permissions management will be handled by functions defined in `utils/`. This part is not coded out yet, but it will be something like this:

Let's say we have a Group class. We will have something in `utils/group.ts`.

```ts
export const allowedRequester = async (
  userId: number,
  groupId: number | string,
  requiredRole: GroupUserRole
): Promise<false | { group: Group; requester: GroupUser }> => {
  const group = await getRepository(Group).findOne(groupId, {
    relations: ["groupUsers"],
  });
  if (!group) {
    return false;
  }
  const requester = group.groupUsers!.find(
    (groupUser) => groupUser.userId === userId && !groupUser.discardedAt
  );
  if (!requester || !allowedRole(requester.role, requiredRole)) {
    return false;
  }
  return { group, requester };
};
```

`GroupUser` will be an association class between `Group` and `User`, and `GroupUserRole` will be an enum of possible roles, e.g. Student, Teacher, etc.

To use this function, inside a controller we might have something like:

```ts
const allowed = await allowedRequester(
  requesterUserId,
  groupId,
  GroupUserRole.Student
);
if (!allowed) {
  response.sendStatus(404);
  return;
}
```

### API Nesting

We will not have resources that are [more than one level deep](http://weblog.jamisbuck.org/2007/2/5/nesting-resources).

A collection may need to be scoped by its parent, but a specific member should always be directly accessible using its `id`.

### API Robustness

We will be following the [Robustness Principle](https://tools.ietf.org/html/rfc1122):

> Be liberal in what you accept, and conservative in what you send.

### Migrations

TypeORM has a feature that removes the need for migration files in development. If you look at `ormconfig.ts` in the root directory, you see this line:

```ts
synchronize: true,
```

This line enables TypeORM's automatic DB modification based on the changes we make to entities in `src/entities/`.

However, this is not always desirable in production, since TypeORM may make changes that cause losses in data. This is why we will create migrations for production.

To create migrations, we can run

```bash
(export NODE_ENV=development; yarn typeorm migration:create -n MigrationName)
```

You can then fill in the `up` and `down` functions. To run them in development, we can do

```bash
(export NODE_ENV=development; yarn typeorm migration:run)
```

This part will be updated with production-specific instructions once we have deployed the app.

You can read more [here](https://typeorm.io/#/migrations).
