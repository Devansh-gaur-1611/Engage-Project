import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "../features/Sidebar/SidebarSlice";

export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
  },
});
