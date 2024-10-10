require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("../src/middleware/Auth");
const bodyParser = require('body-parser');

// const { json } = require("express");
var session = require('express-session');

// ======= for current user =====
const { SESSION_SECRET } = process.env;
app.use(session({secret:SESSION_SECRET}));
// ======= for current user end =====


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));





const static_path = path.join(__dirname, "../public");
const statics_path = path.join(__dirname, "../public/js/style3.js");
const Images_path = path.join(__dirname, "../public/images");
const template_path = path.join(__dirname, "../templates/views");
app.use(express.static(static_path));
app.use(express.static(statics_path));
app.use(express.static(Images_path));
app.set("view engine", "ejs");
app.set("views", template_path);


const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './Controller/public/images');
    },
    filename:function(req,file,cb){
        const name = file.originalname + '-' + Date.now()
        cb(null,name);
    }
});
const storageprofile = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images');
    },
    filename:function(req,file,cb){
        const name = file.originalname + '-' + Date.now()
        cb(null,name);
    }
});
const upload = multer({storage:storage});
const uploadprofile = multer({storage:storageprofile});

const userController = require('../Controller/userController');


// --create new page ---
const { titlewebds } = require('process');

app.use(bodyParser.urlencoded({ extended: true }));


// Handle form submission
app.post('/createPage', (req, res) => {
    const titlewebds = req.body.titlewebds;
    const  content  = req.body.content;
    const fileName = `${titlewebds}.ejs`;
    const filePath = `templates/views/${fileName}`; // Assuming your views directory is at the root level
    const fileContent = generateHTML(titlewebds, content);
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating page.');
            return;
        }
        res.send(`Page created successfully! <a href="/programm/${encodeURIComponent(titlewebds)}">View Page</a>`);
    });
});

// Dynamic route for serving created pages
app.get("/programm/:titlewebds",userController.problems);

// Error handling middleware from userController
app.use((err, req, res, next) => {
    if (err.message && err.message.startsWith("Failed to lookup view")) {
        // If the error message indicates a failed view lookup, redirect to "wrongchoice"
        res.status(404).render("wrongchoice");
    } else {
        // Otherwise, pass the error to the default error handler
        next(err);
    }
});

// Default error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Helper function to generate HTML content
function generateHTML(titlewebd, content) {
  return `${content}`;
}
// --create new page end---

app.get("/signUp",userController.registerLoad);
app.post("/signUp",uploadprofile.single('image'), userController.register);

app.get('/',userController.index);
app.get('/login',userController.loadLogin);
app.post('/login',userController.login);
app.get('/mkcodingcreate',auth.isLogin,userController.create);


app.get("/secret",auth.isLogin,userController.secret);
app.get("/secretlogin",auth.isLogin,userController.secretlogin);
app.post("/secretlogin",auth.isLogin,userController.secretloginpost);
app.get("/profile",auth.isLogin,userController.profile);
app.get("/python",userController.python);
app.get("/wrongchoice",userController.wrongchoice);
app.get('/dashboard',auth.isLogin,userController.loadDashboard);
app.post('/dashboard',auth.isLogin,upload.single('image'), userController.dashboard);

app.get("/logOut",auth.isLogin,userController.logOut);

app.get('/free_image_download',userController.freeImageDownload);
app.get('/free_image_d_login',userController.freeImageDlogin);
app.post('/free_image_d_login',userController.freeImageDloginpost);
app.get('/free_image_dashboard',auth.isLogin,userController.freeImageDashboard);
app.post('/free_image_dashboard',upload.single('image'),userController.freeImageDashboardpost);
app.get('/contactUs',userController.contactUs);
app.get('/blog',userController.Blog);
app.get('/Shoping',userController.Shoping);
app.get('/shopnow',userController.shopnow);
app.get('/videoplayer',userController.videoplayer);

app.get('/hindiStory',userController.HindiStorys);
app.get('/EnglishStorys',userController.GetEnglishStorys);

// ==================== for DSA get=======================
app.get("/DSA",userController.DSAl);
app.get("/Array",userController.GetArray);
app.get("/Graph",userController.GetGraph);
app.get("/HashTable",userController.GetHashTable);
app.get("/Heap",userController.GetHeap);
app.get("/LinkedList",userController.GetLinkedList);
app.get("/Loops",userController.GetLoops);
app.get("/Queue",userController.GetQueue);
app.get("/Stack",userController.GetStack);
app.get("/Tree",userController.GetTree);
app.get("/thanku",userController.thanku);
app.get("/uploadcode",userController.uploadcode);
app.post("/sendOtp",userController.sendOtp);

