import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";

const styles = {
  dialogPaper: {
    height: 550,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
    maxWidth: 420,
  },
  actions: {
    marginTop: "16px",
  },
  dialogPaperScrollPaper: {
    maxHeight: "none",
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
};

/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register, or other Dialogs.
 */
function FormDialog(props) {
  const {
    open,
    onClose,
    loading,
    headline,
    onFormSubmit,
    content,
    actions,
    hideBackdrop,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      classes={{
        paper: styles.dialogPaper,
        paperScrollPaper: styles.dialogPaperScrollPaper,
      }}
      hideBackdrop={hideBackdrop ? hideBackdrop : false}
    >
      <DialogTitle title={headline} onClose={onClose} disabled={loading} />
      <DialogContent style={styles.dialogContent}>
        <form onSubmit={onFormSubmit}>
          <div>{content}</div>
          <Box width="100%" style={styles.actions}>
            {actions}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  headline: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  content: PropTypes.element.isRequired,
  actions: PropTypes.element.isRequired,
  hideBackdrop: PropTypes.bool.isRequired,
};

export default FormDialog;
