const router= require('express').Router();
const multer = require('multer');
const { getPost,createPost,likesUpdate,commentUpdate,getComments,updateProfilePic,getProfilPic,getUserInfo,getUserProfileInfo,mixGetPost,followAdd,followSub} = require('../controller/postController.js');
const upload=multer({dest:'uploads/'})

router.get('/post-all/:id', getPost);
router.post('/create-post',upload.single('image'), createPost);
router.put('/update-likes/:id', likesUpdate);
router.put('/update-comment/:id', commentUpdate);
router.get('/get-comments/:id', getComments);
router.put('/updateProfilePic', upload.single('profilePic'),updateProfilePic);
router.get('/getProfilePhoto/:id',getProfilPic);
router.get('/getUserInfo/:id',getUserInfo);
router.get('/getUserProfileInfo',getUserProfileInfo);
router.get('/mixGetPost', mixGetPost);
router.put('/followAdd/:id',followAdd);
router.put('/followSub/:id',followSub);



module.exports = router