# Travel-Journal Api
[https://travel-journal-api.cyclic.app/](https://travel-journal-api.cyclic.app/)

# This is a REST Api which keeps track of your destinations travelled in a particular country along with your experience, the api is equipped with user authentication and one can create, read, update and delete (CRUD) the data  

#### Setup

#### Routes

- /api/v1/auth/register
- /api/v1/auth/login
- /api/v1/destinations/
- /api/v1/destinations/:id

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Destinations Model

image link Validation Regex

```regex
/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
```

#### Register User

- call post method on route :- /api/v1/auth/register
- pass the details of user in following format:-
- eg. {
    "name":"abc",
    "email":"abc@gmail.com",
    "password":"abcdefg"
  }

#### Login User

- call post method on route :- /api/v1/auth/login
- pass the details of user in following format:-
- eg. {
    "email":"abc@gmail.com",
    "password":"abcdefg"
  }
#### Add Destination

- call post method on route :- /api/v1/destinations/
- pass the details in following format to store data:-
- eg. {
    "country":"India",
    "name":"Himachal",
    "img":"https://unsplash.com/photos/qIXdhJz7Rns",
    "rating":4,
    "description":""
  }

#### get All Destinations

- call get method on route :- /api/v1/destinations/

#### get Destination

- call get method on route :- /api/v1/destinations/:id
- pass _id of object one wanted present in destinations array in parameter {id}

#### update Destination

- call patch method on route :- /api/v1/destinations/:id
- pass _id of object one wanted present in destinations array in parameter {id}
- pass the details in following format to store data:-
- eg. {
    "name":"Himachal",
    "img":"https://unsplash.com/photos/XW9LTxbeS9Q",
    "rating":5,
    "description":""
}

#### delete detination

- call delete method on route :- /api/v1/destinations/:id
- pass _id of object one wanted present in destinations array in parameter {id}

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/destinations/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the destination id
```
