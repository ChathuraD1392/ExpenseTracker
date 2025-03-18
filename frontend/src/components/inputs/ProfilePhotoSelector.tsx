import { ChangeEvent, useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

interface Props {
  image: File | null;
  setImage: (file: File | null) => void;
}
const ProfilePhotoSelector = ({ image, setImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewURL(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(undefined);
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {!image ? (
          <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative">
            <LuUser className="text-4xl text-primary" />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full absolute -bottom-1 -right-1"
              onClick={onChooseFile}
            >
              <LuUpload />
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewURL}
              alt="#"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button
              className="w-8 h-8 flex items-center justify-center bg-red-400 text-white rounded-full absolute -bottom-1 -right-1"
              onClick={handleRemoveImage}
              type="button"
            >
              <LuTrash />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePhotoSelector;
