import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image} from 'react-native';
import InputComponent from './components/Inputcomponent';
import DisplayComponent from './components/displaycomponent';


const MainComponent = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (text) => {
    if (text.trim() !== '') {
      const newItem = { id: Date.now().toString(), text, editable: false };
      setItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleToggleEditItem = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, editable: !item.editable } : item
    );
    setItems(updatedItems);
  };

  const handleUpdateItem = (id, newText) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, text: newText, editable: false } : item
    );
    setItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Image
          source={require("./assets/goal.jfif")}
          style={{ width: 400, height: 200 }}
        />
      <InputComponent onAddItem={handleAddItem} />
      <DisplayComponent
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleEditItem={handleToggleEditItem}
        onUpdateItem={handleUpdateItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
  },
});

export default MainComponent;