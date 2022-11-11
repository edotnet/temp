import {Avatar, Box, Typography} from "@mui/material";
import InfoProtein from "../../assets/info-protein.png";
import {ThreeDMol} from "../3dmol/ThreeDMol";
import {useDashboardContext} from "./context/useDashboarContext";

export const ThreeDMolFeature = () => {
    const {state} = useDashboardContext();
    return (
        <>
            <Typography variant="subtitle1">Target Interaction, protein:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ border: '1px dashed red', width: 60, height: 60 }}>
                    <img src={InfoProtein} alt="InfoProtein" />
                </Avatar>
                <Box pl={2}>
                    <Typography variant="body1" className='body1-lg-light'>{state.protein.name}</Typography>
                </Box>
            </Box>
            <ThreeDMol />
        </>
    )
}
