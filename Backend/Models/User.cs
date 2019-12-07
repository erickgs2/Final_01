﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserApi.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Nick { get; set; }
        public string Password { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
