const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-Routes');
const dashboardRoutes = require('./dashboard-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/', dashboardRoutes);

module.exports = router;
