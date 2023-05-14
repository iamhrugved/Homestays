import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import Chatbox from "./ChatBox";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    position: "fixed",
    bottom: theme.spacing(9),
    right: theme.spacing(2),
    zIndex: 9999,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

function FloatingWidget() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Fab className={classes.fab} onClick={handleOpen}>
        <QuestionAnswerIcon />
      </Fab>
      {isOpen && (
        <Paper className={classes.paper}>
          <Chatbox />
          <Fab className={classes.fab} onClick={handleClose}>
            <QuestionAnswerIcon />
          </Fab>
        </Paper>
      )}
    </>
  );
}

export default FloatingWidget;
