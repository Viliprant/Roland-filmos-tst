const random  = require('string-random');

const gameHook = (app) => {
    return {
        before: {
          create(context) {
            const params = context.params;
            if(Object.keys(params).length > 0){ // mean that from client
                const id = random(process.env.NB_STR_ID).toLowerCase();
                context.data = {
                    id,
                    owner: params.userID,
                    nbMaxPlayers: process.env.NB_PLAYER_MAX,
                    type: 'private',
                }
            }
    
            return context;
          },
          update(context) {
            const userID = context.params.userID
            if(context.data.isLeaving){
              app.channel(`game/${context.id}`).leave(connection => {
                return userID === connection.userID;
              });
            }
          }
        },
        after: {
          async get(context){
            const params = context.params;
            const data = context.result;
            const userID = params.userID;
    
            if(data){
              const isAlreadyInGame = data.participants.find( participant => participant === userID);
              const isFull = data.authorizedIDs.length >= data.nbMaxPlayers;
    
              if(isAlreadyInGame || isFull)
              {
                context.result = {UnauthorizedAccess: true};
              }
              else{
                context.result = await context.app.service('games').update(data.id, {
                  ...data,
                  participants: [...data.participants, userID],
                })
    
                const participants = context.result.participants;
                const usernames = [];
    
                for (const userID of participants) {
                    const user = await context.app.service('users').get(userID);
                    if(user){
                      usernames.push(user.username);
                    }
                }
    
                const {authorizedIDs, ...safeData} = data;
    
                context.dispatch = {
                  ...safeData,
                  participants: usernames,
                };
    
                context.app.channel(`game/${data.id}`).join(params.connection);  
              }
            }
          },
          async update(context){
            const data = context.result;
            const participants = data.participants;
            const usernames = [];
    
            const {authorizedIDs, ...safeData} = data;
    
            for (const userID of participants) {
                const user = await context.app.service('users').get(userID);
                if(user){
                  usernames.push(user.username);
                }
            }
    
            context.dispatch = {
              ...safeData,
              participants: usernames,
            };
          }
        }
    }
}

module.exports = gameHook;