require('dotenv').config();
// ==============Models require======**
const Register = require("../src/models/registers");
const Dashboard = require("../src/models/userModel");
const FreeImageDashboardModel = require("../src/models/freeImageDashboard");
const blogDashboard = require("../src/models/blog");
const ShopingWeb = require("../src/models/Shoping");
const Python = require("../src/models/python");

const HindiStoryDashboard = require("../src/models/hindiStory");
const EnglishStorysDashboard = require("../src/models/EnglishStorys");
// ====== DSA Models================================================
const ArrayModel = require("../src/models/array");
const DPModel = require("../src/models/DPModel");
const GraphModel = require("../src/models/Graph");
const HashTableModel = require("../src/models/Hash_Table");
const HeapModel = require("../src/models/Heap");
const LinkedListModel = require("../src/models/LinkedList");
const LoopsModel = require("../src/models/Loops");
const QueueModel = require("../src/models/queue");
const StackModel = require("../src/models/stack");
const TreeModel = require("../src/models/tree");
const DSA = require("../src/models/DSA");
const WebsiteProjectModel = require("../src/models/WebsiteProject");
const ProjectsModel = require("../src/models/ProjectsModel");
const weeklyContestModel = require("../src/models/weeklyContest");
const POTDModel = require("../src/models/POTD");
const WebDPaidProjectModel = require("../src/models/WebD-paid-Project");
const runShowProjectModel = require("../src/models/runShowProjectModel");
const realtimeProjectsModel = require("../src/models/realtimeProjectsModel");
const uploadcodeDashboard = require("../src/models/uploadcode");
const AllInOne = require("../src/models/AllInOne");
// ==============Models end======**
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const index = async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};
const create = async (req, res) => {
    try {
        res.render("mkcodingcreate");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};

const Shoping_multiple_post = async (req, res) => {
    try {
        res.render("Shoping_multiple_post");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};
const loadLogin = async (req, res) => {
    try {
        const redirectUrl = req.query.Mkcoding;
        req.session.redirectUrl = redirectUrl
        res.render("login");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};
const registerLoad = async (req, res) => {
    try {
        res.render("signUp");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};

const secret = async (req, res) => {
    Python.find({})
        .then((data, err) => {
            try {
                res.render('secret', { items: data })
            } catch (err) {
                console.log(err);
                res.status(400).render("wrongchoice");
            }
        })
};
const secretlogin = async (req, res) => {
    try {
        res.render("secretlogin");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};
const profile = async (req, res) => {
    try {
        if (req.session.user) {
            res.render('profile', { user: req.session.user })
        }
        else {
            res.render("login")
        }
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const loadDashboard = async (req, res) => {
    try {
        res.render("dashboard");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};
const problems = async (req, res) => {
    try {
        // ======= search bar=============
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var AllInOnes = await AllInOne.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } },
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        // ======= End search bar=============
        const articles = await AllInOne.find({}, 'uploadID');
        const titlewebds = req.params.titlewebds;
        res.render(`${titlewebds}.ejs`, { items: AllInOnes, articles: articles, articlesJSON: JSON.stringify(articles) });
    } catch (err) {
        // go on userRought Middleware
        next(err);
    }
}
const python = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Pythons = await Python.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('python', { items: Pythons })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
// =================================Get DSA page =================
const DSAl = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var DSAs = await DSA.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('DSA', { items: DSAs })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const baseURL = 'https://mkcoding.online';
const DP = async (req, res) => {
    try {
        // ======= search bar=============
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Arrays = await DPModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        // ======= End search bar=============
        res.render('DP', { items: Arrays, baseURL: baseURL })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetArray = async (req, res) => {
    try {
        // ======= search bar=============
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Arrays = await ArrayModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        // ======= End search bar=============
        res.render('Array', { items: Arrays, baseURL: baseURL, })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetGraph = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Graphs = await GraphModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Graph', { items: Graphs })
    } catch (error) {
        console.log(error);
        res.status(400).render("wrongchoice");
    }

};
const GetHashTable = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var HashTables = await HashTableModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('HashTable', { items: HashTables })
    } catch (error) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetHeap = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Heaps = await HeapModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Heap', { items: Heaps })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetLinkedList = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var LinkedLists = await LinkedListModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('LinkedList', { items: LinkedLists })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetLoops = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Loopss = await LoopsModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Loops', { items: Loopss })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetQueue = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Queues = await QueueModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Queue', { items: Queues })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetStack = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Stacks = await StackModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Stack', { items: Stacks })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetTree = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var Trees = await TreeModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Tree', { items: Trees })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const realtimeProjects = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var realtimeProject = await realtimeProjectsModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('realtimeProjects', { items: realtimeProject })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
// =================================Get DSA page end =================
const WebsiteProject = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var WebsiteProjecs = await WebsiteProjectModel.find({
            $or: [
                { mainheading_h3: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('WebsiteProject', { items: WebsiteProjecs })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const runShowProject = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var runShowProjects = await runShowProjectModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('runShowProject', { items: runShowProjects })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const OnlineCompiler = async (req, res) => {
    try {
        const userInput = req.query.Manish_search || '';
        let filteredItems;

        if (userInput) {
            // Use Mongoose find method to query the database
            filteredItems = await runShowProjectModel.find({ mainheading_h3: { $regex: userInput, $options: 'i' } });
            res.render('OnlineCompiler', { items: filteredItems, userInput });
        } else {
            // Render an empty page if no search input
            res.render('OnlineCompiler', { items: [], userInput });
        }
    } catch (err) {
        console.log(err);
        res.status(400).render('wrongchoice');
    }
};
const WebDPaidProject = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var WebDPaidProjects = await WebDPaidProjectModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('WebD-paid-Project', { items: WebDPaidProjects })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const Projects = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var WebDProjects = await ProjectsModel.find({
            $or: [
                { mainheading_h6: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Projects', { items: WebDProjects })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const weeklyContest = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var weeklyContests = await weeklyContestModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('weeklyContest', { items: weeklyContests })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const POTD = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var POTDs = await POTDModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('POTD', { items: POTDs })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const shopnow = async (req, res) => {
    try {
        const search = req.query.search || '';
        let filteredItems;
        let item1;
        filteredItems = await ShopingWeb.find({ uploadID: { $regex: search, $options: 'i' } });

        if (search) {
            // Use Mongoose find method to query the database
            item1 = await ShopingWeb.find({ uploadID: { $regex: new RegExp(`\\b${search}\\b`, 'i') } });
            res.render('shopnow', { items: filteredItems, search, item1: item1 });
        } else {
            // Render an empty page if no search input
            res.render('shopnow', { items: [], search, item1: [] });
        }
    } catch (err) {
        console.log(err);
        res.status(400).render('wrongchoice');
    }
};

const wrongchoice = async (req, res) => {
    try {
        res.render("wrongchoice");
    } catch (error) {
        console.log(error.message);
    }
};

let saveOTP = {};
let saveemail = {};
const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
    // body = `
    //           Name : ` +  req.body.name
    // --------------------------------------------
    const emailuser = req.body.email
    const email = req.body.email
    let allCharacters = '0123456789';
    let Otp = ''
    for (let i = 0; i < 6; i++) {
        Otp += allCharacters[Math.floor(Math.random() * 10)];
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.useremail,
            pass: process.env.emailpass
        }
    })
    var mailOptions = {
        from: `${emailuser}`,
        to: email,
        subject: "OTP Verification from mkcoding.online",
        // text:body,
        html: `<p style="font-family: math;background: #222;padding: 12px; text-align: center; color: #5bf701; font-size: 27px; font-weight: bold;">
            Welcome to<b style="font-size: 30px;font-weight: bolder;">  MkCoding!</b>
        </p>
        <p style="font-family: 'Arial',  sans-serif;text-align: center; font-size: 18px;">
            Thank you for joining us. To verify your account, please enter the OTP below:
        </p>
        <p style="font-family: math; font-size: 17px;">
            Please make sure you never share this code with anyone.
        </p>
        <p style="font-family: system-ui;line-height: 1.5; color: #fff; font-size: 16px;font-weight: bolder; padding: 10px 30px; background: #444;">
            Enter the OTP : <b style="color: #15ff00; font-size: 20px; padding: 10px; background: #222; letter-spacing: 1px;margin: 0px 12px 1px 4px;"> <strong>${Otp}</strong> </b>to complete the verification process.
        </p>
        <br>
        <p style="font-family: 'Arial', sans-serif; font-size: 16px;background: #f4f4f4;padding: 25px;">
            <b style="color: red;">Note : </b>This OTP will expire in <b>5 minutes</b>.
        </p>
        <br>
        <p style="font-family: serif;text-align: center; background: #15ff00; font-size: 20px; padding: 15px;color: #f1f1f1;margin: 1px;" >
            If you didn't sign up for MkCoding, please ignore this email.
        </p>
        <p style="text-align: center; background: #333; height: 300px; margin: 0;">
        <a href="https://www.mkcoding.online/Shoping" style="text-decoration: none; display: inline-block; padding: 10px 20px; font-size: 16px;font-weight: 900; background-color: #5bf701; color: #fff; border-radius: 5px; margin-top: 15px;">
            Shoping with MkCoding
        </a>
        <a style="display: flex; padding: 30px 0 0 20px;color: #fff;" href="https://www.mkcoding.online/blog">Blogs</a>
        <a style="display: block;padding-right: 20px; text-align: right; color: #fff;" href="https://www.mkcoding.online/free_image_download">Download Images</a>
        <a style="display: block;padding: 10px; color: #fff;" href="https://www.mkcoding.online/DSA">DSA</a>
        <a style="display: flex; padding-left:20px; color: #15ff00;" href="https://t.me/mkcoding_online">Join Telegram</a>
        <a style="display: block;padding-right: 20px; text-align: right; color: #fff;" href="https://www.mkcoding.online/dashboardchat">Chating App</a>
        <a style="display: block;padding: 10px; color: #fff;" href="https://www.mkcoding.online/realtimeProjects">Play With Projects</a>
        <a style="display: flex; padding-left:20px; color: #fff;" href="https://www.mkcoding.online/runShowProject">WebD Projects</a>
        <a style="display: block;padding-right: 20px; text-align: right; color: #15ff00;" href="https://www.instagram.com/mkcoding.online/">Instagram</a>
        </p>`
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.status(500).send("couldn't send");
        } else {
            console.log("OTP Sent " + info.response);
            saveOTP[email] = Otp;
            saveOTP = Otp;
            console.log(saveOTP);
            saveemail = emailuser;
            setTimeout(() => {
                delete saveOTP
                saveOTP = {}
            }, 300000)
            console.log(err);
        }
    });
}


const register = async (req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassord;
        let otprecived = req.body.OTP;
        let email = req.body.email;
        // console.log(saveOTP, otprecived, email);

        if (password === cpassword) {
            if (saveemail === email) {
                if (saveOTP === otprecived) {
                    const registerEmployee = new Register({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: password,
                        confirmpassord: cpassword,
                        address: req.body.address,
                        image: 'images/' + req.file.filename,
                    })
                    const token = await registerEmployee.generateAuthToken();
                    res.cookie("jwt", token, {
                        // expires:new Date(Date.now() + 30000),
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None'
                    });
                    const registered = await registerEmployee.save();
                    const emailuser = req.body.email;
                    const subject = "Registration Confirmation from mkcoding.online";

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 587,
                        secure: false,
                        auth: {
                            user: process.env.useremail,
                            pass: process.env.emailpass
                        }
                    });

                    const mailOptions = {
                        from: `${emailuser}`,
                        to: email,
                        subject: subject,
                        html: `<p style="font-family: math;background: #222;padding: 12px; text-align: center; color: #5bf701; font-size: 27px; font-weight: bold;">
                        Registration Confirmed at <b style="font-size: 30px;font-weight: bolder;">MkCoding!</b>
                    </p>
                    <p style="font-family: 'Arial',  sans-serif;text-align: center; font-size: 18px;">
                        Thank you for joining us. Your registration has been successfully confirmed.
                    </p>
                    <p style="font-family: serif;text-align: center; background: #15ff00; font-size: 20px; padding: 15px;color: #f1f1f1;margin: 1px;" >
                        visit mkcoding.online.
                    </p>
                    <p style="text-align: center; background: #333; height: 300px; margin: 0;">
                     <a href="https://www.mkcoding.online/Shoping" style="text-decoration: none; display: inline-block; padding: 10px 20px; font-size: 16px;font-weight: 900; background-color: #5bf701; color: #fff; border-radius: 5px; margin-top: 15px;">
                         Shoping with MkCoding
                     </a>
                     <a style="display: flex; padding: 30px 0 0 20px;color: #fff;" href="https://www.mkcoding.online/blog">Blogs</a>
                     <a style="display: block;padding-right: 20px; text-align: right; color: #fff;" href="https://www.mkcoding.online/free_image_download">Download Images</a>
                     <a style="display: block;padding: 10px; color: #fff;" href="https://www.mkcoding.online/DSA">DSA</a>
                     <a style="display: flex; padding-left:20px; color: #fff;" href="https://www.mkcoding.online/EnglishStorys">Storys</a>
                     <a style="display: block;padding-right: 20px; text-align: right; color: #fff;" href="https://www.mkcoding.online/dashboardchat">Chating App</a>
                     <a style="display: block;padding: 10px; color: #fff;" href="https://www.mkcoding.online/realtimeProjects">Play With Projects</a>
                     <a style="display: flex; padding-left:20px; color: #fff;" href="https://www.mkcoding.online/runShowProject">WebD Projects</a>
                     <a style="display: block;padding-right: 20px; text-align: right; color: #15ff00;" href="www.youtube.com/@mkcoding.online">Join Youtube</a>
                     </p>`
                    };

                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log(err);
                            res.status(500).send("couldn't send confirmation email");
                        } else {
                            console.log("Confirmation Email Sent: " + info.response);
                        }
                    });
                    res.status(201).render("login");
                }
                else {
                    res.send("Invalid OTP")
                }
            } else {
                res.send("Email are not matching")
            }
        } else {
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).render("wrongchoice");
    }
};

const dashboard = async (req, res) => {
    try {
        const dashboard = new Dashboard({
            img: {
                data: fs.readFileSync(path.join(__dirname + '/public/images/' + req.file.filename)),
                contentType: 'image/png'
            },
            uploadClass: req.body.uploadClass,
            uploadID: req.body.uploadID,
            mainheading_h2: req.body.mainheading_h2,
            mainheading_h3: req.body.mainheading_h3,
            mainheading_h4: req.body.mainheading_h4,
            mainheading_h5: req.body.mainheading_h5,
            mainheading_h6: req.body.mainheading_h6,
            mainheading_p: req.body.mainheading_p,
            mainheading_span_1: req.body.mainheading_span_1,
            mainheading_span_2: req.body.mainheading_span_2,
            mainheading_span_3: req.body.mainheading_span_3,
            mainheading_span_4: req.body.mainheading_span_4,
            mainheading_Snumber_1: req.body.mainheading_Snumber_1,
            mainheading_Snumber_2: req.body.mainheading_Snumber_2,
            mainheading_Snumber_3: req.body.mainheading_Snumber_3,
            mainheading_Snumber_4: req.body.mainheading_Snumber_4,
            textarea_h4: req.body.textarea_h4,
            textarea_h5: req.body.textarea_h5,
            textarea: req.body.textarea,
        });

        if (req.body.uploadClass == "python") {
            Python.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        // ================== DSA Model save====================
        else if (req.body.uploadClass == "DSA") {
            DSA.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Array") {
            ArrayModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Graph") {
            GraphModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Hash_Table") {
            HashTableModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Heap") {
            HeapModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "LinkedList") {
            LinkedListModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Loops") {
            LoopsModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Queue") {
            QueueModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Stack") {
            StackModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "Tree") {
            TreeModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        // ================== DSA Model save end====================
        else if (req.body.uploadClass == "WebD") {
            WebsiteProjectModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "WebDPaidProject") {
            WebDPaidProjectModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "runShowProject") {
            runShowProjectModel.create(dashboard)
                .then((item) => {
                    res.render('index');
                })
                .catch((err) => {
                    // Log and handle the error
                    console.error('Error creating document:', err);
                    res.status(400).render('wrongchoice');
                });
        }
        else if (req.body.uploadClass == "projects") {
            ProjectsModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "POTD") {
            POTDModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "weeklyContest") {
            weeklyContestModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "hindiStory") {
            HindiStoryDashboard.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "EnglishStory") {
            EnglishStorysDashboard.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "blog") {
            blogDashboard.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "DP") {
            DPModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "uploadcode") {
            uploadcodeDashboard.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "realtimeProjects") {
            realtimeProjectsModel.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
        else if (req.body.uploadClass == "AllInOne") {
            AllInOne.create(dashboard)
                .then((err, item) => {
                    try {
                        res.render('index');
                    } catch (err) {
                        console.log(err);
                        res.status(400).render("wrongchoice");
                    }
                })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        const passwordMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        if (passwordMatch) {
            req.session.user = useremail;
            res.cookie('user', JSON.stringify(useremail), {
                expires: new Date(Date.now() + 300000),
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            });
            if (req.session.redirectUrl) {
                res.status(201).redirect(`https://mkcoding.manishji.site/${req.session.redirectUrl}`);
            } else {
                res.status(201).redirect("profile");
            }
        }
        else {
            res.send("Invalid details");
        }
    } catch (error) {
        res.status(400).render("wrongchoice");
    }
};

const secretloginpost = async (req, res) => {
    try {
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        const passwordMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        if (passwordMatch) {
            res.status(201).redirect("dashboard");
        }
        else {
            res.send("Invalid details");
        }
    } catch (error) {
        res.status(400).render("wrongchoice");
    }
};

const logOut = async (req, res, next) => {
    try {
        res.clearCookie('user');
        req.session.destroy();
        res.redirect("/login");
    } catch (error) {
        console.log(error.message);
        res.status(400).render("wrongchoice");
    }
};

// ======================= image download section=====
const freeImageDownload = async (req, res) => {
    try {
        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        var FreeImageDashboards = await FreeImageDashboardModel.find({
            $or: [
                { uploadClass: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { headinginh4: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('free_image_download', { items: FreeImageDashboards })
    } catch (err) {
        console.log(err);
    }
};
const freeImageDlogin = async (req, res) => {
    try {
        res.render("free_image_d_login");
    } catch (error) {
        console.log(error.message);
    }
};
const freeImageDashboard = async (req, res) => {
    try {
        res.render("free_image_dashboard");
    } catch (error) {
        console.log(error.message);
    }
};
const contactUs = async (req, res) => {
    try {
        res.render("contactUs");
    } catch (error) {
        console.log(error.message);
    }
};

const freeImageDloginpost = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await Register.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);

            if (passwordMatch) {
                req.session.user = userData;
                // res.cookie('user',JSON.stringify(userData));
                res.redirect("/free_image_dashboard");

            } else {
                res.render("free_image_d_login", { message: "invalid details" });
            }
        } else {
            res.render("free_image_d_login", { message: "invalid details" });
        }
    } catch (error) {
        console.log(error.message);
        res.render('wrongchoice')
    }
};

const freeImageDashboardpost = async (req, res) => {
    try {
        const freeImagedashboardModel = new FreeImageDashboardModel({
            img: {
                data: fs.readFileSync(path.join(__dirname + '/public/images/' + req.file.filename)),
                contentType: 'image/png'
            },
            uploadClass: req.body.uploadClass,
            heading: req.body.heading,
            headinginh4: req.body.headinginh4
        });

        // await dashboard.save();
        FreeImageDashboardModel.create(freeImagedashboardModel)
            .then((err, item) => {
                try {
                    res.render('free_image_d_login');
                } catch (err) {
                    console.log(err);
                    res.render('wrongchoice')
                }
            })

    } catch (error) {
        console.log(error.message);
        res.render('wrongchoice')
    }
};
// --- shoping--
const multer = require('multer');
const storageprofile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const name = file.originalname + '-' + Date.now();
        cb(null, name);
    }
});
const shopingBlogupload = async (req, res) => {
    try {
        // Access the storageprofile variable in this scope
        const Imagesave = new ShopingWeb({
            file1: 'images/' + req.files['file1'][0].filename,
            file2: 'images/' + req.files['file2'][0].filename,
            file3: 'images/' + req.files['file3'][0].filename,
            file4: 'images/' + req.files['file4'][0].filename,
            file5: 'images/' + req.files['file5'][0].filename,
            file6: 'images/' + req.files['file6'][0].filename,
            uploadID: req.body.uploadID,
            mainheading_h2: req.body.mainheading_h2,
            mainheading_h3: req.body.mainheading_h3,
            mainheading_h4: req.body.mainheading_h4,
            mainheading_h6: req.body.mainheading_h6,
            mainheading_p: req.body.mainheading_p,
        });

        await Imagesave.save();

        return res.status(201).render("index");
    } catch (error) {
        console.error("Error in file upload route:", error);
        return res.status(500).send("Internal Server Error.");
    }
};
// --- shoping end--


// ======================= image download section end=====
const Blog = async (req, res) => {
    try {
        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        var blogs = await blogDashboard.find({
            $or: [
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_p: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('blog', { items: blogs })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const HindiStorys = async (req, res) => {
    try {
        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        var HindiStorys = await HindiStoryDashboard.find({
            $or: [
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_p: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('hindiStory', { items: HindiStorys })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const GetEnglishStorys = async (req, res) => {
    try {
        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        var EnglishStoryss = await EnglishStorysDashboard.find({
            $or: [
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_p: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('EnglishStorys', { items: EnglishStoryss })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const Shoping = async (req, res) => {
    try {
        var search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        var ShopingWebs = await ShopingWeb.find({
            $or: [
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h3: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('Shoping', { items: ShopingWebs })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};
const uploadcode = async (req, res) => {
    try {
        var search = '';
        if (req.query.Manish_search) {
            search = req.query.Manish_search;
        }
        var uploadcodeDashboards = await uploadcodeDashboard.find({
            $or: [
                { mainheading_h2: { $regex: '.*' + search + '.*', $options: 'i' } }, // i=>ignore small and capital laters
                { mainheading_h3: { $regex: '.*' + search + '.*', $options: 'i' } },
            ]
        });
        res.render('uploadcode', { items: uploadcodeDashboards, baseURL: baseURL })
    } catch (err) {
        console.log(err);
        res.status(400).render("wrongchoice");
    }
};

const videoplayer = async (req, res) => {
    try {
        res.render("videoplayer");
    } catch (error) {
        console.log(error.message);
    }
};

const thanku = async (req, res) => {
    try {
        res.render("thanku");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    index,
    loadLogin,
    registerLoad,
    secret,
    secretlogin,
    profile,
    loadDashboard,
    python,
    wrongchoice,
    register,
    dashboard,
    login,
    secretloginpost,
    logOut,
    freeImageDownload,
    Blog,
    HindiStorys,
    freeImageDlogin,
    freeImageDashboard,
    contactUs,
    freeImageDloginpost,
    freeImageDashboardpost,
    Shoping,
    videoplayer,
    realtimeProjects,
    //  for DSA 
    DSAl,
    GetArray,
    DP,
    GetGraph,
    GetHashTable,
    GetHeap,
    GetLinkedList,
    GetLoops,
    GetQueue,
    GetStack,
    GetTree,
    GetEnglishStorys,
    WebsiteProject,
    WebDPaidProject,
    Projects,
    weeklyContest,
    POTD,
    shopnow,
    uploadcode,
    runShowProject,
    OnlineCompiler,
    Shoping_multiple_post,
    shopingBlogupload,
    thanku,
    sendOtp,
    create,
    problems
}