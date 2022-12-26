import React, { useState } from 'react'
import { View, Modal, Text, TextInput, StyleSheet, Button, Image } from 'react-native'
import LOGOSVG from "../assets/image/blood.svg"

const InputModal = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  
  function registerEnteredValue(enteredText){
    setEnteredValue(enteredText)
  }

  function testFunc(){
    props.testFunc(enteredValue);
    setEnteredValue('');
  }

  

  return (
    <Modal visible={props.switchModel} animationType="slide">
      <View style={styles.InputModalContainer}>
        <Image source={require('../assets/image/blood.png')} style={styles.image}></Image>
        <View style={styles.textInputContainer}>
          <TextInput placeholder='Enter Your Reading' style={styles.textInput} value={enteredValue}
          onChangeText={registerEnteredValue}></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonCancel}>
            <Button title='Cancel' onPress={props.offModel}></Button>
          </View>
          <View style={styles.buttonCancel}>
            <Button title='Add' onPress={testFunc} color='#393A10'></Button>
          </View>
        </View>  
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({

  InputModalContainer:{
    flex:1,
    justifyContent:'center',
    padding:20,
    backgroundColor:'#344966',
    borderWidth:2,
    borderColor:'white',
    borderRadius:40
  },

  textInputContainer:{
    justifyContent:'center',
    alignItems:'center',
    
  },

  buttonContainer:{
    marginTop:15,
    justifyContent:'space-evenly',
    flexDirection:'row'
  },

  buttonCancel:{
      width:130,
      margin:4,
      borderWidth:2,
      borderRadius:10,
      borderColor:'#B4CDED'

  },

  textInput:{
    borderWidth:1,
    width:250,
    paddingLeft:12,
    paddingRight:12,
    backgroundColor:'white'
  },
  image:{
    alignSelf:'center',
    width:100,
    height:100,
    marginBottom:20,
  }

})



export default InputModal