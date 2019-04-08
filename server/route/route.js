const express=require('express');
const router = express.Router();
router.get('/boardandeditor', (req,res) => {
    console.log('test');
})


module.exports=router;