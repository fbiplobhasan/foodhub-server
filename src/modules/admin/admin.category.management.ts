import { Router } from "express";
import { prisma } from "../../lib/prisma";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post("/add-category", auth(UserRole.ADMIN), async (req, res) => {
  try {
    const result = await prisma.category.create({ data: req.body });
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/:id", auth(UserRole.ADMIN), async (req, res) => {
  try {
    const id = req.params.id as string;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found!" });
    }

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Could not delete category. Ensure no meals are linked to it.",
      error: error.message,
    });
  }
});

export const adminCategorymanagementRoute = router;
