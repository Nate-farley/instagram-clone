import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";
import Header from "../components/header";

export default function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}