import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Linking, StyleSheet, Text, View, Button, Image, StatusBar, TextInput, ScrollView} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "../img/ejemplo.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

const NewPublication= props => {
  
  const IP = "10.144.1.13"; 
  const [name, setName] = useState([]);
  const [url, setUrl] = useState([]);
  const [description, setDescription] = useState([]);
  const { token } = useContext(TokenContext);
  const {user} = useContext(UserContext);
  const [data, setData] = useState([])
  const [publication, setPublication] = useState([]);

  
  useEffect(() => {
    const traerDatos= async ()=>{
      await getDataUser(user);
      await subirPublicacion(publication);
    }
    traerDatos();
  },[publication])

  console.log('esta es la publicacion: ', publication);
  console.log('estes es el user: ', user)
  console.log('estos son los datos: ', data)

  const subirPublicacion = async (publication)=>{
    const res = await axios.post
    (
      `http://${IP}:4000/publicaciones`,
      publication,
      {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
      }     
    );
    alert('publicacion subida');
  }

  const getDataUser = async (user)=>{
    const res = await axios.post
    (
      `http://${IP}:4000/usuarios/usuario`,
      user,
      {
        headers: {
            'Content-Type': 'application/json'
        }
      }     
    ).then(response => {
      setData(response.data)
    },error =>{
      console.log(error)
    });
  }
  

  return (
    <>  
    <View style={styles.cuadrado}>
        <Ionicons name="arrow-back" color="#fff" size={45} style={{padding:7}}/>
        <Ionicons name="notifications" color="#fff" size={35} style={{padding:7, paddingRight:15, marginTop:5 }}/>
        </View>
        <View style={styles.container}>
        <ScrollView>
        <Image style={styles.picturee} source={{uri:"https://pbs.twimg.com/media/EtMyremWQAEcl08.jpg"}}
         onPress={() => Linking.openURL('http//:localhost:3000/ImgDetail.js')}></Image>
        <View style={styles.linea} >
        <Text style={{marginLeft: 10, color:"#fff"}}>Select a photo ↓</Text>    
        <View style={{flexDirection: "column-reverse"}}>
        {/* <Image style={styles.picturee}source={{uri:"https://www.psdahtmlpasoapaso.com/blog/wp-content/uploads/2011/03/galeria.jpg"}}/> */}
        </View>
        </View>
        </ScrollView>
        </View>
        <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Name"
         onChangeText={(value) => setName(value)} ></TextInput>
        <TextInput style={styles.input} placeholder="URL"
          onChangeText={(value) => setUrl(value)}></TextInput>
        <TextInput style={styles.input} placeholder="Description"
        onChangeText={(value) => setDescription(value)}></TextInput>
        <Button style={styles.boton} title="Submit" color={"#9D2932"} 
        onPress={() => setPublication({
                                      name:name,
                                      fkUser:data.Id,
                                      image:url,
                                      description: description})}
        borderRadius={30}/>
        </View>

        {/* <View style={{flexDirection: "row"}}>
        <TextInput style={styles.input} placeholder="Name" 
        onChangeText={(value) => setPublication(...publication, name=value)}>  </TextInput>
        <TextInput style={styles.input} placeholder="URL"
        onChangeText={(value) => setPublication(...publication, url=value)}>  </TextInput>
        </View>
        <View style={{flexDirection: "row"}}>
        <TextInput style={styles.input} placeholder="fkUser"
        onChangeText={(value) => setPublication(...publication, fkUser=value)}>  </TextInput>
        <TextInput style={styles.input} placeholder="Description">  </TextInput> 
        </View> */}
      </>
    );
}
  
export default NewPublication;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E49C7A",
      alignItems: "center",
    },
    picturee:{
      height:400,
      width:435,
      zIndex:2
    },
    linea:{
      height:23,
      width:435,
      backgroundColor: "#9D2932"
    },
    cuadrado:{
      zIndex:2,
      justifyContent: "space-between",
      flexDirection:"row",
      marginTop: -60,
      width:435,
      height:60,
      backgroundColor: "#80341E",
      borderBottomWidth: 7,
      borderColor: "#9D2932"
    },
    input:{
      marginRight:110,
      backgroundColor:"#fff",
      borderRadius:50,
     height:60,
     width: 300,
     marginLeft:120,
     textAlign: 'center'
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#E49C7A'},
      
      boton:{
        backgroundColor: "#9D2932",
        borderRadius:20,
      }
  });

