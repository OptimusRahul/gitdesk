import { Router } from 'express';
//import { default as openEditorController } from '../controller/vscodeController';
import { openBrowser } from '../controller/browserController';
import { default as modificationController } from '../controller/modificationController';
import { default as verifyOS } from '../middlewares/verifyOS';

const appsRouter = Router();

appsRouter.get('/open/browser', openBrowser);
//router.post('/change/path', modificationController.changePath)
//router.get('/open/editor', verifyOS.getCurrentPlatform, openEditorController.openEditor);

export { appsRouter };