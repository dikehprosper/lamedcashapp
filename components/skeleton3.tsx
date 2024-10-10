/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { Color } from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

function Status() {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const SkeletonCommonProps = {
        transition: {
            type: "timing",
            timimg: 2000,
        },
        backgroundColor: "transparent",
    } as const;

    //   const image =
    //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

    return (
        <View style={[{ backgroundColor: Colors.background }]}>
            <Skeleton.Group show>
                <Skeleton height={40} width={30} {...SkeletonCommonProps}>
                    <View
                        style={{
                            width: 55,
                            height: 55,
                            borderRadius: 60,
                            backgroundColor: "#D1D5DB",
                            marginBottom: 7,
                        }}
                    />
                </Skeleton>
            </Skeleton.Group>
        </View>
    );
}

 function Status2() {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const SkeletonCommonProps = {
        transition: {
            type: "timing",
            timimg: 2000,
        },
        backgroundColor: "transparent",
    } as const;

    //   const image =
    //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

    return (
        <View style={[{ backgroundColor: Colors.background }]}>
            <Skeleton.Group show>
                <Skeleton height={20} width={"93%"} {...SkeletonCommonProps}>
                    <View
                        style={{
                            width: "93%",
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: "#D1D5DB",
                            marginBottom: 7,
                        }}
                    />
                </Skeleton>
            </Skeleton.Group>
        </View>
    );
}
 function Status3() {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const SkeletonCommonProps = {
        transition: {
            type: "timing",
            timimg: 2000,
        },
        backgroundColor: "transparent",
    } as const;

    //   const image =
    //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

    return (
        <View style={[{ backgroundColor: Colors.background }]}>
            <Skeleton.Group show>
                <Skeleton height={10} width={"70%"} {...SkeletonCommonProps}>
                    <View
                        style={{
                            width: "62%",
                            height: 10,
                            borderRadius: 19,
                            backgroundColor: "#D1D5DB",
                            marginBottom: 7,
                            marginLeft: 7,
                        }}
                    />
                </Skeleton>
            </Skeleton.Group>
        </View>
    );
}
 function Status4() {
    const colorScheme = useSelector(
        (state: RootState) => state.getUserData.colorScheme,
    );
    const Colors =
        parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

    const SkeletonCommonProps = {
        transition: {
            type: "timing",
            timimg: 2000,
        },
        backgroundColor: "transparent",
    } as const;

    //   const image =
    //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

    return (
        <View style={[{ backgroundColor: Colors.background }]}>
            <Skeleton.Group show>
                <Skeleton height={250} width={"100%"} {...SkeletonCommonProps}>
                    <View
                        style={{
                            width: "100%",
                            height: 250,
                            borderRadius: 10,
                            backgroundColor: "#D1D5DB",
                            marginBottom: 7,
                        }}
                    />
                </Skeleton>
            </Skeleton.Group>
        </View>
    );
}


 function Status5() {
     const colorScheme = useSelector(
         (state: RootState) => state.getUserData.colorScheme,
     );
     const Colors =
         parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

     const SkeletonCommonProps = {
         transition: {
             type: "timing",
             timimg: 2000,
         },
         backgroundColor: "transparent",
     } as const;

     //   const image =
     //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

     return (
         <View style={[{ backgroundColor: Colors.background }]}>
             <Skeleton.Group show>
                 <Skeleton  width={1} 
                             height={1} {...SkeletonCommonProps}>
                     <View
                         style={{
                             width: 20,
                             height: 20,
                             borderRadius: 30,
                             backgroundColor: "#D1D5DB",
                             marginBottom: 7,
                         }}
                     />
                 </Skeleton>
             </Skeleton.Group>
         </View>
     );
 }



 function Status6() {
     const colorScheme = useSelector(
         (state: RootState) => state.getUserData.colorScheme,
     );
     const Colors =
         parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

     const SkeletonCommonProps = {
         transition: {
             type: "timing",
             timimg: 2000,
         },
         backgroundColor: "transparent",
     } as const;

     //   const image =
     //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

     return (
         <View style={[{ backgroundColor: Colors.background }]}>
             <Skeleton.Group show>
                 <Skeleton height={15} width={"70%"} {...SkeletonCommonProps}>
                     <View
                         style={{
                             width: "61%",
                             height: 15,
                             borderRadius: 10,
                             backgroundColor: "#D1D5DB",
                             marginBottom: 7,
                             marginLeft: 7,
                         }}
                     />
                 </Skeleton>
             </Skeleton.Group>
         </View>
     );
 }

  function Status7() {
      const colorScheme = useSelector(
          (state: RootState) => state.getUserData.colorScheme,
      );
      const Colors =
          parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

      const SkeletonCommonProps = {
          transition: {
              type: "timing",
              timimg: 2000,
          },
          backgroundColor: "transparent",
      } as const;

      //   const image =
      //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

      return (
          <View style={[{ backgroundColor: Colors.background }]}>
              <Skeleton.Group show>
                  <Skeleton height={10} width={"50%"} {...SkeletonCommonProps}>
                      <View
                          style={{
                              width: "43%",
                              height: 10,
                              borderRadius: 10,
                              backgroundColor: "#D1D5DB",
                              marginBottom: 7,
                              marginLeft: 7,
                          }}
                      />
                  </Skeleton>
              </Skeleton.Group>
          </View>
      );
  }


   function Status8() {
       const colorScheme = useSelector(
           (state: RootState) => state.getUserData.colorScheme,
       );
       const Colors =
           parseFloat(colorScheme) === 2 ? Color.darkMode : Color.lightMode;

       const SkeletonCommonProps = {
           transition: {
               type: "timing",
               timimg: 2000,
           },
           backgroundColor: "transparent",
       } as const;

       //   const image =
       //     "https://media.istockphoto.com/id/1371970572/photo/png-photo-europian-robin-in-nature.webp?b=1&s=170667a&w=0&k=20&c=5Pz1XZlD9n2uaW9_RdTLRIUarvH0rVB9WLAov92keAo=";

       return (
           <View style={[{ backgroundColor: Colors.background }]}>
               <Skeleton.Group show>
                   <Skeleton
                       height={220}
                       width={"100%"}
                       {...SkeletonCommonProps}
                   >
                       <View
                           style={{
                               width: "100%",
                               height: 230,
                               borderRadius: 29,
                               backgroundColor: "#D1D5DB",
                               marginBottom: 7,
                           }}
                       />
                   </Skeleton>
               </Skeleton.Group>
           </View>
       );
   }

export {
    Status,
    Status2,
    Status3,
    Status4,
    Status5,
    Status6,
    Status7,
    Status8,
};