import React, {
  useEffect,
  useState,
  useRef,
  ReactElement,
  MutableRefObject,
} from 'react';
import { Platform } from 'react-native';
import {
  Input,
  Box,
  HStack,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Text,
  Icon,
} from 'native-base';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppBar from '../Components/AppBar';
import AvatarOnline from '../Components/Avatar';
import { showUsersOnline, subscribeToChat, disconnect } from '../services/socket';
import api from '../services/api';

interface ChatType {
  hour: string;
  message: string;
  socketId: string;
}

interface User {
  nickname: string;
  socketId: string;
}

type RootStackParamList = {
  Chat: { socketId: string, nickname: string };
};

interface Props {
  navigation: NavigationProp<ParamListBase>,
  route: RouteProp<RootStackParamList, 'Chat'>
}

const Chat = ({ navigation, route }: Props): ReactElement => {
  const { params } = route;
  const { socketId, nickname } = params;

  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatType[]>([]);

  const ref: MutableRefObject<any> = useRef();

  const scrollToEnd = () => ref.current?.scrollToEnd({ animated: true });

  const handlerSendMessage = async () => {
    try {
      if (!message) {
        return;
      }

      await api.sendMessage({ message, socketId, nickname });
      scrollToEnd();
      setMessage('');
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error sending message' });
    }
  };

  useEffect(() => {
    showUsersOnline((data: User[]) => {
      setUsers(data);
    });

    subscribeToChat((data: ChatType[]) => {
      setChat(data);
      scrollToEnd();
    });

    return () => undefined;
  }, []);

  return (
    <>
      <AppBar
        onPressLogout={() => {
          disconnect();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }}
      />
      <KeyboardAvoidingView
        h={{
          base: '600px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        flex={1}
        bg="deep.bg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box mb={5} width="100%">
          <FlatList
            data={users}
            horizontal
            mt={2}
            py={1}
            ml={2}
            renderItem={({ item, index }) => (
              <AvatarOnline
                nickname={item.nickname}
                index={index}
              />
            )}
            keyExtractor={(item) => `users-${item.socketId}`}
          />
        </Box>
        <Box
          mb={5}
          flex={7}
          width="100%"
          px={4}
        >
          <FlatList
            ref={ref}
            data={chat}
            onLayout={scrollToEnd}
            renderItem={({ item }) => (
              <Box alignItems={item.socketId === socketId ? 'flex-end' : 'flex-start'}>
                <HStack
                  maxWidth="70%"
                  mb={4}
                  bg={item.socketId === socketId ? '#0c4a6e' : '#0284c7'}
                  rounded="md"
                  flexDirection="column"
                >
                  <Text fontSize="xxs" px={2} mt={1} textAlign="left" color="#FFF">
                    {item.nickname}
                  </Text>
                  <Text fontSize="md" px={3} py={1} mr={9}>
                    {item.message}
                  </Text>
                  <Text fontSize="xxs" px={2} mb={1} textAlign="right">
                    {moment(item.hour).format('H:mm')}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.hour}
          />
        </Box>
        <Box mb={5}>
          <Input
            type="text"
            w="85%"
            size="lg"
            value={message}
            onChangeText={(value) => setMessage(value)}
            InputRightElement={(
              <Button
                ml={1}
                roundedLeft={0}
                roundedRight="md"
                onPress={handlerSendMessage}
              >
                <Icon as={<MaterialIcons name="send" />} size="sm" color="white" />
              </Button>
            )}
            placeholder="Digite uma mensagem"
          />
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};

export default Chat;
