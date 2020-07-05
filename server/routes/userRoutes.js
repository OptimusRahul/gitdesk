import { Router } from 'express';
import { protect } from '../middlewares/checkAuthState';
import {
    getAuthenticatedUserData, 
    getAuthenticatedUserRepo,
    postAuthenticatedUserCreateRepo,
    deleteAuthenticatedUserRepo
} from '../controller/userController';

const router = Router();

router.get('/search/user/list', userController.getSearchUsersList);
router.get('/search/user/details', userController.getSearchedUserData);
router.get('/search/user/repo', userController.getSearchedUserRepo);

router.use(protect);

router.get('/me/details', getAuthenticatedUserData);
router.get('/me/repos', getAuthenticatedUserRepo);
router.post('/me/create', postAuthenticatedUserCreateRepo);
router.delete('/me/repo', deleteAuthenticatedUserRepo);

export { router };