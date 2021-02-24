export const fetchUser = (userName) => {
  let user = null;
  users.map((item) => {
    if (item.userName === userName) {
      user = item;
    }
  });
  return user;
};

const users = [
  {
    userName: "maayami",
    email: "mayank_m@cs.iitr.ac.in",
    interest: ["science", "fiction", "romance", "action"],
    followingClubs: ["dark_knights", "bollywood_2021"],
    adminClubs: ["andhadhun_baatein", "the_mib_force", "cats_only"],
    likedClubs: ["new_club_erena"],
  },
];
