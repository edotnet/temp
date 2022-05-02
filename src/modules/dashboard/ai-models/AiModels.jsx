import {Box, Grid, Typography} from "@mui/material";
import {GraphBackground} from "../../../infrastructure/components/GraphBackground";
import {Graph} from "../../../infrastructure/components/graph/Graph";
import {ModalPaper} from "../../../infrastructure/components/ModalPaper";
import {useDashboardContext} from "../context/useDashboarContext";

export const AiModels = () => {
    const {state} = useDashboardContext();
    console.log(state.selectedMolecule)
    const solubility = 67;
    const toxicity =
        {
            "NR-AR": [0.7405228614807129],
            "NR-AR-LBD": [0.06002530828118324],
            "NR-AhR": [0.98823082447052],
            "NR-Aromatase": [0.8246786594390869],
            "NR-ER": [0.5259780287742615],
            "NR-ER-LBD":
                [0.7567827701568604
                ],
            "NR-PPAR-gamma":
                [
                    0.09470955282449722
                ],
            "SR-ARE":
                [
                    0.8919845223426819
                ],
            "SR-ATAD5":
                [
                    0.9808481931686401
                ],
            "SR-HSE":
                [
                    0.10547656565904617
                ],
            "SR-MMP":
                [
                    0.738190233707428
                ],
            "SR-p53":
                [
                    0.7983474135398865
                ]
        }
    return (
        <ModalPaper>
            <Box bgcolor="transparent" p={2}>
                <Typography sx={{color: '#1d1d1d', fontSize: 18, fontWeight: 500}} gutterBottom>Other
                    information</Typography>
                <Grid container>
                    <Grid item xs={3}>
                        <Box key="solubility">
                            <Typography sx={{fontSize: 14, fontWeight: 'bold', mb: -1}}>Solubility</Typography>
                            <Typography sx={{
                                fontSize: 20,
                                fontWeight: 300,
                                color: '#141414'
                            }}>{solubility.toFixed(4)}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={8}>
                        <GraphBackground>
                            <Box pt={3.3}>
                                <Graph width={Math.abs(solubility) / 10}/>
                            </Box>
                        </GraphBackground>
                    </Grid>
                </Grid>
                <Typography sx={{color: '#1d1d1d', fontSize: 18, fontWeight: 500}} gutterBottom>Toxicity</Typography>
                <Grid container>
                    <Grid item xs={3}>
                        {toxicity && Object.keys(toxicity).map(el => (
                            <Box key={el}>
                                <Typography sx={{fontSize: 14, fontWeight: 'bold', mb: -1}}>{el}</Typography>
                                <Typography sx={{
                                    fontSize: 20,
                                    fontWeight: 300,
                                    color: '#141414'
                                }}>{toxicity[el][0].toFixed(4)}</Typography>
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={8}>
                        <GraphBackground>
                            {toxicity && Object.keys(toxicity).map(el => (
                                <Box pt={3.3}>
                                    <Graph width={toxicity[el][0] * 10}/>
                                </Box>
                            ))}
                        </GraphBackground>
                    </Grid>
                </Grid>
            </Box>
        </ModalPaper>
    );
}