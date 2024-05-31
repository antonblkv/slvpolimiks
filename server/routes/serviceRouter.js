const Router = require('express');
const router = new Router();
const serviceController = require('../controllers/serviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), serviceController.create);
router.put('/', checkRole('ADMIN'), serviceController.update);
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getOne);
router.delete('/:id', checkRole('ADMIN'), serviceController.delete);

module.exports = router;
