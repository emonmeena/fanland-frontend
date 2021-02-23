import React from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  let { userName } = useParams();
  return <div>profile of the user {userName}</div>;
}
