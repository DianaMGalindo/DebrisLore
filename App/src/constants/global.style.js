//In this file I am aiming to code the styles of elements that are common across the
//app, this will help me to avoid duplication in the coding of styles.

import { StyleSheet } from "react-native";
//importing styles from main Theme.js
import {FONT, SIZES} from "./theme.js";

const GlobalStyles = StyleSheet.create({

    //Header Precious Plastic font
    headerAlternative: {
        fontFamily: FONT.header,
        fontSize: SIZES.xxLarge,
        color: '#000000',
    },
    //Style for main headers
    headerTitle:{
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: FONT.secondaryHeaderBold,
        fontSize: SIZES.xLarge,
        paddingBottom: 25,
        color: '#000000',
    },
    //Styles for paragraphs/ text
    paragraph:{
            fontFamily: FONT.bodyRegular,
            fontSize: SIZES.medium,
            lineHeight: 25,
            color: '#000000',
    },
    //Style for primary button
    primaryButton: {
            flex:1,
            height: 80,
            borderRadius: 5,
            backgroundColor: '#FCDE8A',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#000000',

    },
    primaryButtonText: {
            fontFamily: FONT.bodyRegular,
            fontWeight: 'bold',
            fontSize: SIZES.medium,
            color: '#000000',
    },
    mainContainer: {
        flex:1,
    }

});

export default GlobalStyles;