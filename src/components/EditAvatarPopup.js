import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // const currentUser = useContext(CurrentUserContext);

  // const [avatar, setAvatar] = useState("");

  const avatarRef = useRef();

  // useEffect(() => {
  //   setAvatar(currentUser.avatar);
  // }, [currentUser]);

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    // setAvatar("");
   
  }

  // function handleChangeAvatar(e) {
  //   setAvatar(e.target.value);
  // }

  return (
    <>
      <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        formName="avatarpopup"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_content_image"
            type="url"
            id="avatar-input"
            name="avatarlink"
            ref={avatarRef}
            placeholder="Ссылка на изображение"
            required=""
            // onChange={handleChangeAvatar}
          />
          <span className="popup__error avatar-input-error" />
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
