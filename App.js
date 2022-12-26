import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import AddButton from './components/AddButton';
import InputModal from './components/InputModal';
import List from './components/List';
import * as SQLite from 'expo-sqlite';
import Showmodal from './components/Showmodal';


export default function App() {
  const [storeData, setStoreData] = useState([]);


  const [data, setData] = useState([])

  const db  = SQLite.openDatabase('complete.db')
  useEffect(()=>{
    createTable();
  },[])

  function createTable(){
    db.transaction(tx=>{
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS reading (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, month TEXT)'
      )
    })
  }

  function selectData(){
    db.transaction(tx=>{
      tx.executeSql(
        'SELECT * FROM reading',
        null,
        (tx,result)=> {
          // setData(result.rows._array)
          setStoreData(result.rows._array)
          console.log('selectData//',result.rows._array)
        },
        (tx,error)=> console.log('Error on Select Data',error)
      )
    })

  }


  function searchData(enteredMonth){
    console.log('fromSEARCHDATA FILTERED',enteredMonth)
    db.transaction(tx=>{
      tx.executeSql(
        `SELECT * FROM reading WHERE month = '${enteredMonth}'`,
        null,
        (tx,result) =>{
          setStoreData(result.rows._array)
          console.log('FILTEREDDATA', result.rows._array)
        },
        (tx,error)=> console.log('errorfiltereddata' ,error)
      )
      setModel2(false)
    })
  }


console.log('fromTHESTATE//',storeData)


  function combineData(enteredValue){
    // create date
    const date = new Date()
    // get hour
    const hour = date.getHours();
    const day = date.getUTCDate()
    // get minute
    const minute = date.getMinutes()
    const year = date.getFullYear()
    const outdateMonth = date.getMonth()
    const month = Math.floor(outdateMonth + 1);
    // create array that holds breakfast,brunch,lunch,dinner
    const names = ['BREAKFAST', 'BRUNCH', 'LUNCH','DINNER']
    var combined= 1;
    var valued = 'holding';

    function returnWord(){
      if(hour >= 6 && hour <=9){
        valued = names[0]
        return valued;
    }else if(hour >= 9 && hour <=12){
        valued = names[1]
        return valued;
    }else if(hour >= 12 && hour <=16){
        valued = names[2]
        return valued;
    }else if(hour >= 18 && hour <= 23){
        valued = names[3]
        return valued;
    }else {
        valued = 'Not Sure'
        return valued;
    }
    }
    returnWord()

    combined = `${day}/${month}/${year} - ${hour}:${minute} | ${valued} | ${enteredValue} mmol/L`  
      
    db.transaction(tx=>{
      tx.executeSql(
        'INSERT INTO reading (name,month) values(?,?)',
        [combined,month],
        (tx,success)=>{
          console.log(success.rows._array)
        },
        (tx, error)=> console.log('error on inserting', error)
      )
    })
    setModel(false)
  }


//----------------------------------------------
const [isModelOn, setModel] = useState(false)
const [isModelOn2, setModel2] = useState(false)
function onModel(){
  setModel(true)
}
function offModel(){
  setModel(false)
}

function onModel2(){
  setModel2(true)
}
function offModel2(){
  setModel2(false)
}

function showItem(){
  return storeData.map(index=>{
    return(
        <View  key={index.id}>
          <Text style={styles.textlol}>
            {index.name}
          </Text>
        </View>
    )
  })
}






  return (
    <>
    <StatusBar style='auto'/>
    <View style={styles.container}>
      <InputModal offModel={offModel} switchModel={isModelOn} testFunc={combineData}/>
      <Showmodal showModal2 = {isModelOn2} offModel2={offModel2} searchData={searchData}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          BLOOD SUGAR TRACKER
        </Text>
      </View>
      <View style={styles.containerList}>
        <ScrollView>
          {showItem()}
        </ScrollView>
      </View>
      <AddButton onModel={onModel} selectData={selectData}  onModel2={onModel2} />
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1821',
    paddingLeft:3,
    paddingRight:3,
    paddingTop:45,
    paddingBottom:5,

    

  },
  containerList:{
    flex:10,
    backgroundColor:'#344966',
    borderWidth:1,
    borderColor:'white',
    padding:10,

  },
  titleContainer:{
    flex:0.8,
    backgroundColor:'#A4BEF3',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderTopRightRadius:20,
    borderColor:'white'
  },
  textlol:{
    margin: 1,
    padding:2,
    backgroundColor:'white',
  },
  title:{
    color:'#393A10',
    fontSize:20,
    fontWeight:'bold',

  }
});
