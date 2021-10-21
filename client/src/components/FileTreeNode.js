import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { toggleDirectory, selectPath } from '../features/main/mainSlice';
import css from './FileTreeNode.module.css';

function FileTreeNode({node, level = 0}) {
  const selectedPath = useSelector(state => state.main.selectedPath)
  const openPaths = useSelector(state => state.main.openPaths)
  const dispatch = useDispatch();

  const handleFileClick = useCallback(() => {
    if (node.isDirectory) {
      dispatch(toggleDirectory(node.path));
    }
    dispatch(selectPath(node.path));
  }, [node, dispatch]);

  let fileIconClass = 'fa fa-file-o';

  if (!node.isDirectory) {
    if (node.ext.toLowerCase() === '.pdf') {
      fileIconClass = 'far fa-file-pdf';
    } else if (node.ext.toLowerCase() === '.jpg' || node.ext.toLowerCase() === '.png') {
      fileIconClass = 'far fa-image';
    } else if (node.ext.toLowerCase() === '.zip') {
      fileIconClass = 'far fa-file-archive';
    }
  } else {
    fileIconClass = 'fal fa-folder';
  }

  return (
    <>
      <div className={
        clsx(css.container, selectedPath === node.path && css.selected)}
        style={{paddingLeft: 10 + level * 20}}
        onClick={handleFileClick}
      >
        {node.isDirectory && <i className={`fas fa-angle-${openPaths.includes(node.path) ? 'down' : 'right'}`} />}
        {!node.isDirectory && <i className={fileIconClass}/>}
        {node.name}
      </div>
      {node.isDirectory && openPaths.includes(node.path) && node.files.map(childFile => <FileTreeNode
        key={childFile.name}
        node={childFile}
        level={level + 1}
      />)}
    </>
  );
}

export default FileTreeNode;