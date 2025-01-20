import {Router} from "express";

const router = Router();

router.get("/", (req,res)=>{
    res.render(
        "index",{
            title: "Bernichat comunitario",
            style: "index.css"
        }

    )

});

export default router;