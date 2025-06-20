import { useState } from 'react';
import { Modal } from './components/Modal';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Typed Modal Example</h1>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="My Modal">
        <p>This is a reusable, strongly typed modal component.</p>
      </Modal>
    </div>
  );
}

export default App;
