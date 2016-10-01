import { StyleSheet } from 'aphrodisiac';
import { COLORS } from './vars';

export default StyleSheet.create({
  page: {
    backgroundColor: COLORS.c5,
    color: COLORS.white,
  },
  init: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '& h2': {
      fontSize: '200%',
      margin: '0.5em',
    },
    '& p': {
      fontStyle: 'italic',
    },
  }
});
