import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
  highlight: string;
}

const HighlightedText: React.FC<Props> = ({ text, highlight }) => {
  if (!highlight) return <Text style={styles.title}>{text}</Text>;
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <Text style={styles.title}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={index} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  highlight: {
    backgroundColor: '#FFFB91',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default React.memo(HighlightedText);