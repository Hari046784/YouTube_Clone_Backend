import express from 'express';
import {
  addVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from '../controllers/video.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//create a video
router.post('/', verifyToken, addVideo);

//add a video
router.put('/:id', verifyToken, addVideo);

//delete a video
router.delete('/:id', verifyToken, addVideo);

//find a video by id
router.get('/find/:id', getVideo);

router.put('/view/:id', addView);

router.get('/trend', trend);

router.get('/random', random);

router.get('/sub', verifyToken, sub);

router.get('/tags', getByTag);

router.get('/search', search);

export default router;