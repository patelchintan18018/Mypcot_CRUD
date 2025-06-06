import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  bulkDeleteRecords,
  getCategories,
} from '../controllers/recordController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createRecord);
router.get('/', getRecords);
router.get('/categories', getCategories);
router.get('/:id', getRecordById);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);
router.post('/bulk-delete', bulkDeleteRecords);

export default router;
