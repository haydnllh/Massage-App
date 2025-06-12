const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    return res.json({message: "Get users"})
});

module.exports = router;