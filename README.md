This is a simple Node.js application implementing user registration and login using passport and node-mysql libraries.

To start with once you clone the repository, run below command from the root of the application to install all
dependencies and libraries.:

```sh
  npm install
``` 

You could also run the command :

```sh
  npm install package.json
``` 

To restore the db, use the dump file node.sql and restore the database using the following command :

```sh
   mysql -u root -p[root_password] [database_name] < node.sql
``` 

Make sure you have create a database with the name node :


```sh
  mysql -u [username] -p [password]

  mysql> create database node;
``` 



