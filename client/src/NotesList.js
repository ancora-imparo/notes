import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function NotesList() {
    const notes = [
        {
            id: 0, 
            title: "Weathering with you", 
            created: Date(), 
            lastUpdated: "some time", 
            noteContent: "Welcome, this is a demo note."
        },
        {
            id: 1, 
            title: "Howl's moving castle", 
            created: Date(), 
            lastUpdated: "some time", 
            noteContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
            id: 2, title: "Crash landing on you", 
            created: Date(), 
            lastUpdated: "some time", 
            noteContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        }
    ]
    function stringCheck(str) {
        if(str.lenght > 10) 
            str = str.substring(1, 10);
        return str;
    }
    const List = notes.map(note => (
        <ListItem button>
            <ListItemText primary={note.title} secondary={stringCheck("Lorem Ipsum is simply dummy text of the printing and typesetting industry.")}></ListItemText>
        </ListItem>
    ))

    return (
            <div>{List}</div>
    )
}

export default NotesList;