import api from '../services/api';
import { apiKey } from '../services/constants';
import deviceStorage from '../services/deviceStorage';

/*export const getCharacters = () =>{

    return async (dispatch) => {
        return api({
            method: 'get',
            url: "characters?apikey="+apiKey,
            headers: {
                "Content-Type": "application/json",
            },
            })  
            .then((response) => {
                console.log(response);
                dispatch(getCharactersSuccess(response.data));
            })
            .catch((error) => {
                // Handle returned errors here
                console.log(error)
                //apiUtils.handleError(error);
                console.log(error.response);
                console.log(error);
                dispatch();
            });
    }
}


export const getContactListsSuccess = (characters) => {
    return {
        type: 'GET_CHARACTERS',
        payload:{
            characters
        }
    }
}


export const AuthorizationGithub = () =>{

    return async (dispatch) => {
        return api({
            method: 'get',
            url: "authorize/",
            headers: {
                "Content-Type": "application/json",
                "client_id": '2bf4709c19409f01e27d'
            },
            })  
            .then((response) => {
                console.log(response);
                dispatch(setAccessTokenSuccess(response.data));
            })
            .catch((error) => {
                // Handle returned errors here
                console.log(error)
                //apiUtils.handleError(error);
                console.log(error.response);
                console.log(error);
                dispatch();
            });
    }
}*/


export const getChampionInfo = (idToken) =>{

    return async (dispatch) => {
        return api({
            method: 'get',
            url: "user",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                'Authorization': "token " + idToken
                //"client_id": '2bf4709c19409f01e27d'
            },
            })  
            .then((response) => {
                console.log(response);
                dispatch(getChampionInfoSuccess(response.data, idToken));
            })
            .catch((error) => {
                // Handle returned errors here
                console.log(error)
                //apiUtils.handleError(error);
                console.log(error.response);
                console.log(error);
                dispatch();
            });
    }
}

export const getChampionInfoSuccess = (champion, idToken) => {
    if(!!idToken)
        champion.idToken = idToken;
    
    deviceStorage.saveItem("champion", JSON.stringify(champion));
    
    return {
        type: 'GET_CHAMPION_INFO',
        payload:{
            champion: champion
        }
    }
}
