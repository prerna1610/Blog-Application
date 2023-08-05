
import { myAxios } from "./helper";

export const signUp = (users) => {
    console.log(users);
    return myAxios.post('/signup', users).then((response) => response.data);
};

export const logOut = (users) => {
    console.log(users);
    return myAxios.post('/auth/logout', users).then((response) => response.data);
};


export const homePage =(newPost)=>{
    console.log(newPost);

    return myAxios.post('/home',newPost).then((response)=>response.data)

}

