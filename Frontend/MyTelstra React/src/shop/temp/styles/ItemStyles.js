export const styles = {
    root: {
        width: "500px",
    },
    CardImg : {
        height: "130px",
        backgroundSize: 'contain'
    },
    CardContent : {
        padding: "10px",
        "& h2" : {
            textAlign: "center",
            color: "#006699",
            height: "60px"
        },
        "& p" : {
            margin: "5px"
        },
        "& span" : {
            fontWeight: "bold",
            padding: "5px"
        }
    },
    CardButtons : {
        paddingBottom: "20px",
        justifyContent: "center",
        "& #addToCart" : {
            backgroundColor: "info"
        }
    }
}

export default styles;