import React from 'react'
import { View , Button, StyleSheet} from 'react-native'

const AddButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonAdd}>
        <Button title='Add' onPress={props.onModel} color='#698996'/>
      </View>
      <View style={styles.buttonAdd}>
        <Button title='Search' onPress={props.onModel2} color='#393A10'/>
      </View>
      <View style={styles.buttonAdd}>
        <Button title='Show All' onPress={props.selectData} color='#344966'/>
      </View>
    </View>    
  )
}

const styles = StyleSheet.create({


  buttonContainer:{
    backgroundColor:'#87A0B2',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10,
    borderWidth:1,
    borderColor:'white',
    borderBottomLeftRadius:15,
  },

  buttonAdd:{
   width:100,
   margin:4,
   borderWidth:2,
   borderRadius:10,
   borderColor:'#B4CDED'
  },

})

export default AddButton