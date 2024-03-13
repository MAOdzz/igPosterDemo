import './App.scss';
import { PostPreview } from './components/Containers/PostPreview/PostPreview';
import { ControlPanel } from './components/Containers/ControlPanel/ControlPanel';
import { postStoreContext } from './store/PostStoreContext';
import { postStore } from './store/PostStore';

function App() {
  return (
    <postStoreContext.Provider value={postStore}>
      <div className="main_wrapper">
        <ControlPanel />
        <PostPreview />
      </div>
    </postStoreContext.Provider>
  );
}

export default App;
