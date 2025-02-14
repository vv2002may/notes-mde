import React from "react"

export default function Sidebar(props) {
 
    const noteElements = props.notes.map((note, index) => (
        
        <div key={note.id} className="note-list">
            <div
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                
                <h4 className="text-snippet">
                    {
                        (note.body) ? (note.body.split('\n')[0]): `Note ${index + 1}`
                    }
                </h4>
                <img
                    className="delete-btn"
                    src={require(`../images/delete.png`)}
                    onClick={(event) => props.deleteNote(event, note.id)}
                />
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>NOTES</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            <div className="sidebar-element">
                {noteElements}
            </div>
        </section>
    )
}
