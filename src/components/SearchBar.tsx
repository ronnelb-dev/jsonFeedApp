import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText }) => (
  <TextInput
    style={styles.searchBox}
    placeholder="Search by title"
    placeholderTextColor="#999"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  searchBox: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;