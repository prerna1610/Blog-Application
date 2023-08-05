// import React, { useRef } from 'react';

// function ImageUpload({ currentUser, uploadFile }) {
//   const imageInputRef = useRef(null);

//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     uploadFile(file);
//   };

//   return (
//     <div className="img-wrapper">
//       <UserAvatar
//         userId={currentUser._id}
//         imageId={currentUser.profile.picture}
//         size="small"
//         fSize="small"
//         shape="circle"
//       />
//       <input
//         type="file"
//         name="avatar"
//         onChange={handleUpload}
//         ref={imageInputRef}
//         accept="image/png, image/jpeg"
//         multiple={false}
//       />
//     </div>
//   );
// }

// export default ImageUpload;
