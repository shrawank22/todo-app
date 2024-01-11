const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');  // for validation
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware')
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// Register Route ------------------------
router.post('/register', [
	body('name', 'Enter a valid name').isLength({ min: 3 }),
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password must be atleast 6 characters.').isLength({ min: 6 })
], async (req, res) => {
	// console.log(req.body);
	let success = false;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({success, errors: errors.array() }); // client side error
	}

	try {
		const name = req.sanitize(req.body.name);
		const email = req.sanitize(req.body.email);
		const password = req.sanitize(req.body.password);

		// const newUser = await User.create({ name: name, email: email, password: password });
		// console.log(newUser)

		// checking whether user with this email already exists
		let user = await User.findOne({ email: email });
		if (user) {
			success = false;
			return res.status(400).json({success, error: "Email already taken. Please use another email" });
		}

		// hasing password using bcryptjs
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(password, salt);

		user = await User.create({ name: name, email: email, password: secPass });

		const data = {
			user: {
				id: user._id
			}
		}

		const authtoken = jwt.sign(data, JWT_SECRET);
		// console.log(authToken)
		success = true;
		res.json({ success, authtoken })


	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message }) // server side error
	}

});



// Login Route /api/auth/login
router.post('/login', [
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
	let success = false;
	// If there are errors, return Bad request and the errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	let { email, password } = req.body;
	email = req.sanitize(email);
	password = req.sanitize(password);
	try {
		let user = await User.findOne({ email });
		if (!user) {
			success = false
			return res.status(400).json({ error: "Please try to login with correct credentials" });
		}

		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			success = false
			return res.status(400).json({ success, error: "Please try to login with correct credentials" });
		}

		const data = {
			user: {
				id: user.id
			}
		}
		const authtoken = jwt.sign(data, JWT_SECRET);
		success = true;
		res.json({ success, authtoken })

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});


// Fetch User Route -> Login required
router.post('/getuser', fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password") // selecting except password
		res.json(user)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router;