// ==================== for DSA get end=======================
app.get("/WebsiteProject",userController.WebsiteProject);
app.get("/Projects",userController.Projects);
app.get("/weeklyContest",userController.weeklyContest);
app.get("/POTD",userController.POTD);
app.get("/DP",userController.DP);
app.get("/WebD-paid-Project",userController.WebDPaidProject);
app.get("/runShowProject",userController.runShowProject);
app.get("/OnlineCompiler",userController.OnlineCompiler);
app.get("/realtimeProjects",userController.realtimeProjects);

// --- shoping ---
app.get("/Shoping_multiple_post",auth.isLogin,userController.Shoping_multiple_post);

const shopingupload = multer({ storage: storageprofile }).fields([
    { name: 'file1', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
    { name: 'file4', maxCount: 1 },
    { name: 'file5', maxCount: 1 },
    { name: 'file6', maxCount: 1 }
]);
app.post("/shopingupload",shopingupload,userController.shopingBlogupload);
// --- shoping end ---


// ===============chat app ==================
const storageGroup = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const uploadGroup = multer({storage:storageGroup});

const userControllerchat = require('../Controller/userControllerchat');

const authchat = require("../src/middleware/authchat");


app.get('/logoutchat',authchat.isLogin,userControllerchat.logoutchat);

app.get('/dashboardchat',authchat.isLogin,userControllerchat.loadDashboard);
app.post('/save-chat',userControllerchat.saveChat);

app.post('/delete-chat',userControllerchat.deleteChat);
app.post('/update-chat',userControllerchat.updateChat);

app.get('/groups',authchat.isLogin,userControllerchat.loadGroups);
app.post('/groups',uploadGroup.single('image'),userControllerchat.createGroup);

app.post('/get-members',authchat.isLogin,userControllerchat.getMembers);
app.post('/add-members',authchat.isLogin,userControllerchat.addMembers);

app.post('/update-chat-group',authchat.isLogin,uploadGroup.single('image'),userControllerchat.updateChatGroup);
app.post('/delete-chat-group',authchat.isLogin,userControllerchat.deleteChatGroup);
app.get('/share-group/:id',userControllerchat.shareGroup);
app.post('/join-group',userControllerchat.joinGroup);
app.get('/group-chat',authchat.isLogin,userControllerchat.groupChats);

app.post('/group-chat-save',userControllerchat.saveGroupChat);
app.post('/load-group-chats',userControllerchat.loadGroupChats);

app.post('/delete-group-chat',userControllerchat.deleteGroupChat);
app.post('/update-group-chat',userControllerchat.updateGroupChat);



app.get("*", function(req,res){
    res.redirect('wrongchoice')
});
const nodemailer = require("nodemailer");

app.post("/sendemail", async (req,res)=>{
    // exzecute this middleware to upload the image

        
            emailuser = req.body.email
            subject = req.body.subject

            var transporter = nodemailer.createTransport({
                service:'gmail',
                port:587,
                secure:false,
                auth:{
                    user:process.env.useremail,
                    pass:process.env.emailpass
                }
            })
            var mailOptions = {
                from:`${emailuser}`,
                to:process.env.useremail,
                subject:subject,
                html : `<p style="background: #333;padding: 10px; color: #fff;font-size: 28px; text-align: center;">Contact Us Email</p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Name:</strong> ${req.body.name}
            </p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Email:</strong> ${req.body.email}
            </p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Phone Number:</strong> ${req.body.number}
            </p>
            <p style="padding: 10px;margin: 1px; background: #222;color: #f2f2f2; font-family: math; font-size: 20px; padding-left: 100px;">
                <strong style="color: #72f706;padding: 10px;">Message:</strong> ${req.body.message}
            </p>
            <p style="background: #333;padding: 10px; color: #fff;font-size: 28px; text-align: center;">From Mkcoding</p>`
            }
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email Sent " + info.response);
                    res.render('thanku')
                }
            })
            
        }
);

module.exports = app;