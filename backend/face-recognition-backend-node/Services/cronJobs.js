import cron from "node-cron";
import { User } from "../models";

const d = new Date();
// Asia/Kolkata
const cronJobs = {
    NewMonthDefaults() {
        cron.schedule(`05 00 * * *`, async () => {
            const allUsers = await User.find();
            allUsers.forEach(async (singleUser) => {
                const attendance = singleUser.attendance;
                const P = attendance.previousMonth.P;
                const A = attendance.previousMonth.P;

                attendance.currentMonth.forEach(element => {
                    if (element == 'P') { P++ }
                    if (element == 'A') { A++ }
                });
                const month = d.getMonth() + 1;
                const year = d.getFullYear();

                const days = daysInMonth(month, year)
                const blank_days_list = Array(days).fill('A')
                const newAttendance = {
                    previousMonth: { P: P, A: A },
                    currentMonth: blank_days_list
                }
                const id = singleUser._id;
                await User.findOneAndUpdate({ _id: id }, { attendance: newAttendance })
            });
            console.log('cron is complete the new month defaults settings !!');
        }, {
            scheduled: true,
            timezone: "Asia/Kolkata"
        });
    }
}

export default cronJobs;