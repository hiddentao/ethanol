import { StyleSheet } from 'aphrodisiac';
import { COLORS } from '../vars';

export default StyleSheet.create({
  main: {
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
  id: {
    fontSize: '80%',
    display: 'block',
    color: COLORS.light_gray,
  },
  balance: {
    display: 'block',
    fontSize: '70%',
  },
  etherSuffix: {
    fontSize: '80%',        
    color: COLORS.light_gray,
  },  
});
