import { StyleSheet } from 'react-native';

const itemListStyles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialIcon: {
    fontSize: 18,
    color: 'red',
  },
  detailsText: {
    fontSize: 16,
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    marginTop: 5,
    color: '#888',
  },
});

export default itemListStyles;
