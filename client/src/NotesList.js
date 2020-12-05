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
    const List = notes.map(note => (
        <ListItem button>
            <ListItemText primary={notes.title}></ListItemText>
        </ListItem>
    ))

    return (
            <div>{List}</div>
    )
}

export default NotesList;