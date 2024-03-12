import { Router } from "express";
import UsersRouter from './users.mjs'
import NotesRouter from './notes.mjs';
import ChoresRouter from './chores.mjs';
import BillsRouter from './bills.js';
import AuthRouter from './auth.mjs';

const router = Router();

router.use('/api/users', UsersRouter);
router.use('/api/notes', NotesRouter);
router.use('/api/chores', ChoresRouter);
router.use('/api/bills', BillsRouter);
router.use('/api/auth', AuthRouter)

export default router;

