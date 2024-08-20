import { create } from "zustand";

export interface userTypes {
  firstName: string;
  lastName: string;
  email: string;
  departmentName?: string;
  role: "admin" | "department" | "central" | "director";
}

type userStoreProps = {
  user: userTypes | null;
  setUser: (user: userTypes) => void;
  deleteUser: () => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};

const useUserStore = create<userStoreProps>((set) => ({
  user: null,
  setUser: (user: userTypes) => set({ user }),
  deleteUser: () => set({ user: null }),
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
}));

export default useUserStore;
