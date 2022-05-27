import Joi from 'joi';
import { AttendanceTime, User } from "../../models";
import CustomErrorHandler from "../../Services/CustomerrorHandler";
import discord from '../../Services/discord';


function convertDate(createdAt) {
    let milliseconds = new Date(createdAt)
    return milliseconds.getTime()
}

const userController = {
    async getUsersOne(req, res, next) {
        const id = req.params.id;
        if (!id) {
            return next(CustomErrorHandler.badRequest())
        }
        let data;
        try {
            const document = await User.findOne({ _id: req.params.id }).select('-updatedAt -__v -password -role -encodings ');
            const convertedDate = convertDate(document.createdAt);
            data = {
                id: document._id,
                userName: document.userName,
                email: document.email,
                teamName: document.teamName,
                attendance: document.attendance,
                joiningDate: convertedDate,
                workProfile: document.workProfile,
                contactNumber: document.contactNumber,
                profileImgLink: document.profileImgLink,
            }
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.params.id, "Get one user", err);
            return next(CustomErrorHandler.serverError());
        }
        res.status(200).json({ status: "success", users: data });
    },
    async getUsersTeam(req, res, next) {

        const teamName = req.params.teamName;
        let document;
        try {
            document = await User.find({ teamName }).select('-updatedAt -__v -createdAt -password -role -encodings ');
        } catch (err) {
            discord.SendErrorMessageToDiscord(teamName, "Get all user", err);
            return next(CustomErrorHandler.serverError());
        }
        res.status(200).json({ status: "success", users: document });
    },
    async updateAttendance(req, res, next) {
        //  use pagination here for big data library is mongoose pagination
        const attendanceSchema = Joi.object({
            id: Joi.string().required(),
            status: Joi.string().required(),
        })

        const { error } = attendanceSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest(error));
        }
        let data;
        try {
            const { id, status } = req.body;
            const today = new Date();
            const date = today.getDate();
            const oldData = await User.findOne({ _id: id });
            const attendanceTime = await AttendanceTime.findOne({ adminId: oldData.adminId })

            if (attendanceTime.attendanceTime > today.getHours()) {
                return next(CustomErrorHandler.badRequest())
            }
            if (oldData) {
                let days_list = oldData.attendance.currentMonth
                days_list[date - 1] = status;
                const attendance = {
                    previousMonth: oldData.attendance.previousMonth,
                    currentMonth: days_list
                }
                data = await User.findOneAndUpdate({ _id: id }, {
                    attendance
                });
                if (!data) {
                    return next(CustomErrorHandler.badRequest("No user exist !!"))
                }
            }

        } catch (error) {
            discord.SendErrorMessageToDiscord(req.body.id, "Update Attendance", error);
            return next(CustomErrorHandler.serverError())
        }
        res.status(200).json({ status: "success", msg: "Attendance updated successfully !!" });
    }
}

export default userController;