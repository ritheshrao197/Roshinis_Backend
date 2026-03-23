const bcrypt = require("bcryptjs")

const users = [

    {
        name: "Admin",
        email: "admin@roshini.com",
        password: bcrypt.hashSync("admin123", 10),
        role: "admin"
    },

    {
        name: "Test User",
        email: "user@test.com",
        password: bcrypt.hashSync("user123", 10),
        role: "user"
    }

]

module.exports = users