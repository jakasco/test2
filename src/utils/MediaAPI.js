const apiUrl = 'http://media.mw.metropolia.fi/wbma/media/';

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

const login2 = (user) =>{
    console.log("suer:" +user);
};

export {getAllMedia, login2};