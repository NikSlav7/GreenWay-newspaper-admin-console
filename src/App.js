import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PostPage from './components/PostPage';
import AllEmailsPage from './components/AllEmailsPage';
import HomePage from './components/HomePage';
import EditPostPage from './components/EditPostPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/post' element={<PostPage />}></Route>
        <Route path='/edit/:time/:status' element={<EditPostPage />}></Route>
        <Route path='/emails' element={<AllEmailsPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
