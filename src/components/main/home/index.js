import React from "react";
import Club from "../club";

export default function Home({title, endpoint, tags}) {
  return (
    <div className="px-3 overflow-auto container-home">
      <div className="py-5">
        <p className="pt-5 fs-large fw-bolder">{title}</p>
      </div>
      <div>
        <p className="fw-bold pb-1">{tags[0]}</p>
        <div className="custom-border-top pt-3">
          <div className="clubs-container">
            {data.map((dataItem, index) => (
              <Club
                key={index}
                clubName={dataItem.name}
                clubDes={dataItem.des}
                clubId={dataItem.id}
                imageurl={dataItem.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const data = [
  {
    name: "Cats only",
    des: "The description of this club appear here.",
    image:
      "https://img.washingtonpost.com/rf/image_1484w/WashingtonPost/Content/Blogs/celebritology/Images/Film_Review_Dark_Knight_Rises-085d2-4549.jpg?uuid=ryK-otD1EeGt8tVushDNzQ",
    id: "cat_army",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "http://sportofboxing.com/wp-content/uploads/2012/06/Challenging-Julius-Ballo-for-the-biggest-fan-club-is-Armando-Guerrero-500x320.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://www.indiewire.com/wp-content/uploads/2017/09/another-earth-2011.jpg?w=674",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-12561-fgl5xk_f4708b43.jpeg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "https://www.marketplace.org/wp-content/uploads/2018/07/GettyImages-81662579.jpg?fit=1800%2C1000",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/earth-day-movie-1522087200.png",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image: "https://i.ytimg.com/vi/Tn7w7gGt_3g/maxresdefault.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "http://sportofboxing.com/wp-content/uploads/2012/06/Challenging-Julius-Ballo-for-the-biggest-fan-club-is-Armando-Guerrero-500x320.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image: "https://i.ytimg.com/vi/Tn7w7gGt_3g/maxresdefault.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "http://sportofboxing.com/wp-content/uploads/2012/06/Challenging-Julius-Ballo-for-the-biggest-fan-club-is-Armando-Guerrero-500x320.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image: "https://i.ytimg.com/vi/Tn7w7gGt_3g/maxresdefault.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "http://sportofboxing.com/wp-content/uploads/2012/06/Challenging-Julius-Ballo-for-the-biggest-fan-club-is-Armando-Guerrero-500x320.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image: "https://i.ytimg.com/vi/Tn7w7gGt_3g/maxresdefault.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "http://sportofboxing.com/wp-content/uploads/2012/06/Challenging-Julius-Ballo-for-the-biggest-fan-club-is-Armando-Guerrero-500x320.jpg",
    id: "the_mib_force",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
  },
];
