const express = require("express");
const path = require("path");
const multer = require("multer");

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const profileImgRoute = express.Router();
const { BuyerProfileModel } = require("../Models/buyerProfile.model");
const { FarmerProfileModel } = require("../Models/farmerProfile.model")
const { Authentication } = require("../Middlewares/auth.middleware");

// Cloudinary config 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware to serve HTML file
profileImgRoute.use(express.static(path.join(__dirname)));

// Create uploads directory if it doesn't exist
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer setup (store files temporarily)
const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 0.5 * 1024 * 1024 // 0.5MB = 512KB limit
    },
    fileFilter: (req, file, cb) => {
        // Check if file is an image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// POST endpoint to handle uploaded image
profileImgRoute.post("/set-profile-image", Authentication(["buyer", "farmer"]), upload.single("image"), async (req, res) => {
    try {
        // console.log("Upload request received");
        const userID = req.userID;
        const role = req.role;
        // if(role !== "buyer"){
        //     return res.status(403).json({message: "Only buyers can upload profile images."})
        // }
        // if (!userID) {
        //     return res.status(400).json({
        //         message: "User ID missing from token",
        //         error: "Invalid user"
        //     });
        // }

        // Validate file presence
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
                error: "File is required"
            });
        }

        // console.log("File received:", {
        //     originalname: req.file.originalname,
        //     mimetype: req.file.mimetype,
        //     size: req.file.size,
        //     path: req.file.path
        // });

        const filePath = req.file.path;

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(400).json({
                message: "Uploaded file not found",
                error: "File path does not exist"
            });
        }

        // console.log("Uploading to Cloudinary...");

        // Upload to Cloudinary
        let result = await cloudinary.uploader.upload(filePath, {
            public_id: `uploaded_${Date.now()}`,
            transformation: [
                { width: 300, height: 300, crop: "limit" }, // Resize to smaller dimensions
                { quality: "auto:low" },                    // Strong compression
                { fetch_format: "auto" }                    // WebP/AVIF if supported
            ],
            folder: "CropConnect_ProfileImages"
        });


        // console.log("Cloudinary upload successful:", {
        //     public_id: result.public_id,
        //     secure_url: result.secure_url,
        //     format: result.format,
        //     width: result.width,
        //     height: result.height
        // });
        let myProfilePhoto;
        if (role === "buyer") {
            myProfilePhoto = await BuyerProfileModel.findOneAndUpdate(
                { userId: userID },
                { $set: { profileImage: result.secure_url } },
                { new: true }
            );
        } else if (role === "farmer") {
            myProfilePhoto = await FarmerProfileModel.findOneAndUpdate(
                { userId: userID },
                { $set: { profileImage: result.secure_url } },
                { new: true }
            );
        }

        // console.log("Database updated with new image URL");


        // Delete temp file
        try {
            fs.unlinkSync(filePath);
            // console.log("Temporary file deleted");
        } catch (deleteError) {
            console.warn("Could not delete temporary file:", deleteError.message);
        }


        // Return optimized image URL
        res.json({
            message: "Image uploaded and optimized successfully.",
            optimizedUrl: result.secure_url,
            myProfilePhoto,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height
        });

    } catch (error) {
        console.error("Upload error:", error);

        // Clean up temp file if it exists
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (cleanupError) {
                console.warn("Could not clean up temp file:", cleanupError.message);
            }
        }

        // Handle specific Cloudinary errors
        if (error.http_code) {
            return res.status(error.http_code).json({
                message: "Cloudinary upload failed",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Upload failed",
            error: error.message
        });
    }
});

// Health check endpoint
profileImgRoute.get("/health", (req, res) => {
    res.json({
        status: "OK",
        cloudinary_configured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
        // cloudinary_configured: !!(doavbw5k7 && 717798791252441 && VxRbFEvdzRVEwjiSjJYO2EGQHvI)

    });
});

module.exports = { profileImgRoute };