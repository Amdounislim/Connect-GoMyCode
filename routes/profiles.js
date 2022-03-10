const express = require("express");
const {
  createOrEditProfile,
  getAllgrantedProfiles,
  addNewInformation,
  deleteInformation,
  getProfileById
} = require("../controllers/profileController");
const {
  validator,
  profileValidation,
  educationRules,
  experienceRules,
  gomycodeRules,
  projectRules,
  skillRules
} = require("../middlewares/checkValidator");
const isAuth = require("../middlewares/passport-setup");




const router = express.Router();




//@route POST api/profiles/
//@desc Add or Edit Profiles
//@acess Private
router.post("/", isAuth(), profileValidation(), validator, createOrEditProfile);

//**********************************************/

//@route POST api/profiles/gomycode
//@desc Add gomycode
//@acess Private
router.put(
  "/gomycode",
  gomycodeRules(),
  validator,
  isAuth(),
  async (req, res) => {
    await addNewInformation(req, res, "gomycode");
  }
);

//@route DELETE api/profiles/gomycode/:id
//@desc DELETE gomycode
//@acess Private
router.delete("/gomycode/:id", isAuth(), async (req, res) => {
  await deleteInformation(req, res, "gomycode");
});

//**********************************************/

//@route put api/profiles/experiences
//@desc Add experiences
//@acess Private
router.put(
  "/experiences",
  experienceRules(),
  validator,
  isAuth(),
  async (req, res) => {
    await addNewInformation(req, res, "experiences");
  }
);

//@route DELETE api/profiles/experiences/:id
//@desc DELETE experiences
//@acess Private
router.delete("/experiences/:id", isAuth(), async (req, res) => {
  await deleteInformation(req, res, "experiences");
});

/**********************************************/

//@route put api/profiles/education
//@desc Add education
//@acess Private
router.put(
  "/education",
  educationRules(),
  validator,
  isAuth(),
  async (req, res) => {
    await addNewInformation(req, res, "education");
  }
);

//@route DELETE api/profiles/education/:id
//@desc delete education
//@acess Private
router.delete("/education/:id", isAuth(), async (req, res) => {
  await deleteInformation(req, res, "education");
});

//*********************************************/

//@route put api/profiles/project
//@desc Add project
//@acess Private
router.put(
  "/projects",
  isAuth(),
  projectRules(),
  validator,
  async (req, res) => {
    await addNewInformation(req, res, "projects");
  }
);

//@route put api/profiles/project/:id
//@desc delete project
//@acess Private
router.delete("/projects/:id", isAuth(), async (req, res) => {
  await deleteInformation(req, res, "projects");
});
//*********************************************/

//@route put api/profiles/skills
//@desc Add project
//@acess Private
router.put("/skills", isAuth(), skillRules(), validator, async (req, res) => {
  await addNewInformation(req, res, "skills");
});

//@route put api/profiles/skills/:id
//@desc delete project
//@acess Private
router.delete("/skills/:id", isAuth(), async (req, res) => {
  await deleteInformation(req, res, "skills");
});

//*********************************************/

//@route get api/profiles/
//@desc get granted profiles
//@acess Public
router.get("/", getAllgrantedProfiles);

//@route get api/profiles/profile/:id
//@desc get profile by userId
//@acess Public
router.get("/profile/:id", async (req, res) => {
  await getProfileById(req, res, req.params.id);
});
//@route get api/profiles/current
//@desc get auth user profile
//@acess Private
router.get("/current", isAuth(), async (req, res) => {
  await getProfileById(req, res, req.user._id);
});

module.exports = router;
