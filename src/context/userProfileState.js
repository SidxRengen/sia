import { useState } from "react";
import profileContext from "./userProfileContext";

const ProfileState = (props) => {
    const [name ,upname] = useState("");
    const [address, upaddress] = useState("");
    const [phone, upphone] = useState("");
    const [zip,upzip]=useState("") ;
    const [previousOrders , setOrders] = useState() ;
    async function func(phon) {
        let res = await fetch("http://localhost:3000/auth/getdata", {
            method: "POST",
            body: JSON.stringify({"phone":phon}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const rs = await res.json();
        // now the rs contain the data as object

        upname(rs.name);
        upphone(rs.phone) ;
        upaddress(rs.address) ;
        upzip(rs.zip) ;


        // this is for order
        let wes = await fetch("http://localhost:3000/confirm/seeorder", {
            method: "POST",
            body: JSON.stringify({ "phone": phon }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const ws = await wes.json();
        setOrders(ws) ;
    }
    return (
        <profileContext.Provider value={{ name,address,phone,zip,previousOrders, func }}>
            {props.children}
        </profileContext.Provider>
    )
}

export default ProfileState;