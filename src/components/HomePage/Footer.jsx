import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Footer() {
    return (
        <>
            <div className="fixed bottom-0 mt-5 left-0 right-0 pt-1 pb-2 bg-white shadow-md py-2 " style={{ borderTop: "1px solid #807d7a" }}>
                <div className="flex justify-around text-center">
                    <Link to="/" className="text-green-600 hover:text-green-700 flex flex-col items-center">
                        <img src="/public/images/Home.svg" alt="Home" />
                        <span className="mt-1 text-xs text-gray-600">Home</span>
                    </Link>
                    {/* <Link to="/alerts" className="text-green-600 hover:text-green-700 flex flex-col items-center">
                        <img src="./public/images/alert.svg" alt="Alerts" height={26} width={25} />
                        <span className="mt-1 text-xs text-gray-600">Alerts</span>
                    </Link> */}
                    <Link to="/captureimage" className="text-green-600 hover:text-green-700 flex flex-col items-center">
                        <img src="/public/images/camera.svg" alt="Capture" />
                        <span className="mt-1 text-xs text-gray-600">Capture Image</span>
                    </Link>
                    <Link to="/chat" className="text-green-600 hover:text-green-700 flex flex-col items-center">
                        <img src="/public/images/chats.svg" alt="Chats" />
                        <span className="mt-1 text-xs text-gray-600">Recommendations</span>
                    </Link>
                    <Link to="/report" className="text-green-600 hover:text-green-700 flex flex-col items-center">
                        <img src="/public/images/reports.svg" alt="Reports" />
                        <span className="mt-1 text-xs text-gray-600">Reports</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Footer;
