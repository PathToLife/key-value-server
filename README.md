# Key Value Server
A simple http key value server built using nodejs

### POST /store/bob
```
cookies
```

### GET /store/bob
```json
{
  "key": "bob",
  "value": "cookies",
  "accessCount": 25,
  "creationDate": "2022-08-06T05:05:10.767Z",
  "editDate": "2022-08-06T05:05:33.830Z"
}
```



## Getting started

A docker image is available (random code online is a little safer in a no privilege docker container)

`docker run --rm -p 3000:3000 pathtolife/key-value-server`

Or we can alternatively use node 

`npm run start`
