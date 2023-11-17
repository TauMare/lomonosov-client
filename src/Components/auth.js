import jsonwebtoken from "jsonwebtoken"

export default function validate(){
    console.log('aaaaaaaa')
    const key = localStorage.getItem('Authentication')
    if (!key){
        return false;
    }
    const keyData = jsonwebtoken.decode(key)
    const expirationDate = new Date(keyData.exp * 1000)
    const nowDate = new Date(Date.now())
    if(expirationDate.valueOf() > nowDate.valueOf()){
        return true
    }
    localStorage.removeItem('Authentication')
    return false;
}
