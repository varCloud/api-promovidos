const RolesDAO = require('./../../DAO/rolesDAO')

class RolesController {
    async obtenerRoles(req, res) {
        try {
            let data = await RolesDAO.obtenerRoles();
            res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
    }
}

module.exports = new RolesController()