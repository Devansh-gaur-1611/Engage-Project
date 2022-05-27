import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "../features/Sidebar/SidebarSlice";
import DepartmentSlice from "../features/Department/DepartmentSlice"
export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
    department : DepartmentSlice
  },
});
