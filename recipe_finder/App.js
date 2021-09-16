import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';



export default function App() {
  const [ ingredient, setIngredient ] = useState('')
  const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
  const [ recipeList, setRecipeList ] = useState([])

  const searchRecipes = () => {
    console.log(ingredient)
    const url = baseUrl + ingredient.split(' ').join('_')
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setRecipeList(data)
    })
    .catch((e) => console.log('error', e))
  }

  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        <Text>"Dees"</Text>
        <FlatList 
          style={{marginLeft: "5%"}} 
          keyExtractor = {item => item.id}
          renderItem={({ item })  =>  
            <View style={styles.recipeStyle} >
              <Text>{item.strMeal}</Text>
              <Image style={styles.tinyLogo} source={item.strMealThumb} />
            </View>}
          data={recipeList.meals}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
              keyboardAppearance='default'
              style={styles.inputStyle} 
              onChangeText={ingredient => setIngredient(ingredient)}
              value={ingredient} />
        <Button onPress={searchRecipes} title='FIND'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: 200,
    borderColor: 'green',
    borderWidth: 1
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  recipeStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'solid',
  },
  redtext: {fontSize:18, color: 'red'},
});
