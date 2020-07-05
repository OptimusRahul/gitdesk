import { Router } from 'express';
import { default as openEditorController } from '../controller/vscodeController';
import { default as browserController } from '../controller/browserController';
import { default as modificationController } from '../controller/modificationController';
import { default as verifyOS } from '../middlewares/verifyOS';

const router = Router();

router.get('/open/browser', browserController.openBrowser);
router.post('/change/path', modificationController.changePath)
router.get('/open/editor', verifyOS.getCurrentPlatform, openEditorController.openEditor);

export { router };