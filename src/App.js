import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
// import { data } from "./data"
import Split from "react-split"
import { nanoid } from "nanoid"
import './App.css'


export default function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
  
  // push current note to the top of the list
  //   React.useEffect(()=>{
  //     const tempNotes = [];
  //     let tempNote = {};
  //     notes.forEach((note) => {
  //         if (note.id !== currentNoteId) {
  //             tempNotes.push(note);
  //         } else {
  //             tempNote = note;
  //         }
  //     });
  //     tempNotes.unshift(tempNote)
  //     setNotes(prev=>tempNotes)
  // },[currentNoteId])
  
  React.useEffect(()=>{
      localStorage.setItem('notes',JSON.stringify(notes))
  },[notes])
  
    function createNewNote() {
        const newNote = {
            id: nanoid(),
          // body: "# Type your markdown note's title here"
          body: `Hi${notes.length + 1}`
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes!</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
