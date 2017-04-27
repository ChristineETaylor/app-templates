# Standard Skeleton Templates for Apps

## Initialization Commands
- `npm init`: create a package.json file
- `npm install`: download dependencies based on package.json file


## Server

Type | Description
--------|---------
SimpleServer | Minimalist server requirements to receive get and post requests, including parsing form data


---

## React App

Command | Command
--------|---------
"start":| ```"live-server"```
"build":| ```"babel . --out-dir compiled --watch --presets=es2015,react --ignore=node_modules,compiled --source-maps inline"```


---

## Angular App

Command | Command
--------|---------
"start":| ```"live-server --open=src --port=3000 --host=127.0.0.1"```


---