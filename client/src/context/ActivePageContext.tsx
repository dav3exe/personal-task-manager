// import { createContext, useContext, useState } from "react";

// export type ActiveType = "Cover Page"| "My Task" | "New Task" | "Edit Task" | ""

// export type TaskContextType = {
//   activePage: ActiveType
//   setActivePage: (nav: ActiveType) => void

// };

// export const ActiveContext = createContext<TaskContextType | null>(null);

// export const ActivePageProvider = ({ children }: { children: React.ReactNode }) => {

//     const [activePage, setActivePage] = useState<ActiveType>("Cover Page")
//     console.log(activePage);
    

//   return (
//   <ActiveContext.Provider value={{
//       activePage, setActivePage}}>
//       {children}
//     </ActiveContext.Provider>
//   );
// };

// export const useTaskActivePage = () => {
//   const context = useContext(ActiveContext);
//   if (!context) throw new Error("useTaskActivePage must be used inside TokenProvider");
//   return context;
// };