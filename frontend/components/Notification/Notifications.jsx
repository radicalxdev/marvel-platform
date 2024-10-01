import React from 'react';
import { Snackbar, Button, SnackbarContent, Typography } from '@mui/material';
import {
  Height,
  Error,
  ErrorOutline,
  ErrorOutlineOutlined,
  ErrorOutlineRounded,
  ErrorOutlineSharp,
  ErrorOutlineTwoTone,
} from '@mui/icons-material';
import { Close as CloseIcon } from '@mui/icons-material';
// import ErrorOutline from "@/assets/svg/_ErrorOutline.svg";

const errorStyle = {
  backgroundColor: '#3D252B',
  color: 'white',
  borderRadius: '8px',
  padding: '12px 20px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid #FE6167',
  textAlign: 'center',
  maxWidth: '419px',
  margin: '20px auto 0',
  fontFamily: 'Satoshi, sans-serif',
  fontWeight: 700,
  fontSize: '18px',
};

const successStyle = {
  backgroundColor: '#E6DBFF', // 浅紫色背景
  borderRadius: '6px',
  padding: '6px 6px 6px 12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: '2px solid #5614F3',
  height: '84px',
  maxWidth: '324px',
  marginRight: '40px',
  marginTop: '40px',
};

const iconStyle = {
  marginRight: '8px',
  fill: '#FE6167',
  Height: '18px',
  Width: '18px',
};

const SuccessNotification = ({ message, open, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <SnackbarContent
      style={successStyle}
      message={
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{ color: '#5614F3', fontWeight: '700', fontSize: '18px' }}
            >
              Sign Up Successful!
            </Typography>
            <Button
              style={{ color: '#000000', padding: 10, textAlign: 'right' }}
              size="small"
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
          </div>
          <Typography
            style={{
              color: '#000',
              fontWeight: '500',
              fontSize: '16px',
              marginTop: '6px',
            }}
          >
            {message}
          </Typography>
        </div>
      }
    />
  </Snackbar>
);

const ErrorNotification = ({ message, open, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <SnackbarContent
      style={errorStyle}
      message={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <ErrorOutline style={iconStyle} />
          {message}
        </span>
      }
      action={
        <Button color="secondary" size="small" onClick={onClose}>
          DISMISS
        </Button>
      }
    />
  </Snackbar>
);

export { SuccessNotification, ErrorNotification };
