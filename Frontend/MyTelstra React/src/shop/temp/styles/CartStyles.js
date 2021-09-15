const drawerWidth = 500
export default {
    Drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    DrawerPaper: {
        width: drawerWidth,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#DCEFFA"
    },
    List: {
        padding: "5px",
        width: "90%",
        marginTop: "10px",
        marginBottom: "230px",
        overflowY: "auto",
        scrollbarColor: "red yellow",
        "&::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "10px"
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: "#003366"
        }},
        ListItem: {
            "& .MuiTypography-body1" : {
                fontSize: "1.3rem"
            },
            "& .MuiTypography-body2" : {
                fontSize: "1rem"
            }
        },
        Bottom: {
            position: "absolute",
            bottom: 0,
            zIndex: "12",
            width: "100%",
            height: "200px",
            backgroundColor: "#003366",
            boxShadow: "0px 7px 22px 1px #006699",
            textAlign: "center",
            color: "#ffffff",
            "& p": {
                margin: "20px",
            },
            "& button": {
                width: "90%",
                height: "60px",
                margin: "auto",
                color: "#ffffff",
                fontSize: "1.1em"
            },
            "& button:hover": {
                backgroundColor: "#ccccff",
                color: "#003366"
            }
        }
    }