import React, { ReactElement } from 'react';
import {
  HStack, IconButton, Icon, Text, Box, StatusBar,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  onPressLogout: () => void;
}

const AppBar = ({ onPressLogout }: Props): ReactElement => (
  <>
    <StatusBar barStyle="light-content" />

    <Box safeAreaTop backgroundColor="dark.100" />

    <HStack bg="dark.100" px={1} py={3} justifyContent="space-between" alignItems="center">
      <HStack space={4} alignItems="center">
        <Text color="emerald.400" fontSize={20} fontWeight="bold">
          {' '}
          Deep chat
        </Text>
      </HStack>
      <HStack space={2}>
        <IconButton
          icon={<Icon as={<MaterialIcons name="logout" />} size="sm" color="white" />}
          onPress={onPressLogout}
        />
      </HStack>
    </HStack>

  </>
);

export default AppBar;
