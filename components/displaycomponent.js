import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';

const DisplayComponent = ({ items, onDeleteItem, onToggleEditItem, onUpdateItem }) => {
  const [editedText, setEditedText] = useState({});

  const handleDelete = (id) => {
    onDeleteItem(id);
  };

  const handleToggleEdit = (id) => {
    onToggleEditItem(id);
    setEditedText((prevText) => ({
      ...prevText,
      [id]: items.find((item) => item.id === id)?.text || '',
    }));
  };

  const handleUpdate = (id) => {
    onUpdateItem(id, editedText[id]);
    setEditedText((prevText) => ({
      ...prevText,
      [id]: '',
    }));
  };

  const handleTextChange = (text, id) => {
    setEditedText((prevText) => ({
      ...prevText,
      [id]: text,
    }));
  };

  const renderItem = ({ item }) => {
    const handleEdit = () => {
      handleToggleEdit(item.id);
    };

    return (
      <View style={styles.itemContainer}>
        {item.editable ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={editedText[item.id]}
              onChangeText={(text) => handleTextChange(text, item.id)}
              autoFocus
            />
            <Pressable onPress={() => handleUpdate(item.id)}>
              <Text style={styles.editSymbol}>✅</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.textContainer}>
            <Pressable onPress={() => handleEdit(item.id)}>
              <Text style={styles.itemText}>{item.text}</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteSymbol}>❌</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'grey',
    justifyContent:'flex-end'
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    borderColor:'grey',
   
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  deleteSymbol: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
  editSymbol: {
    fontSize: 16,
    color: 'blue',
  },
});

export default DisplayComponent;
