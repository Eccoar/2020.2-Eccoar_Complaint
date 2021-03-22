import { Router, Request, Response } from 'express';

import ControllerComplaint from './controllers/ControllerComplaint';

const routers = Router();
const controller = new ControllerComplaint();

routers.get("/api/ping", (req: Request, res: Response) => {
    controller.pong(req, res);
});

routers.post("/api/complaint/create", (req: Request, res: Response) => {
    controller.create(req, res);
});

routers.get("/api/complaints", (req: Request, resp: Response) => {
    controller.complaints(req, resp);
});

routers.post("/api/vote/add", (req: Request, res:Response) => {
    controller.addVote(req, res);
});

export default routers;