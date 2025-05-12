import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function AppLayout(){
    return(
        <div className="flex min-h-screen ]">
            <SideBar/>
            <main className=" flex-1 p-6 bg-gray-50 overflow-auto">
                <Outlet/>
            </main>
        </div>
    );
}

export default AppLayout;
