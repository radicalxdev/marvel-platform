
const styles = {
    AlertNotification: {
        severity: "error",
        variant: "filled",
        sx: {
            backgroundColor: '#3D252B',
            color: '#FE6167', // Text color
            padding: '12px, 20px, 12px, 20px',
            borderRadius: '8px',
            // height: '95px',
            fontSize: '16px',
            fontFamily: 'Satoshi, sans-serif', // Using Satoshi for the main message
            border: '1px solid #FE6167', // Border color and width
            backgroundColor: 'rgba(211, 47, 47, 0.3)', // Semi-transparent background color
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.35)', // Adjust blur and transparency here
        }
      },
    ErrorNotification: {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        sx: {
            position: 'absolute',
            top: '7%',
            // height: '200px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%', // Adjust the max-width as needed

            // maxWidth: '50%', // Adjust the max-width as needed
            // minWidth: '100px', // Adjust the min-width as needed
        }
    },
    successNotification: {
        sx: {
            padding: '12px 16px, 12px, 16px',
            borderRadius: '8px',
            border: '1px solid #5614F3',
            background: '#E6DBFF',
            boxShadow: '0px 10px 22.2px 0px #00000021',
            fontSize: '16px',
            fontFamily: 'Satoshi, sans-serif', // Using Satoshi for the main message
        }
    },
    // successNotificationPosition: {
    //     anchorOrigin: { vertical: 'top', horizontal: 'center' },
    //     sx: {
    //         position: 'absolute',
    //         top: '7%',
    //         left: '50%',
    //         height: '24px',
    //         transform: 'translate(-50%, -50%)',
    //         width: '40%', // Adjust the max-width as needed
    //     }
    // }
}
  
export default styles;
  