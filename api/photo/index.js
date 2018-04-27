import express from 'express';
import * as controller from './photo.controller';

const router = express.Router();

/**
 * Sets express route GET for Photo API (List of photos)
 */
router.get('/', controller.list);
/**
 * Sets express route POST for Photo API (Add a new photo)
 */
router.post('/', controller.add);

/**
 * Export express router object.
 */
module.exports = router;