export interface User{
    _id:string,
    name:string,
    email:string,
    pic:string
}

export interface UserWithToken extends User{
    token:string
}

export interface UserWidthPassword extends User{
    password:string
}

