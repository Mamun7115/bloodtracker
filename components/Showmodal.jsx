import React, {useState} from 'react'
import { Modal, TextInput, View, StyleSheet, Button, Image } from 'react-native'

const Showmodal = (props) => {
    const [enteredMonth, setEnteredMonth] = useState('')
    console.log('entered Month', enteredMonth)

    function registerEnteredMonth(enteredText){
        setEnteredMonth(enteredText)
    }

    function searchData(){
        props.searchData(enteredMonth)
        setEnteredMonth('');
    }

    return (
        <Modal visible={props.showModal2} animationType='slide'>
            <View style={styles.mainContainer}>
            <Image source={require('../assets/image/search.png')} style={styles.image}></Image>
                <View style={styles.containerTextInput}>
                    <TextInput placeholder='Enter Month in Number' style={styles.textInput} value={enteredMonth}
                    onChangeText={registerEnteredMonth}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonCancel}>
                        <Button title='cancel' onPress={props.offModel2}></Button>
                    </View>
                    <View style={styles.buttonCancel}>
                        <Button title='Search' onPress={searchData} color='#393A10'></Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#344966',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'white',
        borderRadius:10
    }, 
    containerTextInput:{
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:{
        borderWidth:1,
        width:250,
        paddingLeft:12,
        paddingRight:12,
        backgroundColor:'white'
    },
    buttonContainer:{
        marginTop:1,
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
    
      image:{
        alignSelf:'center',
        width:100,
        height:100,
        marginBottom:20,
      }
})

export default Showmodal