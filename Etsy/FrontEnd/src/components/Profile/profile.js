import axios from "axios";
import React, { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./profile.css";

export const Profile = () => {
  const [formValue, setformValue] = React.useState({
    ProfileId: "",
    Email: "",
    Name: "",
    DOB: "",
    About: "",
    Country: "",
    City: "",
    Address: "",
    Gender: "",
    ProfileImage: "",
    Phonenumber: "",
    ProfileImagePreview: undefined,
  });

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("user"));
    const token = local.token;
    // const token = local["user"];
    axios
      .get("http://localhost:8080/profile", {
        params: {
          token: token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "Inside useEffect profile" + JSON.stringify(response.data)
          );
          var data = response.data;
          setTimeout(async () => {
            setformValue({
              // ...formValue,
              ProfileId: data.ProfileId,
              Email: data.Email,
              Name: data.Name,
              DOB: data.DOB.split('T')[0],
              About: data.About,
              Country: data.Country,
              City: data.City,
              Address: data.Address,
              Gender: data.Gender,
              ProfileImage: data.ProfileImage,
              Phonenumber: data.Phonenumber,
            });
          });

          console.log("Inside formValue: " + formValue.DOB);
          console.log("Profile Photo Name: ", formValue.ProfileImage);
          axios
            .get("http://localhost:8080/profile/download-photo/", {
              params: {
                file: data.ProfileImage,
              },
            })
            .then((response) => {
              let imagePreview = "data:image/jpg;base64, " + response.data;
              // setTimeout(() => {
              setformValue({
                ProfileId: data.ProfileId,
                Email: data.Email,
                Name: data.Name,
                DOB: data.DOB,
                About: data.About,
                Country: data.Country,
                City: data.City,
                Address: data.Address,
                Gender: data.Gender,
                ProfileImage: data.ProfileImage,
                Phonenumber: data.Phonenumber,
                ProfileImagePreview: imagePreview,
              });
              // });
              // console.log("preview: " + formValue.ProfileImagePreview);
            });
        }
        

        //Download image
      });
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "ProfileImage") {
      var profilePhoto = event.target.files[0];
      var data = new FormData();
      data.append("photos", profilePhoto);
      axios.post("http://localhost:8080/profile/upload-photo", data);
      setformValue({
        ...formValue,
        [event.target.name]: profilePhoto.name,
      });
    } else {
      
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value,
        });
      
        
    }
  };

  const handleSubmit = (event) => {
    var data = {
      ProfileId: formValue.ProfileId,
      Email: formValue.Email,
      Name: formValue.Name,
      DOB: formValue.DOB,
      About: formValue.About,
      Country: formValue.Country,
      City: formValue.City,
      Address: formValue.Address,
      Gender: formValue.Gender,
      ProfileImage: formValue.ProfileImage,
      Phonenumber: formValue.Phonenumber,
    };
    axios.post("http://localhost:8080/profile", data).then((response) => {
      if (response.status === 200) {
        console.log("Axios post from profile submit");
      }
    });
  };

  let profileImageData = (
    <img
      id="avatar_img"
      src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
      // src={formValue.ProfileImagePreview}
      alt=""
      className="img-fluid rounded-circle"
    />
  );
  if (formValue.ProfileImagePreview) {
    profileImageData = (
      <img
        id="avatar_img"
        // src="https://www.etsy.com/images/avatars/default_avatar_400x400.png"
        src={formValue.ProfileImagePreview}
        alt=""
        className="img-fluid rounded-circle"
      />
    );
  }

  return (
    <div>
      <NavBar>New navigation</NavBar>
      {/* <Container fluid> */}
      <div id="content" className="clear " role="main">
        {/* <Row className="justify-content-md-center"> */}
        {/* <Col xs lg="2"> */}
        <div className="grid-child green">
          <div id="content" className="clear " role="main">
            <link
              rel="stylesheet"
              href="https://www.etsy.com/ac/primary/css/base.20220304135846.css"
              type="text/css"
            />
            {/* <link
                rel="stylesheet"
                href="https://www.etsy.com/dac/common/web-toolkit/scoped/scoped_fixed_shared.20220304135846,common/web-toolkit/v1_toolkit_with_v2_footer/fixed-global-nav.20220304135846,common/web-toolkit/a11y_colors/overrides.20220304135846.css"
                type="text/css"
              /> */}
            <link
              rel="stylesheet"
              href="https://www.etsy.com/dac/site-chrome/components/components.20220304135846,site-chrome/header/header.20220304135846,site-chrome/footer/footer.20220304135846,gdpr/settings-overlay.20220304135846.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              href="https://www.etsy.com/dac/your/profile.20210909222603,modules/autosuggest.20210909222603,your-etsy.20220304135846,your/account/settings.20220304135846,modules/forms.20210909222603.css"
              type="text/css"
            />
          </div>
        </div>

        <div className="container">
          <div className="primary profile-edit">
            <div className="your-etsy-header clear">
              <h1>Your Public Profile</h1>
              <p>Everything on this page can be seen by anyone</p>
              <a
                className="view-profile btn-secondary small registration-hidden"
                href="/profile"
              >
                View Profile
              </a>
            </div>
            <form className="section-inner" encType="multipart/form-data">
              <div className="input-group">
                <label className="label" htmlFor="avatar">
                  Profile Picture
                </label>
                <div className="change-avatar-content">
                  <input
                    type="file"
                    className="upload-new-avatar"
                    id="avatar"
                    name="ProfileImage"
                    size="15"
                    aria-describedby="changing-avatar-disabled avatar-technical-hint"
                    onChange={handleChange}
                  />

                  <div className="image-wrapper user-avatar-wrapper">
                    {profileImageData}
                  </div>
                </div>

                <span className="inline-message" id="avatar-technical-hint">
                  Must be a .jpg, .gif or .png file smaller than 10MB and at
                  least 400px by 400px.
                </span>
              </div>
              <hr />
              <div
                className="input-group"
                id="name"
                role="group"
                aria-labelledby="your-name-label"
              >
                <label className="label" id="your-name-label">
                  Your Name
                </label>
                <p className="full-name" id="full-name">
                  {/* <div>
                    {formValue.Name}
                  <ProfileNameButton />
                  </div>
                  <a
                    class="request-name-change overlay-trigger"
                    href="#namechange-overlay"
                    rel="#namechange-overlay"
                    aria-describedby="your-name-label"
                  >
                    Change or remove
                  </a> */}
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="Name"
                    id="Name"
                    value={formValue.Name ?? ""}
                    onChange={handleChange}
                  />
                </p>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Email">
                  Email
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="email"
                    autoComplete="off"
                    name="Email"
                    id="Email"
                    value={formValue.Email ?? ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Phonenumber">
                  Phone Number
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="number"
                    autoComplete="off"
                    name="Phonenumber"
                    id="Phonenumber"
                    value={formValue.Phonenumber ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <hr />
              <fieldset>
                <div
                  className="gender-class"
                  role="group"
                  aria-labelledby="gender-group-label"
                >
                  <label className="label" id="gender-group-label">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Gender
                  </label>
                  {/* <div class="radio-group" id="gender"> */}
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      value="female"
                      name="Gender"
                      id="female"
                      checked={formValue.Gender === "female"}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      value="male"
                      name="Gender"
                      id="male"
                      checked={formValue.Gender === "male"}
                      onChange={handleChange}
                    />
                  </label>

                  <label htmlFor="private">
                    Rather not say
                    <input
                      type="radio"
                      value="private"
                      name="Gender"
                      id="private"
                      checked={formValue.Gender === "Rather not say"}
                      onChange={handleChange}
                    />
                  </label>

                  {/* </div> */}
                </div>
              </fieldset>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="DOB">
                  Date of Birth
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="date"
                    autoComplete="off"
                    name="DOB"
                    id="DOB"
                    value={formValue.DOB ?? ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Country">
                  Address
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="Address"
                    id="Address"
                    value={formValue.Address ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <hr className="registration-hidden" />
              <div className="input-group location-city">
                <label className="label" htmlFor="city3">
                  City
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="City"
                    id="City"
                    value={formValue.City ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <hr />
              <div className="input-group location-city">
                <label className="label" htmlFor="Country">
                  Country
                </label>
                <div className="autosuggest-wrapper">
                  <input
                    aria-describedby="the_reason"
                    type="text"
                    autoComplete="off"
                    name="Country"
                    id="Country"
                    value={formValue.Country ?? ""}
                    onChange={handleChange}
                    className="text"
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  className="btn-primary"
                  type="submit"
                  value="Save Changes"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
        {/* </Col> */}
        {/* </Row> */}
        {/* </Container> */}
      </div>
    </div>
  );
};
export default Profile;
