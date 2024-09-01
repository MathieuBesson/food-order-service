# Food Order Service (API)

A simple food order service.

## Description

This project is an application composed of a backend API in Node.js (TypeScript) and a frontend in React.js. You are currently viewing the repository for the API.

## Getting Started

### Prerequisites

![Node.js](https://img.shields.io/badge/node.js-v14-339933?logo=nodedotjs&logoColor=white&labelColor=339933&color=white)
![MongoDB](https://img.shields.io/badge/mongodb-v4.4.6-47A248?logo=mongodb&logoColor=white&labelColor=47A248&color=white)
![npm](https://img.shields.io/badge/npm-v10-CB3837?logo=npm&logoColor=white&labelColor=CB3837&color=white)

### Installing

-   Install dependencies:

    ```shell
    npm i
    ```

-   Create a copy of **.env.example** and rename it to **.env**. Replace the placeholders with your environment parameters.
-   Create a database with the same name as specified in the **.env** file.
-   Execute the fixtures in the database:

    ```shell
    npm run fixtures
    ```

-   Launch the development server:

    ```shell
    npm run serve
    ```

-   The API will be accessible at [localhost:3000/docs](http://localhost:3000/docs).

Launch TypeScript to JavaScript compilation:

```shell
npm run dev
```

## Infos

The admin credentials are:

- **login**: "admin"
- **password**: "azerty1234"

## License

This project is licensed under the GPL License. See the [LICENSE](./LICENSE) file for more details.
