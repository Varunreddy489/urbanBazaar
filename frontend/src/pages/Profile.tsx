import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";

const Profile = () => {
  const [pic, setPic] = useState<string>();

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <input
          type="file"
          className=""
          onChange={(e) => {
            const file = e.target.files?.[0];

            setPic(file ? URL.createObjectURL(file) : undefined);
          }}
        />
        {pic && <img src={pic} alt="Selected file" />}
      </div>
      <button className="">
        <MdOutlineMyLocation className="" />
      </button>
    </div>
  );
};

export default Profile;
