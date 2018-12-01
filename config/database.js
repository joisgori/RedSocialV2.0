const { NODE_ENV } = process.env;

module.exports = {
     'url': NODE_ENV === 'production' ? 
        "mongodb://Luis:aBcd1234@ds239940.mlab.com:39940/bfriends" :
        'mongodb://localhost/BFriendsLogin',  
};