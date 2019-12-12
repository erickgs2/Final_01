using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UsersApiMongo.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;

    public class UserMin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ID { get; set; }
        [BsonElement("nombre")]
        public string nombre { get; set; }
        [BsonElement("aPaterno")]
        public string aPaterno { get; set; }
        [BsonElement("aMaterno")]
        public string aMaterno { get; set; }
        [BsonElement("fNac")]
        public string fNac { get; set; }
        [BsonElement("sexo")]
        public string sexo { get; set; }
        [BsonElement("tel")]
        public string tel { get; set; }
        [BsonElement("img")]
        public string img { get; set; }
        [BsonElement("status")]
        public string status { get; set; }

    }

    public class User : UserMin
    {
        [BsonElement("rol")]
        public string rol { get; set; }
        [BsonElement("correo")]
        public string correo { get; set; }
        [BsonElement("nickname")]
        public string nickname { get; set; }
        [BsonElement("pwd")]
        public string pwd { get; set; }
    }
}
