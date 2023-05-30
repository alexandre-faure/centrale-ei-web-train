import express from 'express';
const router = express.Router();

router.get('/', function(req, res){
    res.json({message:'Movies request.'})
});

router.post('/new', function(req, res){
    console.log(req.body);
    res.status(400).json('POST received.')
});

export default router;