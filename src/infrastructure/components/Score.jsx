import {Box} from '@mui/material';

const Circle = ({color}) => (
  <svg width="20" height="20">
    <circle cx="8" cy="12" r="5" stroke={color} strokeWidth="1" fill={color} />
  </svg>
);

const getLevelByScore = (score) => {
  if (score >= 0.1) {
    return "high";
  } else if (score >= 0.01) {
    return "medium";
  }
  return "low";
}
export const Score = ({score}) => {
  const level = getLevelByScore(score);
  let circles = [];
  if (level === "low") {
    circles = [<Circle color="red" />, <Circle color="lightgray" />, <Circle color="lightgray" />];
  } else if (level === "medium") {
    circles = [<Circle color="orange" />, <Circle color="orange" />, <Circle color="lightgray" />];
  } else if (level === "high") {
    circles = [<Circle color="green" />, <Circle color="green" />, <Circle color="green" />];
  }

  return (
    <Box sx={{
      border: '1px solid gray',
      borderRadius: 10,
      pr: 1,
      pl: 1,
    }}>
      {circles}
    </Box>
  );
};
