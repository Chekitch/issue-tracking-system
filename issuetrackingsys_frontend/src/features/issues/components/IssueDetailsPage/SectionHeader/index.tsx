import { Box, IconButton, Typography } from "@mui/material";
import { styles } from "../../styles/styles";

interface Props {
  title: string;
  expanded: boolean;
  onClick: () => void;
}

export const SectionHeader = (props: Props) => {
  const { title, expanded, onClick } = props;
  return (
    <Box sx={styles.sectionHeaderStyles.sectionHeader} onClick={onClick}>
      <Typography variant="subtitle1" sx={styles.sectionHeaderStyles.sectionTitle}>{title}</Typography>
      <IconButton size="small" sx={{ color: '#94A3B8' }}>
        {expanded ? '−' : '+'}
      </IconButton>
    </Box>
  );
};

interface SectionBoxProps {
  children: React.ReactNode;
}

export const SectionBox = (props: SectionBoxProps) => {
  const { children } = props;
  return <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 1, p: 2 }}>{children}</Box>;
};