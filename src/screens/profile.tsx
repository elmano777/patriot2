/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, Button } from 'react-native';
import { useAuth } from '../authProfile'; // Asegúrate de que la ruta sea correcta

export default function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return <Text>No user logged in</Text>;

  return (
    <View>
      <Text>Welcome, {user.Nombre}</Text>
      <Text>Email: {user.Email}</Text>
      <Text>Role: {user.Role}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}