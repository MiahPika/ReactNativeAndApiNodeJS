// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, ScrollView } from "react-native";

// Importar o arquivo com os componentes CSS
import { BtnActionDel, BtnActionEdit, Container, Content, TitleViewContent, TxtBtnAction, ViewContent } from './../../styles/custom_adm';

//importar navegação entre telas
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// importar a api 
import api from '../../config/api';

import { useCallback, useEffect, useState } from "react";

// Criar e exportar a função com a tela inicial 
export default function ViewUser({ route }) {

  const navigation = useNavigation();

  //armazena as informações do usuario
  const [user, setUser ] = useState([]);

 
  const userId  = route.params.userId;

  const getUser = async() =>{ 
    await api.get(`/users/${userId}`)
    .then((response)=>{
        //console.log(response.data.user);
        setUser(response.data.user) ;
    }).catch((err)=>{
        if(err.response) {
          Alert.alert("Ops",err.response.data.mensagem);
          navigation.navigate('ListUsers');
        } else {
          Alert.alert("Ops","Erro: Tente Novamente Mais Tarde!");
          navigation.navigate('ListUsers');
        }     
    })
  }

  // useEffect(()=>{
  //   getUser();
  // },[])

  useFocusEffect(
    useCallback(()=>{
      getUser();
    },[])
  );

  const DelUsuario = async() =>{ 
    await api.delete(`/users/${userId}`)
    .then((response)=>{
        Alert.alert('Usuario Deletado com sucesso');
        navigation.navigate('ListUser');

    }).catch((err)=>{
        if(err.response) {
          Alert.alert("Ops",err.response.data.mensagem);
        } else {
          Alert.alert("Ops","Erro: Tente Novamente Mais Tarde!");
        }
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <Content>
            <TitleViewContent>ID:</TitleViewContent>  
            <ViewContent>{user.id}</ViewContent>
          </Content>  
          
          <Content>
            <TitleViewContent>Nome:</TitleViewContent>  
            <ViewContent>{user.name}</ViewContent>
          </Content>  
          
          <Content>
            <TitleViewContent>Email:</TitleViewContent>  
            <ViewContent>{user.email}</ViewContent>
          </Content> 
          
          <BtnActionEdit onPress={() => navigation.navigate('EditUser', { UserID: user.id })}>
            <TxtBtnAction>Editar</TxtBtnAction>
          </BtnActionEdit>
          
          <BtnActionDel onPress={DelUsuario}>
            <TxtBtnAction>Deletar Usuario</TxtBtnAction>
          </BtnActionDel>

          
            
        </Container>
    </ScrollView>
  );
};
