import React, { useState, useEffect } from "react";
import AuthenticatedNavbar from "../components/navbar/AuthenticatedNavbar";
import { Box, Card, CardContent, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ProfileEdit } from "../components/Profile";
import { ProfileView } from "../components/Profile";
import { GreyBackgroundButton } from "../components/generic/GenericButton";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { UserHooks } from "../hooks/userHooks/UserHooks";

const ProfilePage = () => {
  const { state } = useUser();
  const { user } = state;
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const { updateUser } = UserHooks();

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditMode(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const userId = editedUser.id;
    updateUser(userId, editedUser);
    toast.success("Update successfully!");
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
                    buttonText="Cancel"
                    onClick={handleCancel}
                  />

                  <GreyBackgroundButton
                    onClick={handleSave}
                    buttonText="Save"
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
