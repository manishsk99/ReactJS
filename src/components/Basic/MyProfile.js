
function MyProfile() {

    return (
        <div className="card col-lg-6 offset-lg-2 p-4">
            <h1 className="card-title text-center">My Profile</h1>
            <strong>{localStorage.getItem("name")}</strong>
            <p className="card-text">
                <strong>Email:</strong> {localStorage.getItem("email")} <br />
                <strong>Phone:</strong>
            </p>
        </div>
    );
}

export default MyProfile;