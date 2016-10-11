import { StyleSheet } from 'aphrodisiac';
import { COLORS } from './vars';

export default StyleSheet.create({
  accountList: {
    borderColor: COLORS.black,
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  account: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '& > h2': {
      fontSize: '80%',
      display: 'block',
      color: COLORS.light_gray,
    },
    '& > span': {
      display: 'block',
      fontSize: '70%',
    }
  },
});
