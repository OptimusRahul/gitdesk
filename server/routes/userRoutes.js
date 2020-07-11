import { Router } from 'express';
import { protect } from '../middlewares/checkAuthState';
import { getAuthenticatedUserData, postAuthenticatedUserCreateRepo, 
         deleteAuthenticatedUserRepo, getSearchedUserData } from '../controller/userController';
import { getSearchedUserList } from '../controller/userSearchController';
import { getAuthenticatedUserRepo, getSearchedUserRepo } from '../controller/repoController';

const userRouter = Router();

userRouter.get('/search/user/list', getSearchedUserList);
userRouter.get('/search/user/details', getSearchedUserData);
userRouter.get('/search/user/repo', getSearchedUserRepo);


//userRouter.use(protect);

userRouter.get('/me/details', getAuthenticatedUserData);
userRouter.get('/me/repos', getAuthenticatedUserRepo);
userRouter.post('/me/create', postAuthenticatedUserCreateRepo);
userRouter.delete('/me/delete/repo', deleteAuthenticatedUserRepo);

export { userRouter };