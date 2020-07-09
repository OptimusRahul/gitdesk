import { Router } from 'express';
import { protect } from '../middlewares/checkAuthState';
import {
    getAuthenticatedUserData, 
    getAuthenticatedUserRepo,
    postAuthenticatedUserCreateRepo,
    deleteAuthenticatedUserRepo
} from '../controller/userController';

const userRouter = Router();

/*userRouter.get('/search/user/list', userController.getSearchUsersList);
userRouter.get('/search/user/details', userController.getSearchedUserData);
userRouter.get('/search/user/repo', userController.getSearchedUserRepo);*/

userRouter.use(protect);

userRouter.get('/me/details', getAuthenticatedUserData);
userRouter.get('/me/repos', getAuthenticatedUserRepo);
userRouter.post('/me/create', postAuthenticatedUserCreateRepo);
userRouter.delete('/me/delete/repo', deleteAuthenticatedUserRepo);

export { userRouter };