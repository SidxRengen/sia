import React, {useState, useEffect,useContext} from 'react'
import itemContext from '../context/itemContext';
import { useNavigate
} from "react-router-dom";
// import phoneContext from '../context/phoneContext';




export default function Card(props) {
  const b = useContext(itemContext);
  // const c = useContext(phoneContext);
  const [img, setImg] = useState();
  const nevigate = useNavigate() ;
  useEffect(() => {async function fc() {
    //console.log(props.imageurl);
    let data = await fetch("http://localhost:3000/owner/findimg", 
    { method: "POST", 
      body: JSON.stringify({
        "url": props.imageurl
      }) ,
      headers: {
        "Content-Type": "application/json"
      }
  });
    const imageBlob = await data.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
    // console.log(data);
  } fc();
  }, []);

  function navigateit(){
    // if(c.phone.number.length===10){
      b.funct(props.id, props.name, props.quantity, props.price, props.description, props.type, props.imageurl);
      nevigate('/productInfo');
    // }
    // else{

    //   nevigate('/auth/login');
    // }
  }

  return (
    <>
          <div className="card w-100" >
        <img src={img} className="card-img-top" onClick={navigateit}  alt={props.id}/>
                  <div className="card-body">
                      <h5 className="card-title">{props.name}</h5>
                      <p className="card-text">{props.description}</p>
                      <a onClick={navigateit} className="btn btn-primary">{props.price}</a>
                  </div>
          </div>
    </>
  )
}
