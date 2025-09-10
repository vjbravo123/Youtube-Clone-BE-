import protect from "../middleware/authMiddleware.js";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);

export default router;
