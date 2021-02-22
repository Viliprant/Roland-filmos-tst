const userHook = (app) => {
    return {
        after: {
          async remove(context){
            if(context.result){
              const userID = context.result.id;
              const channels = context.app.channels;
              if(channels.length > 0){
                app.channel(channels).leave(connection => {
                    return userID === connection.userID;
                });
              }
            }
      
            return context;
          }
        }
    }
}

module.exports = userHook;