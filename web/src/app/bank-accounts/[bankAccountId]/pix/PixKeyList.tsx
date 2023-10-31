import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { PixKey } from '../../../../models';
import StarBorder from '@mui/icons-material/StarBorder';
import { getPixKeys } from '@/queries/get-pix-keys.query';

export type PixKeyListProps = {
  bankAccountId: string;
};

export async function PixKeyList(props: PixKeyListProps) {
  const pixKeys = await getPixKeys(props.bankAccountId);

  return (
    <div>
      <Typography variant="h5">Minhas chaves pix</Typography>
      <List>
        {pixKeys.map((pixKey) => (
          <ListItem disablePadding key={pixKey.id}>
            <ListItemButton>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={pixKey.key} secondary={pixKey.kind} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
