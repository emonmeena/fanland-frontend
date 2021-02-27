export const fetchUser = (userName) => {
  let user = null;
  users.map((item) => {
    if (item.userName === userName) {
      user = item;
    }
  });
  return user;
};

export const fetchUserClubs = (userName, endpoint) => {
  let user = null;
  users.map((item) => {
    if (item.userName == userName) user = item;
  });
  switch (endpoint) {
    case "followingClubs":
      return user.followingClubs;
    case "adminClubs":
      return user.adminClubs;
    case "likedClubs":
      return user.likedClubs;

    default:
      return user.interest;
  }
};

const users = [
  {
    userName: "maayami",
    email: "mayank_m@cs.iitr.ac.in",
    interest: ["the_mib_force", "cat_army", "andhadhun_baatein"],
    followingClubs: ["andhadhun_baatein", "the_mib_force"],
    adminClubs: ["andhadhun_baatein", "the_mib_force", "the_mib_force"],
    likedClubs: ["cat_army"],
  },
];
