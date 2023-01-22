import NavBar from "./navbar";
import '../css/EditPostPage.css'
import PostEditData from "./PostEditData";
function EditPostPage(){

    return (
        <div className="edit-post-page-container">
            <NavBar />
            <PostEditData postTopics={[]}/>
        </div>
    )
}
export default EditPostPage;