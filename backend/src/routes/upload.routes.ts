import path from "path";
import multer from "multer";
import { Router } from "express";
import { authModel } from "../models/authModel";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

router.put("/", upload.single("file"), async (req, res) => {
    try {
        const userId = req.body.userId; 
        const fileUrl = req.file ? `/public/Images/${req.file.filename}` : null;

        if (!userId || !fileUrl) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        const updatedUser = await authModel.findByIdAndUpdate(
            userId,
            { profilePic: fileUrl },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile picture updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log("error in uppload", error);
    }
});



export { router as uploadRoutes };
