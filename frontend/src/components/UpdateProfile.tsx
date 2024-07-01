import axios from "axios";
import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";

const UpdateProfile = ({ userId }: { userId: string }) => {
  const [pic, setPic] = useState<string>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      console.log(formData);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/upload/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setPic(response.data.user.profilePic);
        console.log(response.data.user.profilePic);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setPic(undefined);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <input type="file" className="" onChange={handleFileChange} />
        {pic && <img src={pic} alt="Selected file" />}
      </div>
      <button className="">
        <MdOutlineMyLocation className="" />
      </button>
    </div>
  );
};

export default UpdateProfile;
