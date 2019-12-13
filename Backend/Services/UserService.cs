using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UsersApiMongo.Models;

namespace UsersApiMongo.Services
{
    public class UserService
    {
        readonly IMongoCollection<User> _users;
        public UserService(IDatabaseSettings setting)
        {
            var client = new MongoClient(setting.ConnectionString);
            var database = client.GetDatabase(setting.DatabaseName);
            _users = database.GetCollection<User>(setting.UsersCollectionName);
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id) =>
           _users.Find<User>(user => user.ID == id).FirstOrDefault();

        public User Create(User user)
        {
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.ID == id, userIn);

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.ID == userIn.ID);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.ID == id);
    }
}
