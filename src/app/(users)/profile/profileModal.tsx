import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaCircle } from "react-icons/fa";
import "./profile.css";



export default function BasicModal({savedID}: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState<number | null>(null);
  const [defaultID, setDefaultID] = React.useState<number | null>(
    savedID[0] || null
  );

  const handleOpen = (id: number) => {
    setOpen(true);
    setSelectedID(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedID(null);
  };

  const handleClose2 = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
    setSelectedID(null);
  };

  const makeDefault = () => {
    if (selectedID !== null) {
      // Update the main data's savedID array
      savedID = [selectedID, ...savedID.filter((id: any) => id !== selectedID)];
      setDefaultID(selectedID);
      handleClose();
    }
  };

  const deleteID = () => {
    if (selectedID !== null) {
      // If the deleted ID was the default, update the default ID
      if (selectedID === defaultID) {
        setDefaultID(savedID[0] || null);
      }

      // Update the main data's savedID array
      savedID = savedID.filter((id: any) => id !== selectedID);

      handleClose();
    }
  };

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent the click event from propagating to the outer div
    e.stopPropagation();
  };

  return savedID.map((id: any, index: any) => (
    <div
      className='saved_id_container-inner '
      key={index}
      onClick={() => handleOpen(id)}
      style={{
        cursor: "pointer",
        borderColor:
          id === defaultID
            ? "rgba(256, 256, 256, 1)"
            : "rgba(256, 256, 256, 0.4)",
        color:
          id === defaultID
            ? "rgba(256, 256, 256, 1)"
            : "rgba(256, 256, 256, 0.4)",
      }}
    >
      {id}
      <FaCircle
        color={
          id === defaultID
            ? "rgba(256, 256, 256, 1)"
            : "rgba(256, 256, 256, 0.4)"
        }
      />
      <div
        style={{
          cursor: "pointer",
          color:
            id === defaultID
              ? "rgba(256, 256, 256, 1)"
              : "rgba(256, 256, 256, 0.4)",
        }}
      >
        X
      </div>
      <span
        style={{
          fontSize: "8px",
          fontWeight: "light",
          color: "rgba(256, 256, 256, 0.5)",
        }}
      ></span>
      {open && selectedID === id && (
        <>
          <div
            onClick={(e) => handleClose2(e)}
            style={{
              position: "fixed",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              background: "rgba(0, 0, 0, 0.7)",
              zIndex: 1000,
            }}
          ></div>
          <div
            onClick={handleModalClick}
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              backgroundColor: "rgba(0, 0, 0, 1)",
              border: "2px solid #000",
              padding: "60px",
              zIndex: 1100,
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50px",
                display: "flex",
                justifyContent: "end",
                fontSize: "22px",
                color: "white",
              }}
              onClick={handleClose}
            >
              {" "}
              X{" "}
            </div>
            <h2 style={{ fontWeight: "bold", color: "white" }}>
              ID: &nbsp;{id}
            </h2>
            <div
              style={{
                display: "flex",
                gap: "50px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant='contained'
                color='primary'
                onClick={makeDefault}
                disabled={id === defaultID}
                style={{
                  width: "140px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                Make Default
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={deleteID}
                disabled={id === defaultID}
                style={{
                  width: "140px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  ));
}
