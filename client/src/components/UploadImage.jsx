import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);

    try {
      setUploading(true); // Set uploading state to true
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      console.log(url);
      setUploading(false); // Set uploading state back to false after upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false); // Set uploading state back to false if there's an error
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div class="col-span-3 ">
        {" "}
        <input
          type="file"
          onChange={handleImageChange}
          className="mt-4 bg-white border border-gray-300 rounded-md py-2 px-4 w-full inline-block focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="flex justify-center">
        {" "}
        <button
          onClick={handleUpload}
          className={`bg-${uploading ? 'orange-900' : 'orange-500'} text-white py-2 px-4 font-medium rounded-md hover:bg-${uploading ? 'orange-900' : 'orange-600'}	focus:outline-none focus:bg-${uploading ? 'orange-900' : 'orange-600'} mt-4`}
          disabled={uploading} 
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <div>
        {" "}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "50px", height: "50px" }}
          />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
