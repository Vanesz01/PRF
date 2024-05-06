"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const main_class_1 = require("../main-class");
const User_1 = require("../model/User");
const Book_1 = require("../model/Book");
const Club_1 = require("../model/Club");
const Review_1 = require("../model/Review");
const configureRoutes = (passport, router) => {
    router.get("/", (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.status(200).send("Hello, World!");
    });
    router.get("/callback", (req, res) => {
        let myClass = new main_class_1.MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            }
            else {
                res.write(result);
                res.status(200).end();
            }
        });
    });
    router.get("/promise", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let myClass = new main_class_1.MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
                res.write(data);
                res.status(200).end();
            }).catch((error: string) => {
                res.write(error);
                res.status(400).end();
            }); */
        // async-await
        try {
            const data = yield myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        }
        catch (error) {
            res.write(error);
            res.status(400).end();
        }
    }));
    router.get("/observable", (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.setHeader("Transfer-Encoding", "chunked");
        // deprecated variant
        /* myClass.monitoringObservable().subscribe((data) => {
                console.log(data);
            }, (error) => {
                console.log(error);
            }, () => {
                console.log('complete');
            }); */
        myClass.monitoringObservable().subscribe({
            next(data) {
                res.write(data);
            },
            error(error) {
                res.status(400).end(error);
            },
            complete() {
                res.status(200).end();
            },
        });
    });
    // USER
    router.post("/login", (req, res, next) => {
        passport.authenticate("local", (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send("User not found.");
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Internal server error.");
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post("/register", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User_1.User({
            email: email,
            password: password,
            name: name,
            address: address,
            nickname: nickname,
        });
        user
            .save()
            .then((data) => {
            res.status(200).send(data);
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    router.post("/logout", (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send("Internal server error.");
                }
                res.status(200).send("Successfully logged out.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/getAllUsers", (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.find().populate("clubs");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/checkAuth", (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(500).send(false);
        }
    });
    router.put("/addClubToUser", (req, res) => {
        const clubId = req.body.clubId;
        const userId = req.body.userId;
        if (!clubId) {
            return res.status(400).json({ error: "Club ID is required" });
        }
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        User_1.User.updateOne({ _id: userId }, { $push: { clubs: clubId } })
            .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).send({ error: "User not found" });
            }
            res.status(200).send(updatedUser);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update user", message: error.message });
        });
    });
    router.get("/getCurrentUser", (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.findOne({ _id: req.user });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.put("/addReviewToUser", (req, res) => {
        const reviewId = req.body.reviewId;
        const userId = req.body.userId;
        if (!reviewId) {
            return res.status(400).json({ error: "Review ID is required" });
        }
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        User_1.User.updateOne({ _id: userId }, { $push: { reviews: reviewId } })
            .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).send({ error: "User not found" });
            }
            res.status(200).send(updatedUser);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update user", message: error.message });
        });
    });
    router.delete("/deleteUser", (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.userId;
            if (!id) {
                return res.status(400).json({ error: "User ID is required" });
            }
            const query = User_1.User.deleteOne({ _id: id });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.put("/changeUserData", (req, res) => {
        const userId = req.body.userId;
        const name = req.body.name;
        const nickname = req.body.nickname;
        const address = req.body.address;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        User_1.User.updateOne({ _id: userId }, { $set: { name: name, nickname: nickname, address: address } })
            .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).send({ error: "User not found" });
            }
            res.status(200).send(updatedUser);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update user", message: error.message });
        });
    });
    // BOOK
    router.post("/saveBook", (req, res) => {
        const title = req.body.title;
        const author = req.body.author;
        const book = new Book_1.Book({
            title: title,
            author: author,
        });
        book
            .save()
            .then((data) => {
            res.status(200).send(data);
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    router.get("/getAllBooks", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Book_1.Book.find().populate("clubs");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.put("/addClubToBook", (req, res) => {
        const clubId = req.body.clubId;
        const bookId = req.body.bookId;
        if (!clubId) {
            return res.status(400).json({ error: "Club ID is required" });
        }
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }
        Book_1.Book.updateOne({ _id: bookId }, { $push: { clubs: clubId } })
            .then((updatedBook) => {
            if (!updatedBook) {
                return res.status(404).send({ error: "Book not found" });
            }
            res.status(200).send(updatedBook);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update book", message: error.message });
        });
    });
    router.put("/setBookOfTheMonth", (req, res) => {
        const value = req.body.value;
        const bookId = req.body.bookId;
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }
        Book_1.Book.findOneAndUpdate({ _id: bookId }, { isBookOfTheMonth: value })
            .then((updatedBook) => {
            if (!updatedBook) {
                return res.status(404).send({ error: "Book not found" });
            }
            res.status(200).send(updatedBook);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update book", message: error.message });
        });
    });
    router.get("/getBookOfTheMonth", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Book_1.Book.findOne({ isBookOfTheMonth: true });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/getBooksForClub", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Book_1.Book.find({ clubs: { $eq: req.query.clubId } });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/getBook", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Book_1.Book.findOne({ _id: { $eq: req.query.bookId } });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.put("/addReviewToBook", (req, res) => {
        const reviewId = req.body.reviewId;
        const bookId = req.body.bookId;
        if (!reviewId) {
            return res.status(400).json({ error: "Review ID is required" });
        }
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }
        Book_1.Book.updateOne({ _id: bookId }, { $push: { reviews: reviewId } })
            .then((updatedBook) => {
            if (!updatedBook) {
                return res.status(404).send({ error: "Book not found" });
            }
            res.status(200).send(updatedBook);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update book", message: error.message });
        });
    });
    router.delete("/deleteBook", (req, res) => {
        if (req.isAuthenticated()) {
            const bookId = req.query.bookId;
            if (!bookId) {
                return res.status(400).json({ error: "Book ID is required" });
            }
            const query = Book_1.Book.deleteOne({ _id: bookId });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    // CLUB
    router.post("/saveClub", (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const club = new Club_1.Club({
            name: name,
            description: description,
        });
        club
            .save()
            .then((data) => {
            res.status(200).send(data);
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    router.get("/getAllClubs", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Club_1.Club.find().populate("books").populate("users");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.put("/addUserToClub", (req, res) => {
        const clubId = req.body.clubId;
        const userId = req.body.userId;
        if (!clubId) {
            return res.status(400).json({ error: "Club ID is required" });
        }
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        Club_1.Club.updateOne({ _id: clubId }, { $push: { users: userId } })
            .then((updatedClub) => {
            if (!updatedClub) {
                return res.status(404).send({ error: "Club not found" });
            }
            res.status(200).send(updatedClub);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update club", message: error.message });
        });
    });
    router.put("/addBookToClub", (req, res) => {
        const clubId = req.body.clubId;
        const bookId = req.body.bookId;
        if (!clubId) {
            return res.status(400).json({ error: "Club ID is required" });
        }
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }
        Club_1.Club.updateOne({ _id: clubId }, { $push: { books: bookId } })
            .then((updatedClub) => {
            if (!updatedClub) {
                return res.status(404).send({ error: "Club not found" });
            }
            res.status(200).send(updatedClub);
        })
            .catch((error) => {
            res
                .status(500)
                .send({ error: "Unable to update club", message: error.message });
        });
    });
    router.get("/getMyClubs", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Club_1.Club.find({ users: { $eq: req.user } })
                .populate("books")
                .populate("users");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/getNotMyClubs", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Club_1.Club.find({ users: { $ne: req.user } })
                .populate("books")
                .populate("users");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/getClub", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Club_1.Club.findOne({ _id: { $eq: req.query.clubId } }).populate("books");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.delete("/deleteClub", (req, res) => {
        if (req.isAuthenticated()) {
            const clubId = req.query.clubId;
            if (!clubId) {
                return res.status(400).json({ error: "Club ID is required" });
            }
            const query = Club_1.Club.deleteOne({ _id: clubId });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    // REVIEW
    router.get("/getReviewsForBook", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Review_1.Review.find({ book: { $eq: req.query.bookId } }).populate("user");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.put("/saveReview", (req, res) => {
        const rating = req.body.rating;
        const comment = req.body.comment;
        const date = req.body.date;
        const bookId = req.body.bookId;
        const userId = req.body.userId;
        const book = new Review_1.Review({
            rating: rating,
            comment: comment,
            date: date,
            book: bookId,
            user: userId,
        });
        book
            .save()
            .then((data) => {
            res.status(200).send(data);
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    router.delete("/deleteReview", (req, res) => {
        if (req.isAuthenticated()) {
            const reviewId = req.query.reviewId;
            if (!reviewId) {
                return res.status(400).json({ error: "Review ID is required" });
            }
            const query = Review_1.Review.deleteOne({ _id: reviewId });
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    router.get("/getAllReviews", (req, res) => {
        if (req.isAuthenticated()) {
            const query = Review_1.Review.find().populate("user").populate("book");
            query
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error.");
            });
        }
        else {
            res.status(500).send("User is not logged in.");
        }
    });
    return router;
};
exports.configureRoutes = configureRoutes;
