export const fetchData = (clubId) => {
  let club = null;
  data.map((item) => {
    if (item.id === clubId) club = item;
  });
  return club;
};


export const AddClubData = (club) => {
  data.push(club);
};

const data = [
  {
    name: "Cats only",
    des: "The description of this club appear here.",
    image:
      "https://img.washingtonpost.com/rf/image_1484w/WashingtonPost/Content/Blogs/celebritology/Images/Film_Review_Dark_Knight_Rises-085d2-4549.jpg?uuid=ryK-otD1EeGt8tVushDNzQ",
    id: "cat_army",
    topFans: ["Alan1619", "poby1", "maayami"],
    members: ["maayami", "poby1", "Alan1619"],
    admin: "maayami",
  },
  {
    name: "Andhadhun baatein",
    des: "The description of this club appear here.",
    image:
      "https://static.toiimg.com/thumb/msid-65705780,imgsize-105691,width-800,height-600,resizemode-75/65705780.jpg",
    id: "andhadhun_baatein",
    topFans: ["Alan1619", "poby1", "maayami"],
    admin: "maayami",
    members: ["maayami", "poby1", "Alan1619"],
  },
  {
    name: "The MIB Force",
    des: "The description of this club appear here.",
    image:
      "http://sportofboxing.com/wp-content/uploads/2012/06/Challenging-Julius-Ballo-for-the-biggest-fan-club-is-Armando-Guerrero-500x320.jpg",
    id: "the_mib_force",
    topFans: ["Alan1619", "poby1", "maayami"],
    admin: "maayami",
    members: ["maayami", "poby1", "Alan1619"],
  },
];
