import {useEffect, useState, useContext, useCallback} from 'react';
import {SocketContext} from './context/socket';
import FilesTreeView from './components/FilesTreeView';
import { SOCKET_EVENTS } from './constants';
import './App.css';

function App() {
  const socket = useContext(SocketContext);
  const [files, setFiles] = useState([]);

  const fetchData = useCallback(async () => {
    console.log('1111');
    const response = await fetch('/files');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const files = await response.json();
      setFiles(files);
    }
  }, []);

  const handleFileChange = useCallback(async () => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    
    // subscribe to socket events
    socket.on(SOCKET_EVENTS.FILE_CHANGED, fetchData); 

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off(SOCKET_EVENTS.FILE_CHANGED, fetchData);
    };
  }, [socket, handleFileChange, fetchData])

  return (
    <div className="App">
      <FilesTreeView files={files}/>
    </div>
  );
}

export default App;