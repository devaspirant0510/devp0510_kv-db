# @devp0510/kv-db
### version 0.0.2-alpha

[instagram](https://www.instagram.com/devp0510/)  
[npm](https://www.npmjs.com/package/@devp0510/kv-db)  

### browser local storage Indexed DB Library
### 브라우저 내부저장소 indexed db 라이브러리


## install
```
npm install @devp0510/kv-db
```

## create Database
javascript
```javascript
import { CreateKVDB } from "@devp0510/kv-db"
const myKVDB = new CreateKVDB("myKeyValDB",1);
```
typescript
```typescript
import { CreateKVDB } from "@devp0510/kv-db"
const myKVDB = new CreateKVDB("myKeyValDB",1);
```

## create store
javascript
````javascript
const store = await myKVDB.createStore("myStore","id")
````
typescript
````typescript
const store = await myKVDB.createStore("myStore","id")
````

## create index and DML
javascript
```javascript
import { KVDBStoreIndex } from "@devp0510/kv-db"
const storeDML = new KVDBStoreIndex(store);
store.readOne(1)
store.readAll(1)
store.createOne({name:"seungho",age:22})
```
