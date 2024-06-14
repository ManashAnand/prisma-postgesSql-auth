const uploadImageViaCloudinary = async (image: File) => {
    try {
      const formData = new FormData();
      console.log(image)
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME ?? ""
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME ?? ""
      );
      // console.log(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        {
          method: "POST",
          body: formData,
          //   headers: {
          //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`,
          //     'Content-Type': 'multipart/form-data'
          //   },
        }
      );
      const uploadedImageData = await uploadResponse.json();
      const imageUrl = uploadedImageData.secure_url;
      console.log(imageUrl);
      return imageUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  
  export { uploadImageViaCloudinary };