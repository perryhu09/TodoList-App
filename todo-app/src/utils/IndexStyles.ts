import {StyleSheet, Dimensions } from 'react-native'

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    todoItem: {
        alignSelf: 'center',
        width: width * 0.9,
        height: 50,
        borderRadius: width * 0.4,
        borderWidth: 1,
        alignItems: 'center', 
        flexDirection: 'row',
        padding: 15,
        marginBottom: 20,
    },
    itemTitle: {
        width: width * 0.5,
        alignItems: 'center',
    },
    completedText: {
        textDecorationLine: 'line-through',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    completeButton: {
        borderRadius: 1,
        marginRight: 5,
    },
    deleteButton: {
        borderRadius: 1,
        marginLeft: 5,
    },
    complete: {
        color: 'green',
    },
    delete: {
        color: 'red',
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        marginHorizontal: 25,
        marginVertical: 25,
        paddingHorizontal: 10,
    },
    input: {
        width: width * 0.6,
    },
})

export default styles