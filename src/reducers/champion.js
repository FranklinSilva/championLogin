export default function champion(state={}, action) {

    switch (action.type) {
        case 'GET_CHAMPION_INFO':
            console.log(action);
            return action.payload.champion;
        default:
            return state;
        
    }
}