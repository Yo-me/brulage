import React from "react";

import { HydraAdmin } from "@api-platform/admin";


function Admin() {
    if(typeof window !== "undefined")
    {
        return <HydraAdmin entrypoint={window.origin} />;
    }

    return <></>;
};

export default Admin;