const gameStatesHook = (app) => {
    return {
        after: {
            get: [ 
                isAuthorized,
                safeData, // Must be the last
            ]
        }
    }
}

const isAuthorized = async (context) => {
    const params = context.params;
    const data = context.result;
    const userID = params.userID;

    if(data){
        const isAuthorized = data.authorizedIDs.find( authorizedID => authorizedID === userID);

        if(!isAuthorized)
        {
            context.dispatch = {UnauthorizedAccess: true};
        }
    }   
}

const safeData = async (context) => {
    const data = context.result;

    if(data){
        const {authorizedIDs, ...safeData} = data;
    
        context.dispatch = {
            ...safeData,
        };
    }   
}

module.exports = gameStatesHook;