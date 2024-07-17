import { Router } from 'express';
import express from 'express';
import { Request, Response } from "express";
import { surgeonDisplayArrayController } from './controller/surgeonDisplayArrayController';

const router = Router();

router.get('/allSurgeons',
    surgeonDisplayArrayController.getAllSurgeons
);

export default router;