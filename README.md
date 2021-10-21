The “vs-code like” file explorer tree view with multiple collapsible sections. The program take as an argument one or multiple paths to local directories. Each directory are represented as an independent section in the rendered file explorer. When a file on the host is deleted, added, removed or renamed within one of the specified directories, changes are reflected in the rendered file explorer.

# How to build

You need to install packages in project directory. And you need to install npm packages in client directory.

```sh
  npm install
  cd ./client
  npm install
```

After you install the npm packages in project root directory and client sub directory, you need to execute node server.

```sh
  cd ..
  node file-explorer.js ./example/test1 ./example/test2
```

After that, you need to start react client app in another terminal.

```sh
  cd client
  npm start
```

# How to test

Please open http://localhost:3000 on your browser, and you will see the tree view of the directories you specified as arguments of `node file-explorer.js` command.
If you create/delete/rename files in the specified directories on the host computer, it will be reflected in the web file explorer immediately.
