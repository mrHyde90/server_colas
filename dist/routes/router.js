"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (req, res) => {
    res.json({
        ok: true,
        desc: "Funciona todo"
    });
});
exports.default = router;
