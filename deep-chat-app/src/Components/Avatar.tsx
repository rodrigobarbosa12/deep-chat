import React, { ReactElement } from 'react';
import {
  Avatar,
  HStack,
} from 'native-base';
import colors from '../utils/colors';

interface Props {
  nickname: string;
  index: number;
}

const AvatarOnline = ({ nickname, index }: Props): ReactElement => (
  <HStack mx={{ base: 'auto', md: 0 }} space={2} mr={1}>
    <Avatar
      bg={colors[index]}
    >
      {nickname.substr(0, 2).toUpperCase()}
      <Avatar.Badge bg="#a3e635" />
    </Avatar>
  </HStack>
);

export default AvatarOnline;
