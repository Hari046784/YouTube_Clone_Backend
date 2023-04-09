import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './db/connect.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from "./routes/users.route.js";
import commentRoutes from './routes/comments.route.js';
import videoRoutes from './routes/videos.route.js';




const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "https://youtubecloneapplication1.netlify.app"],
        credentials: true,
    })
);
    
// dotenv environment setup  
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

//Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something Error";
    return res.status(status).json({
        success: false,
        status,
        message,
        stack: err.stack,
    });
});

//Testing
app.get("/", (req, res)=>{
    res.status(200).send("Welcome to My Youtube Application");
})

//Initializing the port number
const PORT = process.env.PORT || 8080;

app.listen(PORT, async ()=>{
    console.log(`Application is running on PORT ${PORT}`);
    await connect();
});
