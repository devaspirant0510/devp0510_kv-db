import {openDatabase} from "./KVDBDatabase";
import {transactionMapper} from "./KVDBStoreIndex";

export default class CreateKVDB {
    private dbRequest:IDBOpenDBRequest
    private dbname:string;
    private version:number;
    constructor(dbname:string,version:number=1) {
        this.dbRequest = openDatabase(dbname,version)
        this.dbname = dbname;
        this.version = version;
    }

    /**
     *
     * @param storeName to create store name
     * @param keyPath primary key name
     * @param autoincrement
     */
    async createStore(storeName:string,keyPath:string,autoincrement:boolean=true){
        return new Promise<IDBObjectStore>((resolve,reject)=>{
            this.dbRequest.onupgradeneeded = (e:IDBVersionChangeEvent)=>{
                const db = this.dbRequest.result;
                if(!db.objectStoreNames.contains(storeName)){
                    const store = db.createObjectStore(storeName, { keyPath: keyPath, autoIncrement: autoincrement });
                    resolve(store)
                }
            }
            this.dbRequest.onerror = (e)=>{
                reject("error")
            }

        })
    }
    async getStore(storeName:string,options:string="readwrite"){
        const openReq = openDatabase(this.dbname,this.version);
        console.log(openReq)
        const db = await transactionMapper<IDBDatabase>(openReq)
        console.log(db)
        const tr = db.transaction([storeName],"readwrite")
        console.log(tr)
        return tr.objectStore(storeName)
    }

}