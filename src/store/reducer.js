const defaultState ={
    myKey:1
}

export default (state=defaultState, action) =>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'addKeyFn':
            newState.myKey++;
            break;
        default:
            break;
    }
    return newState;
}