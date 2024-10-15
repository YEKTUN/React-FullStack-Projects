const router = require('express').Router();
const userInfoController = require('../controller/userInfoController');

router.post('/update-info/:id', userInfoController.updateInfo);
router.get('/get-info/:id', userInfoController.getInfo);
router.get('/search-user/:username', userInfoController.searchUsers);

module.exports = router;