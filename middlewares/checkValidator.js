const { check, validationResult } = require("express-validator");

//Registration Validation
const registerValidation = () => [
  check("name", "Name is required").notEmpty(),
  check("lastName", "Last Name is required").notEmpty(),
  check("email", "Please enter a valid email adress !").isEmail(),
  check("phone", "Phone Number is required").notEmpty(),
  check("password", "Password minimum 6 characters").isLength({
    min: 6,
    max: 20
  })
];

const editAccountValidation = () => [
  check("name", "Name is required").notEmpty(),
  check("lastName", "Last Name is required").notEmpty(),
  check("email", "Please enter a valid email adress !").isEmail(),
  check("phone", "Phone Number is required").notEmpty()
];

//Login Validation

const loginValidation = () => [
  check("email", "Please enter a valid email adress !").isEmail(),
  check("password", "Password minimum 6 characters").isLength({
    min: 6,
    max: 20
  })
];

//Profile Validation

const profileValidation = () => [
  check("location", "Please enter a valid Location !").notEmpty(),
  check("status", "Please enter a valid status !").notEmpty()
];

//Gomycode certification
const gomycodeRules = () => [
  check("track", "Please select a track").notEmpty(),
  check("from", "From date is required").notEmpty()
];
//Skill Form
const skillRules = () => [
  check("skill", "Please enter a Skill").notEmpty(),
  check("level", "Please enter you skill level").isNumeric({ no_symbols: true })
];

//Experience Form
const experienceRules = () => [
  check("title", "Title is required").notEmpty(),
  check("company", "Company is required").notEmpty(),
  check("from", "From date is required").notEmpty()
];
//Education Form
const educationRules = () => [
  check("school", "school is required").notEmpty(),
  check("degree", "degree is required").notEmpty(),
  check("fieldofstudy", "Field of study is required").notEmpty(),
  check("from", "From date is required").notEmpty()
];

//Post Form
const projectRules = () => [
  check("title", "Title is required ").notEmpty(),
  check("description", "Description is required ").notEmpty(),
  check("githubLink", "Github Link is required ").notEmpty()
];

const scoreRules = () => [
  check("checkpoint", "Value must be a number")
    .isNumeric()
    .notEmpty(),
  check("onetoone", "Value must be a number")
    .isNumeric()
    .notEmpty()
];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map(el => el.msg) });
  }
  next();
};

module.exports = {
  validator,
  registerValidation,
  loginValidation,
  profileValidation,
  educationRules,
  experienceRules,
  gomycodeRules,
  projectRules,
  skillRules,
  editAccountValidation,
  scoreRules
};
