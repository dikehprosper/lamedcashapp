/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {Button, View} from "react-native";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function FavouriteScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Button onPress={() => navigation.goBack()} title='Go back home' />
    </View>
  );
}
