import BarangayIndigency from "../models/barangay.indigency.model.js";

export const createBarangayIndigency = async (req, res, next) => {
    try {
        const { name, address, contactNumber, monthlyIncome, purpose } = req.body;

        const barangayIndigency = new BarangayIndigency({
            name,
            address,
            contactNumber,
            monthlyIncome,
            purpose,
        });

        await barangayIndigency.save();

        res.status(201).json({
            success: true,
            data: barangayIndigency,
        });
    } catch (error) {
        next(error);
    }
};

export const verifyBarangayIndigency = async (req, res, next) => {
    try {
        const { id } = req.params;

        const barangayIndigency = await BarangayIndigency.findById(id);

        if (!barangayIndigency) {
            return res.status(404).json({
                success: false,
                message: "Barangay Indigency not found",
            });
        }

        barangayIndigency.isVerified = true;
        barangayIndigency.dateOfIssuance = new Date();

        await barangayIndigency.save();

        res.status(200).json({
            success: true,
            data: barangayIndigency,
        });
    } catch (error) {
        next(error);
    }
};
