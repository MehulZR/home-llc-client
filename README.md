
# Home-LLC Client

Client side code for the Home-LLC assignment.

# Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the dependencies.

```bash
npm install
```

# Setting up the Environment Variables

1. Create a **.env.local file** in the root of the directory.

```bash
touch .env.local
```

2. Open the **.env.local** file with a text editor and declare a Environment Variable with name **VITE_BACKEND_URL**

```
VITE_BACKEND_URL=http://localhost:8000 
```

# Usage

1. Starting Dev Server
```bash
npm run dev
```
*By default dev server runs on PORT 3000*

2. Building the production ready files.
```bash
npm run build
```

# Note
*Home-Client-Server must be running for the Home-Client-Client to respond properly*
