import express from 'express';
import * as controller from './photo.controller';

const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.add);

module.exports = router;