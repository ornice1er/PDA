

 export const GlobalName:any ={
    tokenName:"guvToken",
    currentRoleIndex:"guvRoleIndex",
    refreshTokenName:"guvRefreshToken",
    userName:"guvUserConnected",
    childName:"guvChildSelected",
    exercice:"guvExercise",
    expireIn:'guvExpireIn',
    features:'guvFeatures'
 }

 export enum clientData {
   /* client_id = '947b6d03-ccef-4485-bd72-47b7ba1fce95',  
    client_secret = 'ip0cU79RlVu32DOXLxcJG0xZb1VqhMs5WqOsjCee',
    //client_id = '9477596f-dc98-4430-851f-919d71a87c2f',  
    //client_secret = 'HCKxabI7Potj9RUD994ZoE3E915hTiwK573x0CKu',

    admin_client_id = '255be389-b86b-4c20-864b-885d0d0caa76',
    admin_client_secret = '51302fe86d',

   // admin_http = 'http://plocalhost:8000/',
    admin_http = 'https://back.guvmtfp.gouv.bj/',
    grant_type = 'password',*/

    client_id = '9231b808-bc69-4061-8399-2a04b70114c6',
    admin_client_id = '255be389-b86b-4c20-864b-885d0d0caa76',
    client_secret = 'N8wNAIuWehfPcsq7Vpfbm29qlorciFXVH4Iy6YXy',
    admin_client_secret = '51302fe86d',
    admin_http = 'https://back.guvmtfp.gouv.bj/',
    grant_type = 'password',

}
export enum roles {
    superAdmin = 'superAdmin',
    admin = 'admin',
    executor = 'executor',
    client = 'client'
}