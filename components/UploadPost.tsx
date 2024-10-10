/* eslint-disable react/jsx-no-undef */
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {Ionicons, Entypo, EvilIcons, MaterialIcons} from "@expo/vector-icons";
import {defaultStyles} from "@/constants/Styles";

const UploadPost = () => {
  // const [text, setText] = useState(''); // State to store input value

  const image =
    "https://images.unsplash.com/photo-1712350529844-b953287c6c09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <View style={defaultStyles.border}>
      <View style={defaultStyles.equalWidth}>
        <View style={defaultStyles.row}>
          <View>
            <Image
              source={{uri: image}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          </View>
          <View>
            {/* perhaps add this as a column */}
            <View>
              <View>
                <TextInput
                  value={"What is happening?!"}
                  // onChangeText={setText}
                  placeholder={""}
                />
                <Text style={styles.input}>What is happening?!</Text>
              </View>

              <View>
                <View style={styles.spaceBetween}>
                  <View>
                    <Ionicons name='image-outline' size={24} color='black' />
                  </View>
                  <View>
                    <Entypo name='emoji-happy' size={24} color='black' />
                  </View>
                  <View>
                    <EvilIcons name='location' size={24} color='black' />
                  </View>
                  <View>
                    <MaterialIcons name='schedule' size={24} color='black' />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              // style={{ width: 5, marginLeft: 10 }}
              onPress={() => console.log("Post Button pressed!")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

    // <View styles={defaultStyles.border}>
    //     <View style={styles.container}>
    //   <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
    //   <TextInput
    //     value={"What is happening?!"}
    //     // onChangeText={setText}
    //     placeholder={"What is happening?!"}
    //     style={styles.input}
    //   />
    // </View>
    // {/* remove space evenly and round */}
    // <View style={styles.spaceEvenly}>
    //     <View style={styles.spaceBetween}>
    //     <View style={styles.paddingRight}><Ionicons name="image-outline" size={24} color="black" /></View>
    //     <View style={styles.paddingRight}><Entypo name="emoji-happy" size={24} color="black" /></View>
    //     <View style={styles.paddingRight}><EvilIcons name="location" size={24} color="black" /></View>
    //     <View style={styles.paddingRight}><MaterialIcons name="schedule" size={24} color="black" /></View>
    //     </View>
    //     <TouchableOpacity
    //         // style={{ width: 5, marginLeft: 10 }}
    //         onPress={() => console.log('Post Button pressed!')} style={styles.button}>
    //   <Text style={styles.buttonText}>Post</Text>
    // </TouchableOpacity>
    // </View>
    // </View>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flexDirection: "row", // Arrange image and input side-by-side
    alignItems: "center", // Align image and input vertically
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10, // Add margin for spacing between image and input
  },
  input: {
    flex: 1, // Allow input to fill remaining space
    padding: 5,
    fontSize: 16,
    backgroundColor: "#f4f4f4", // Optional background color for input
  },
  spaceEvenly: {
    display: "flex",
    flexDirection: "row",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    // justifyContent: 'space-around',
  },
  paddingRight: {
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#00acee", // Twitter blue
    // paddingHorizontal: 20, // Horizontal padding
    // paddingVertical: 10, // Vertical padding
    borderRadius: 50, // Rounded corners
    width: 50,
    height: 30,
  },
  buttonText: {
    fontWeight: "bold",
    paddingTop: 1.5,
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
  },
});
