export const openDatabase = (dbName:string,version:number)=>{
    return indexedDB.open(dbName,version)
}