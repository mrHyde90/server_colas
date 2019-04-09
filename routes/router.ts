import {Router, Request, Response} from "express";

const router = Router();

router.get("/", (req:Request, res: Response) => {
    res.json({
        ok: true,
        desc: "Funciona todo"
    });
});

export default router;