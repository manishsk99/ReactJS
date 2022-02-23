
function MyProfile() {

    return (
        <div className="card col-lg-6 offset-lg-2 p-4">
            <h1 className="card-title text-center">My Profile</h1>
            <br />
            <h4>{localStorage.getItem("name")}</h4>
            <p className="card-text">
                <strong>Email:</strong> {localStorage.getItem("email")} <br />
                <strong>Phone:</strong> {localStorage.getItem("phone")} <br />
            </p>
        </div>
    );
}

export default MyProfile;