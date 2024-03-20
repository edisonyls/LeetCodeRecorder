import React, { useEffect, useState } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { Box, Card, CardContent, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import axiosInstance from "../config/axiosConfig";
import { ProfileEdit } from "../components/Profile";
import { ProfileView } from "../components/Profile";
import { GreyBackgroundButton } from "../components/generic/GenericButton";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axiosInstance.get("user");
      const data = await response.data;

      if (data.serverMessage === "SUCCESS") {
        setUser(data.data);
        setEditedUser(data.data);
      }
    };
    fetchUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const userId = editedUser.id;
    try {
      const res = await axiosInstance.put(`user/${userId}`, editedUser);
      if (res.data.serverMessage === "SUCCESS") {
        setUser(editedUser);
        toast("Update successfully!");
      } else {
        console.log("Failed to update!");
      }
    } catch (err) {
      console.log(err);
    }
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        backgroundColor: grey[900],
        color: grey[50],
        minHeight: "100vh",
      }}
    >
      <AuthenticatedNavbar />
      <Container component="main" maxWidth="md" sx={{ pt: 8, pb: 6 }}>
        <Card raised sx={{ backgroundColor: grey[800], color: grey[50] }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {!editMode ? (
                <GreyBackgroundButton buttonText="Edit" onClick={handleEdit} />
              ) : (
                <>
                  <GreyBackgroundButton
                    onClick={handleSave}
                    buttonText="Save"
                  />

                  <GreyBackgroundButton
                    buttonText="Cancel"
                    onClick={() => setEditMode(false)}
                  />
                </>
              )}
            </Box>
            {!editMode ? (
              <ProfileView user={user} onEdit={handleEdit} />
            ) : (
              <ProfileEdit
                editedUser={editedUser}
                handleChange={handleChange}
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;
