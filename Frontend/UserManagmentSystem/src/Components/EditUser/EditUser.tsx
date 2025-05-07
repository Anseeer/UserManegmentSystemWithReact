import "./EditUser.css"
const EditUser = ()=>{
    return(
        <div className="editContainer">
    <div className="editCard">
      <h3>Edit User</h3>
      <label>Username:</label>
      <input
        type="text"
      />
      <div className="editActions">
        <button
          className="saveBtn"
        >
          Save
        </button>
        <button className="cancelBtn"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
    )
}

export default EditUser;