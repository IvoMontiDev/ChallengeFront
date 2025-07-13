-- Not implemented API endpoints --
-------------------------------------------------------------
USERS
-------------------------------------------------------------
Create user -> https://cobaltodev.alwaysdata.net/auth/register
Method: POST

body ->
  {
    "username": "user2",
    "password": "1234"
  }
-------------------------------------------------------------


-- Implemented API endpoints --
-------------------------------------------------------------
USERS
-------------------------------------------------------------
Login -> https://cobaltodev.alwaysdata.net/auth/register
Method: POST

body ->
  {
    "username": "user2",
    "password": "1234"
  }
-------------------------------------------------------------
GET user -> https://cobaltodev.alwaysdata.net/auth/users
Method: GET

Headers: Authorization -> Bearer <token>
-------------------------------------------------------------
PRODUCTS
-------------------------------------------------------------
GET user prods -> https://cobaltodev.alwaysdata.net/products/<product_id>/users
Method: GET

Headers: Authorization -> Bearer <token>
response body ->
  {
    "username": "user2",
    "password": "1234"
  }
-------------------------------------------------------------
POST Product -> https://cobaltodev.alwaysdata.net/products
Method: POST

Headers: Authorization -> Bearer <token>
body ->
{
  "name": "new prod14",
  "description": "pepe",
  "price": 99.99,
  "userIds": [1]
}
-------------------------------------------------------------
DELETE Products -> https://cobaltodev.alwaysdata.net/products/<product_id>
Method: DELETE

Headers: Authorization -> Bearer <token>
-------------------------------------------------------------
GET Products -> https://cobaltodev.alwaysdata.net/products/
Method: GET

Headers: Authorization -> Bearer <token>
-------------------------------------------------------------
GET Products -> https://cobaltodev.alwaysdata.net/products?page=<pageNum>&limit=<prodLimitPerPage>
Method: GET

Headers: Authorization -> Bearer <token>