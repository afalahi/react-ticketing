/** @format */
import { useContext } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Avatar,
  Center,
  HStack,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../Context/AuthContext';
import authService from '../../actions/authActions';

const ProfileIcon = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = e => {
    authService.logout();
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/');
  };

  return (
    <Menu>
      <MenuButton rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
        <HStack>
          <Avatar
            size={'sm'}
            src={'https://avatars.dicebear.com/api/male/username.svg'}
          />
        </HStack>
      </MenuButton>
      <MenuList alignItems={'center'}>
        <Center>
          <Avatar
            size={'lg'}
            src={'https://avatars.dicebear.com/api/male/username.svg'}
          />
        </Center>
        <Center>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </Center>
        <MenuDivider />
        <MenuItem onClick={onLogout} icon={<FaSignOutAlt />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileIcon;
