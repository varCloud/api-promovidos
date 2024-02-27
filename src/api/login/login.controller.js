const LoginDAO = require('../../DAO/loginDAO')
class LoginController {

    async iniciaSesion(req, res) {
        try {
            let data = await LoginDAO.iniciaSesion(req.body);
            res.status(200).json(data);
        } catch (err) {
            return res.status(err.code).json({ status: err.code, message: err.message });
        }
    }
}
module.exports = new LoginController()