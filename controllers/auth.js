const { response } = require("express");

const login = (req, res = response) => {
res.json({
    msg: 'Login okay'
})
}

module.exports = {
    login
}