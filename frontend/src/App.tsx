import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/notes';
import Note from './components/Note';
import styles from './styles/NotesPage.module.css'
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddNoteDialog';
import stylesUtils from './styles/utils.module.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button className={`mb-4 ${stylesUtils.blockCenter}`} onClick={() => setShowAddNoteDialog(true)}>
        Add Note
      </Button>
      <Row xs={1} md={2} lg={3} className='g-4'>
      {notes.map(note => (
        <Col key={note._id}>
          <Note note={note} className={styles.note}/>
        </Col>
      ))}
      </Row>
      {
        showAddNoteDialog && 
        <AddNoteDialog 
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      }
    </Container>
  );
}

export default App;
