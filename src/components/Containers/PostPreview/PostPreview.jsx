import './PostPreview.scss';
import { PostPreviewHeader } from './PostPreviewHeader/PostPreviewHeader';
import { useContext, useRef } from 'react';
import { postStoreContext } from '../../../store/PostStoreContext';
import { observer } from 'mobx-react';

export const PostPreview = observer(() => {
  const postStore = useContext(postStoreContext);

  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        postStore.setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelectPopup = () => fileInputRef.current.click();

  return (
    <div className="wrapper">
      <div className="post_preview">
        <PostPreviewHeader />
        <div className="post_preview--content">
          <div
            className="post_preview--content--image"
            onClick={triggerFileSelectPopup}
          >
            <img
              src={postStore.image || 'https://via.placeholder.com/450'}
              alt="Post Image"
              className="post_preview--content--image--img"
            />
            <input
              className="post_preview--content--image--input"
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <p className="post_preview--content--text">
            {postStore.response || 'Your post will appear here'}
          </p>
        </div>
      </div>
      {postStore.imageDescription && (
        <p className="imageRecommendation">
          Recommendation for your image: {postStore.imageDescription}
        </p>
      )}
    </div>
  );
});
