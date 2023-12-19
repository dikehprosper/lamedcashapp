import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaCircle } from "react-icons/fa";
import "./profile.css";
import { FaLongArrowAltLeft } from "react-icons/fa";



export default function BasicModal({savedID, betId, makeDefaultId, deleteId }: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedID, setSelectedID] = React.useState<number | null>(null);
  const [defaultID, setDefaultID] = React.useState<number | null>(
    savedID[0]
  );
  console.log(savedID[0], betId)

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


   
  const makeDefault = (id: any) => {
    makeDefaultId(id)
     handleClose();
   }
 

  const deleteSpecificId = (id: any) => {
    deleteId(id)
    handleClose();

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
        id === savedID[0]
            ? "rgba(256, 256, 256, 1)"
            : "rgba(256, 256, 256, 0.4)",
        color:
        id === savedID[0]
            ? "rgba(256, 256, 256, 1)"
            : "rgba(256, 256, 256, 0.4)",
      }}
    >
      {id}
      <FaCircle
        color={
          id  === savedID[0]
            ? "rgba(256, 256, 256, 1)"
            : "rgba(256, 256, 256, 0.4)"
        }
      />
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
              padding: "20px 60px",
              zIndex: 1100,
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9px",
              border: ".5px solid grey"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "35px",
                display: "flex",
                justifyContent: "end",
                fontSize: "22px",
                color: "white",
              }}
             
            >
              {" "}
              <span   onClick={(e) => handleClose2(e)} style={{padding: '5px 10px', background:"rgba(128, 128, 128)", borderRadius:"5pX",  display: "flex",
                justifyContent: "center", alignItems: 'center'}}><FaLongArrowAltLeft fontSize="30px" color='black' /></span>
            </div>
            <h2 style={{ fontWeight: "bold", color: "white", fontSize:"24px" }}>
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
                onClick={() => makeDefault(id)}
                disabled={ selectedID === savedID[0]}
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
                onClick={() => deleteSpecificId(id)}
                disabled={selectedID === savedID[0]}
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
