const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';

const loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
const loggedUrl = 'http://media.mw.metropolia.fi/wbma/users/user';

const getAllMedia = () => {
 return fetch(apiUrl).then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
}

const loginCheck = (json) => {
    if(json.username == ""){
        console.log("No users online");
        return false;
    }else{
        console.log("logegd in as "+json.username);
        return json.username;
    }
}

const checkLogged = (token) => {
    return fetch(loggedUrl,{
        method: 'GET',
        headers: {
            'x-access-token': token,
        },
    }).then(response => response.json()).then( json=> {
        console.log("json token: ",json);
        let whoIsLogged = loginCheck(json);
        return whoIsLogged;
    });
}

const login5 = (username,password,component) => {


    console.log("u: '"+username+"' p: '"+password+"' "); // u: '"+username+"' p: '"+password+"'");
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
    }).then(response => response.json()).then(json=> {
        console.log(json);
        console.log(json.message);
        localStorage.setItem("token",json.token);
    //    const token = localStorage.getItem("token");
   //     checkLogged(json.token);
        redirect(json.message,component);
    });
};

const redirect = (bool,component) => {
    if(bool=="Logged in successfully"){
            console.log("jatkuu");
   //   let user = checkLogged(localStorage.getItem('token'));
   //   if(user!=false) {
          component.props.history.push('/home');
   //   }
    }
}




export {getAllMedia, login5, redirect, checkLogged};